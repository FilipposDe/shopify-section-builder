import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

const presetSectionSettings = [
  {
    id: "margin",
    label: "Margin (px)",
    type: "text",
    placeholder: "0px",
    effect: {
      type: "STYLE_DECLARATION",
      declarationText: "margin: {{ section.settings.margin }}px;",
    },
  },
  {
    id: "padding",
    label: "Padding (px)",
    type: "text",
    placeholder: "0px",
    effect: {
      type: "STYLE_DECLARATION",
      declarationText: "padding: {{ section.settings.padding }}px;",
    },
  },
];

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
      default:
        return state;
    }
  };

  const initialState = {
    section: {
      name: "Custom section",
      className: "custom-section",
      settings: [],
    },
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const getResult = () => {
    let result = "";

    // Style
    result += `<style>\n`;
    result += `  section.${state?.section?.className} {\n`;
    for (const setting of state?.section?.settings) {
      if (setting.effect.type === "STYLE_DECLARATION") {
        result += `    ${setting.effect.declarationText}\n`;
      }
    }
    result += `  }\n`;
    result += "\n";
    result += `</style>\n`;
    result += "\n";

    // HTML
    result += `<section className='section-${state?.section?.className}'>\n`;
    // if (settings.some((s) => s.id === "content")) {
    //   result += `  {{ section.settings.content }}\n`;
    // }
    result += "</section>\n";
    result += "\n";

    return result;
  };

  const result = getResult();

  function toggleSectionSetting(isChecked, settingData) {
    // const hasAlreadyAdded = state?.section?.settings?.some(
    //   (existingSetting) => existingSetting.id === settingData.id
    // );

    if (isChecked) {
      dispatch({ type: "ADD_SECTION_SETTING", payload: settingData });
    } else {
      dispatch({ type: "REMOVE_SECTION_SETTING", payload: settingData.id });
    }
  }

  // Schema
  const resultJson = {
    name: state?.section?.name,
    settings: [
      ...state?.section?.settings.map((setting) => {
        const { id, type, placeholder, label } = setting;
        return { id, type, placeholder, label };
      }),
    ],
    presets: {
      name: state?.section?.name,
    },
  };

  console.log({ state });

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
      <br />
      <br />

      <h2>Add Section settings</h2>
      <h3>Layout</h3>
      {presetSectionSettings.map((setting) => {
        return (
          <div key={setting.id}>
            <h4>Add {setting.label}</h4>
            <input
              id={`section-setting-${setting.id}`}
              type="checkbox"
              checked={state?.section?.settings.some(
                (existingSetting) => existingSetting.id === setting.id
              )}
              onChange={(e) => toggleSectionSetting(e.target.checked, setting)}
            />
          </div>
        );
      })}

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
