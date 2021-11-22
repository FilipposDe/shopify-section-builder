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
  const [blockSettings, setBlockSettings] = React.useState([]);

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
      result += `  <div className="custom-${setting.id}">${setting.effect.code}</div>\n`;
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
    dispatch({
      type: "ADD_SECTION_BLOCK",
      payload: { type: blockType, settings: blockSettings },
    });
  }

  function toggleBlockSetting(isChecked, settingData) {
    if (isChecked) {
      setBlockSettings([...blockSettings, settingData]);
    } else {
      setBlockSettings(
        blockSettings.filter((setting) => setting.id !== settingData.id)
      );
    }
  }
  // Schema
  const resultJson = {
    name: state?.section?.name,
    settings: [
      ...state?.section?.settings
        ?.sort((a, b) => {
          return a.index - b.index;
        })
        ?.map((setting) => {
          const { id, type, placeholder, label } = setting;
          return { id, type, placeholder, label };
        }),
    ],
    blocks: [
      ...state?.section.blocks?.map((block) => {
        const { type, settings } = block;
        const cleanSettings = settings.map((setting) => {
          const { id, type, placeholder, label } = setting;
          return { id, type, placeholder, label };
        });
        return { type, settings: cleanSettings };
      }),
    ],
    presets: {
      name: state?.section?.name,
    },
  };

  console.log({ state, resultJson });

  return (
    <>
      <div>
        <div className="Polaris-Page Polaris-Page--fullWidth">
          <div className="Polaris-Page-Header Polaris-Page-Header--hasActionMenu Polaris-Page-Header--mobileView Polaris-Page-Header--noBreadcrumbs Polaris-Page-Header--mediumTitle">
            <div className="Polaris-Page-Header__Row">
              <div className="Polaris-Page-Header__TitleWrapper">
                <div>
                  <div className="Polaris-Header-Title__TitleAndSubtitleWrapper">
                    <h1 className="Polaris-Header-Title">
                      Build your own section
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Polaris-Page__Content">
            <div className="Polaris-Layout">
              <div className="Polaris-Layout__Section Polaris-Layout__Section--oneHalf">
                <div className="Polaris-Card">
                  <div className="Polaris-Card__Header">
                    <h2 className="Polaris-Heading">Configure section</h2>
                  </div>
                  {/* ================================ */}
                  {/* Main */}
                  {/* ================================ */}
                  <div className="Polaris-Card__Section">
                    <div className="Polaris-Card__SectionHeader">
                      <h3 aria-label="Reports" className="Polaris-Subheading">
                        General
                      </h3>
                    </div>
                    <div className="Polaris-FormLayout">
                      <div
                        role="group"
                        className="Polaris-FormLayout--condensed"
                      >
                        <div className="Polaris-FormLayout__Items">
                          <div className="Polaris-FormLayout__Item">
                            <div className="">
                              <div className="Polaris-Labelled__LabelWrapper">
                                <div className="Polaris-Label">
                                  <label
                                    htmlFor="section-name-input"
                                    className="Polaris-Label__Text"
                                  >
                                    Section name
                                  </label>
                                </div>
                              </div>
                              <div className="Polaris-Connected">
                                <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                  <div className="Polaris-TextField">
                                    <input
                                      id="section-name-input"
                                      autocomplete="off"
                                      className="Polaris-TextField__Input"
                                      placeholder="Featured"
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
                  {/* ================================ */}
                  {/* Section settings */}
                  {/* ================================ */}

                  <div className="Polaris-Card__Section">
                    <div className="Polaris-Card__SectionHeader">
                      <h3 aria-label="Reports" className="Polaris-Subheading">
                        Section settings
                      </h3>
                    </div>
                    <div className="Polaris-FormLayout">
                      <div
                        role="group"
                        className="Polaris-FormLayout--condensed"
                      >
                        <div className="Polaris-FormLayout__Item">
                          <fieldset className="Polaris-ChoiceList">
                            <legend className="Polaris-ChoiceList__Title">
                              Choose available settings for the section
                            </legend>
                            <ul className="Polaris-ChoiceList__Choices Polaris-Stack Polaris-Stack--spacingLoose Polaris-Stack--distributionFillEvenly">
                              {presetSectionSettings.map((setting) => {
                                return (
                                  <li
                                    key={setting.id}
                                    className="Polaris-Stack__Item"
                                  >
                                    <div>
                                      <label
                                        className="Polaris-Choice"
                                        htmlFor={`section-setting-${setting.id}`}
                                      >
                                        <span className="Polaris-Choice__Control">
                                          <span className="Polaris-Checkbox">
                                            <input
                                              type="checkbox"
                                              className="Polaris-Checkbox__Input"
                                              id={`section-setting-${setting.id}`}
                                              checked={state?.section?.settings.some(
                                                (existingSetting) =>
                                                  existingSetting.id ===
                                                  setting.id
                                              )}
                                              onChange={(e) =>
                                                toggleSectionSetting(
                                                  e.target.checked,
                                                  setting
                                                )
                                              }
                                            />
                                            <span className="Polaris-Checkbox__Backdrop Polaris-Checkbox--hover"></span>
                                            <span className="Polaris-Checkbox__Icon">
                                              <span className="Polaris-Icon">
                                                <span className="Polaris-VisuallyHidden"></span>
                                                <svg
                                                  viewBox="0 0 20 20"
                                                  className="Polaris-Icon__Svg"
                                                  focusable="false"
                                                  aria-hidden="true"
                                                >
                                                  <path d="m8.315 13.859-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.436.436 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path>
                                                </svg>
                                              </span>
                                            </span>
                                          </span>
                                        </span>
                                        <span className="Polaris-Choice__Label">
                                          {setting.label}
                                        </span>
                                      </label>
                                      <div className="Polaris-Choice__Descriptions">
                                        <div className="Polaris-Choice__HelpText">
                                          Section settings
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </fieldset>
                        </div>

                        {/*  */}
                        {/*  */}
                        {/*  */}
                      </div>
                    </div>
                  </div>
                  {/* ================================ */}
                  {/* Blocks */}
                  {/* ================================ */}
                  <div className="Polaris-Card__Section">
                    <div className="Polaris-Card__SectionHeader">
                      <h3 aria-label="Reports" className="Polaris-Subheading">
                        Blocks
                      </h3>
                    </div>
                    <div className="Polaris-FormLayout">
                      <div className="Polaris-FormLayout__Items">
                        <div className="Polaris-FormLayout__Item">
                          <div className="">
                            <div className="Polaris-Labelled__LabelWrapper">
                              <div className="Polaris-Label">
                                <label
                                  htmlFor="block-type-input"
                                  className="Polaris-Label__Text"
                                >
                                  Block type
                                </label>
                              </div>
                            </div>
                            <div className="Polaris-Connected">
                              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                <div className="Polaris-TextField">
                                  <input
                                    id="block-type-input"
                                    autocomplete="off"
                                    className="Polaris-TextField__Input"
                                    type="text"
                                    placeholder="column-with-text"
                                    onChange={(e) =>
                                      setBlockType(e.target.value)
                                    }
                                    value={blockType}
                                  />
                                  <div className="Polaris-TextField__Backdrop"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Polaris-FormLayout">
                      <div className="Polaris-FormLayout__Items">
                        {presetBlockSettings.map((setting) => {
                          return (
                            <div
                              key={setting.id}
                              className="Polaris-FormLayout__Item"
                            >
                              <div>
                                <label
                                  className="Polaris-Choice"
                                  htmlFor={`block-setting-${setting.id}`}
                                >
                                  <span className="Polaris-Choice__Control">
                                    <span className="Polaris-Checkbox">
                                      <input
                                        className="Polaris-Checkbox__Input"
                                        type="checkbox"
                                        id={`block-setting-${setting.id}`}
                                        checked={blockSettings.some(
                                          (existingSetting) =>
                                            existingSetting.id === setting.id
                                        )}
                                        onChange={(e) =>
                                          toggleBlockSetting(
                                            e.target.checked,
                                            setting
                                          )
                                        }
                                      />
                                      <span className="Polaris-Checkbox__Backdrop"></span>
                                      <span className="Polaris-Checkbox__Icon">
                                        <span className="Polaris-Icon">
                                          <span className="Polaris-VisuallyHidden"></span>
                                          <svg
                                            viewBox="0 0 20 20"
                                            className="Polaris-Icon__Svg"
                                            focusable="false"
                                            aria-hidden="true"
                                          >
                                            <path d="m8.315 13.859-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.436.436 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path>
                                          </svg>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="Polaris-Choice__Label">
                                    {setting.label}
                                  </span>
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="Polaris-FormLayout">
                      <div className="Polaris-FormLayout__Items">
                        <div className="Polaris-FormLayout__Item">
                          <div>
                            <button
                              className="Polaris-Button Polaris-Button--primary"
                              type="button"
                              onClick={addBlock}
                            >
                              <span className="Polaris-Button__Content">
                                <span className="Polaris-Button__Text">
                                  Add
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Polaris-FormLayout">
                      <div className="Polaris-FormLayout__Items">
                        <div className="Polaris-FormLayout__Item">
                          <div>
                            <div className="Polaris-Stack">
                              {state?.section?.blocks.map((block) => {
                                return (
                                  <div
                                    key={block.type}
                                    className="Polaris-Stack__Item"
                                  >
                                    <div className="">
                                      <p>{block.type}</p>
                                      {block.settings.map((setting) => {
                                        return (
                                          <p
                                            className="Polaris-Caption"
                                            key={setting.id}
                                          >
                                            Type: {setting.type}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================ */}
              {/* Code */}
              {/* ================================ */}
              <div className="Polaris-Layout__Section Polaris-Layout__Section--oneHalf">
                <div className="Polaris-Card">
                  <div className="Polaris-Card__Header">
                    <h2 className="Polaris-Heading">Section file</h2>
                  </div>
                  <div className="Polaris-Card__Section">
                    <pre style={{ width: "100%" }}>
                      <code class="Polaris-TextStyle--variationCode">
                        {result}
                        {"{% schema %}"}
                        <br />
                        {JSON.stringify(resultJson, null, 2)}
                        <br />
                        {"{% endschema %}"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default hot(module)(App);
