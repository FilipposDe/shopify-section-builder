import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

const presetSectionSettings = [
  {
    id: "margin",
    label: "Margin (px)",
    type: "number",
    placeholder: "0px",
    effect: {
      type: "STYLE_DECLARATION",
      selector: "SECTION",
      declarationText: "margin: {{ section.settings.margin }}px;",
    },
  },
  {
    id: "padding",
    label: "Padding (px)",
    type: "number",
    placeholder: "0px",
    effect: {
      type: "STYLE_DECLARATION",
      selector: "SECTION",
      declarationText: "padding: {{ section.settings.padding }}px;",
    },
  },
  {
    id: "title",
    label: "Section title",
    type: "text",
    placeholder: "",
    effect: {
      type: "CONTENT",
      order: 1,
      code: "<h2>{{ section.settings.title }}</h2>",
    },
  },
  {
    id: "title__styles_font_size",
    label: "Title font size (px)",
    type: "number",
    placeholder: "18",
    effect: {
      type: "STYLE_DECLARATION",
      selector: ".custom-title",
      declarationText:
        "font-size: {{ section.settings.title__styles_font_size }}px;",
    },
  },
  {
    id: "html_title",
    label: "Section title (HTML)",
    type: "text",
    placeholder: "<h3>The <strong>title</strong></h3>",
    effect: {
      type: "CONTENT",
      order: 1,
      code: "{{ section.settings.html_title }}>",
    },
  },
  {
    id: "text",
    label: "Section text",
    type: "text",
    placeholder: "",
    effect: {
      type: "CONTENT",
      order: 2,
      code: "{{ section.settings.text }}",
    },
  },
  {
    id: "html_text",
    label: "Section text (HTML)",
    type: "text",
    placeholder: "<input type='text' placeholder='Your name' />",
    effect: {
      type: "CONTENT",
      order: 2,
      code: "{{ section.settings.html_text }}",
    },
  },
].map((settingData, index) => {
  return { ...settingData, index };
});

// const presetBlockTypes = ["column"];

const presetBlockSettings = [
  {
    id: "block_text",
    label: "Block text",
    type: "text",
    placeholder: "",
    effect: {
      type: "CONTENT",
      order: 2,
      code: "{{ block.settings.block_text }}",
    },
  },
].map((settingData, index) => {
  return { ...settingData, index };
});

function App() {
  const reducer = (state, action) => {
    console.log(`Handling action`, action);
    switch (action.type) {
      case "SET_NAME": {
        const name = action.payload;
        const className = name.replace(/\s/g, "-").toLowerCase();
        return {
          ...state,
          section: {
            ...state?.section,
            name: name,
            className: className,
          },
        };
      }
      case "ADD_SECTION_SETTING": {
        return {
          ...state,
          section: {
            ...state?.section,
            settings: [...state?.section?.settings, action.payload],
          },
        };
      }
      case "REMOVE_SECTION_SETTING": {
        return {
          ...state,
          section: {
            ...state?.section,
            settings: [
              ...state?.section?.settings?.filter(
                (setting) => setting.id !== action.payload
              ),
            ],
          },
        };
      }
      case "ADD_SECTION_BLOCK": {
        return {
          ...state,
          section: {
            ...state?.section,
            blocks: [...state?.section?.blocks, action.payload],
          },
        };
      }
      case "REMOVE_SECTION_BLOCK": {
        return {
          ...state,
          section: {
            ...state?.section,
            blocks: [
              ...state?.section?.blocks?.filter(
                (block) => block.type !== action.payload
              ),
            ],
          },
        };
      }
      default:
        return state;
    }
  };

  const initialState = {
    section: {
      name: "Custom section",
      className: "custom-section",
      settings: [],
      blocks: [],
    },
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [blockType, setBlockType] = React.useState("column-with-text");

  const getResult = () => {
    // Normalize CSS data

    // Get style settings only
    const chosenStyleSettings = state?.section?.settings?.filter(
      (setting) => setting.effect.type === "STYLE_DECLARATION"
    );

    // Get array of selectors
    const selectorsToStyleArray = Array.from(
      new Set(chosenStyleSettings.map((setting) => setting.effect.selector))
    );

    // Get object with selectors as keys
    const selectorsToStyle = selectorsToStyleArray.reduce((a, b) => {
      if (b === "SECTION")
        return { ...a, [`.section-${state?.section?.className}`]: [] };
      return { ...a, [b]: [] };
    }, {});

    // Populate object with declarations
    chosenStyleSettings.forEach((setting) => {
      const selector =
        setting.effect.selector === "SECTION"
          ? `.section-${state?.section?.className}`
          : setting.effect.selector;

      selectorsToStyle[selector].push(setting.effect.declarationText);
    });

    // Setup content settings

    // Get and sort content lines
    const contentSectionSettings = state?.section?.settings
      ?.filter((setting) => setting.effect.type === "CONTENT")
      .sort((a, b) => a.order < b.order);

    // Main file building

    let result = "";

    // - Style
    result += `<style>\n`;
    for (const selector in selectorsToStyle) {
      result += `  ${selector} {\n`;
      for (const declaration of selectorsToStyle[selector]) {
        result += `    ${declaration}\n`;
      }
      result += `  }\n`;
      result += "\n";
    }
    result += `</style>\n`;
    result += "\n";
    // - End Style

    // - Content
    result += `<section className='section-${state?.section?.className}'>\n`;
    // - - Section content
    for (const setting of contentSectionSettings) {
      result += `  <div class="custom-${setting.id}">${setting.effect.code}</div>\n`;
    }
    // - - End section content
    result += "</section>\n";
    result += "\n";
    // - End Content

    return result;
  };

  const result = getResult();

  function toggleSectionSetting(isChecked, settingData) {
    if (isChecked) {
      dispatch({ type: "ADD_SECTION_SETTING", payload: settingData });
    } else {
      dispatch({ type: "REMOVE_SECTION_SETTING", payload: settingData.id });
    }
  }

  function addBlock(e) {
    e.preventDefault();
    dispatch({ type: "ADD_SECTION_BLOCK", payload: { type: blockType } });
  }

  // Schema
  const resultJson = {
    name: state?.section?.name,
    settings: [
      ...state?.section?.settings
        .sort((a, b) => {
          return a.index - b.index;
        })
        .map((setting) => {
          const { id, type, placeholder, label } = setting;
          return { id, type, placeholder, label };
        }),
    ],
    presets: {
      name: state?.section?.name,
    },
  };

  console.log({ state, resultJson });

  return (
    <>
      <div className="Polaris-Page">
        <div className="Polaris-Page__Content">
          <div className="Polaris-Layout">
            <div className="Polaris-Layout__AnnotatedSection">
              <div className="Polaris-Layout__AnnotationWrapper">
                <div className="Polaris-Layout__Annotation">
                  <div className="Polaris-TextContainer">
                    <h2 className="Polaris-Heading">Form</h2>
                    <p>A sample form using Polaris components.</p>
                  </div>
                </div>
                <div className="Polaris-Layout__AnnotationContent">
                  <div className="Polaris-Card">
                    <div className="Polaris-Card__Section">
                      <div className="Polaris-FormLayout">
                        <div role="group" className="">
                          <div className="Polaris-FormLayout__Items">
                            <div className="Polaris-FormLayout__Item">
                              <div className="">
                                <div className="Polaris-Labelled__LabelWrapper">
                                  <div className="Polaris-Label">
                                    <label
                                      id="TextField1Label"
                                      htmlFor="TextField1"
                                      className="Polaris-Label__Text"
                                    >
                                      Section name
                                    </label>
                                  </div>
                                </div>
                                <div className="Polaris-TextField">
                                  <input
                                    id="TextField1"
                                    placeholder="Featured"
                                    className="Polaris-TextField__Input"
                                    aria-labelledby="TextField1Label"
                                    aria-invalid="false"
                                    type="text"
                                    value={state?.section?.name}
                                    onChange={(e) =>
                                      dispatch({
                                        type: "SET_NAME",
                                        payload: e.target.value,
                                      })
                                    }
                                  />
                                  <div className="Polaris-TextField__Backdrop"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <h3>Section settings</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {presetSectionSettings.map((setting) => {
          return (
            <div key={setting.id}>
              <h4>
                <label htmlFor={`section-setting-${setting.id}`}>
                  Add {setting.label}
                </label>
              </h4>
              <input
                id={`section-setting-${setting.id}`}
                type="checkbox"
                checked={state?.section?.settings.some(
                  (existingSetting) => existingSetting.id === setting.id
                )}
                onChange={(e) =>
                  toggleSectionSetting(e.target.checked, setting)
                }
              />
            </div>
          );
        })}
      </div>

      <h3>Section blocks</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <label htmlFor="new-block-type">Add a new block type</label>
        <input
          id="new-block-type"
          type="text"
          placeholder="column-with-text"
          onChange={(e) => setBlockType(e.target.value)}
          value={blockType}
        />
        <button onClick={addBlock}>Add +</button>
        {state?.section?.blocks.map((block) => {
          return (
            <div key={block.type}>
              <pre>{block.type}</pre>
              <hr />
            </div>
          );
        })}
        {/* {presetBlockTypes.map((blockType) => {
          return (
            <div key={blockType.id}>
              <h4>
                <label htmlFor={`section-blocks-${blockType}`}>
                  Add {blockType}
                </label>
              </h4>
              <input
                id={`section-blocks-${blockType}`}
                type="checkbox"
                checked={state?.section?.blocks.some(
                  (existingBlock) => existingBlock.type === blockType
                )}
                onChange={(e) =>
                  toggleSectionBlocks(e.target.checked, blockType)
                }
              />
            </div>
          );
        })} */}
      </div>

      <p>Content</p>
      {/* <input type="checkbox" onClick={(e) => toggleContent(e.target.checked)} /> */}
      <h3>Blocks</h3>
      {/* <button onClick={addTextBlock}>Text</button> */}
      {/* <button onClick={addImageBlock}>Image</button> */}
      <br />
      <pre>
        {result}
        {"{% schema %}"}
        <br />
        {JSON.stringify(resultJson, null, 2)}
        <br />
        {"{% endschema %}"}
      </pre>
    </>
  );
}

export default hot(module)(App);
