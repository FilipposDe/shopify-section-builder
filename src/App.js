import React from "react";
import { hot } from "react-hot-loader";
import "./App.css";

function App() {
  const [name, setName] = React.useState("");
  const [settings, setSettings] = React.useState([]);

  const getResult = () => {
    let result = "";

    // Style
    result += `<style>\n`;
    if (settings.some((s) => s.id === "margin")) {
      result += `  section.${name} {\n`;
      result += `    margin: {{ section.settings.margin }}px;\n`;
      result += `  }\n`;
    }
    result += `</style>\n`;
    result += "\n";

    // HTML
    result += `<section className='section-${name}'>\n`;
    if (settings.some((s) => s.id === "content")) {
      result += `  {{ section.settings.content }}\n`;
    }
    result += "</section>\n";
    result += "\n";

    return result;
  };

  const result = getResult();

  function toggleMargin() {
    if (!settings.some((s) => s.id === "margin")) {
      const newSetting = {
        type: "number",
        id: "margin",
        label: "Margin (px)",
      };
      setSettings([...settings, newSetting]);
    } else {
      setSettings(settings.filter((s) => s.id !== "margin"));
    }
  }

  function toggleContent() {
    if (!settings.some((s) => s.id === "content")) {
      const newSetting = {
        type: "text",
        id: "content",
        label: "Content",
      };
      setSettings([...settings, newSetting]);
    } else {
      setSettings(settings.filter((s) => s.id !== "content"));
    }
  }

  /**
   * 
   * {% schema %}
    {
    "name": "Slideshow"
    }
    {% endschema %}
   */

  const resultJson = {
    name: name,
    settings: [...settings],
    presets: {
      name: name,
    },
  };
  return (
    <>
      <div class="Polaris-Page">
        <div class="Polaris-Page__Content">
          <div class="Polaris-Layout">
            <div class="Polaris-Layout__AnnotatedSection">
              <div class="Polaris-Layout__AnnotationWrapper">
                <div class="Polaris-Layout__Annotation">
                  <div class="Polaris-TextContainer">
                    <h2 class="Polaris-Heading">Form</h2>
                    <p>A sample form using Polaris components.</p>
                  </div>
                </div>
                <div class="Polaris-Layout__AnnotationContent">
                  <div class="Polaris-Card">
                    <div class="Polaris-Card__Section">
                      <div class="Polaris-FormLayout">
                        <div role="group" class="">
                          <div class="Polaris-FormLayout__Items">
                            <div class="Polaris-FormLayout__Item">
                              <div class="">
                                <div class="Polaris-Labelled__LabelWrapper">
                                  <div class="Polaris-Label">
                                    <label
                                      id="TextField1Label"
                                      for="TextField1"
                                      class="Polaris-Label__Text"
                                    >
                                      Section name
                                    </label>
                                  </div>
                                </div>
                                <div class="Polaris-TextField">
                                  <input
                                    id="TextField1"
                                    placeholder="Featured"
                                    class="Polaris-TextField__Input"
                                    aria-labelledby="TextField1Label"
                                    aria-invalid="false"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                  <div class="Polaris-TextField__Backdrop"></div>
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

      <p>Add setting:</p>
      <h3>Layout</h3>
      <p>Margin</p>
      <input type="checkbox" onClick={(e) => toggleMargin(e.target.checked)} />
      <p>Content</p>
      <input type="checkbox" onClick={(e) => toggleContent(e.target.checked)} />
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
