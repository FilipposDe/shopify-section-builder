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
    result += `<section class='section-${name}'>\n`;
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
      <div>
        <form>
          <h3>Info</h3>
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Add setting:</p>
          <h3>Layout</h3>
          <p>Margin</p>
          <input
            type="checkbox"
            onClick={(e) => toggleMargin(e.target.checked)}
          />
          <p>Content</p>
          <input
            type="checkbox"
            onClick={(e) => toggleContent(e.target.checked)}
          />
          <h3>Blocks</h3>
          {/* <button onClick={addTextBlock}>Text</button> */}
          {/* <button onClick={addImageBlock}>Image</button> */}
        </form>
      </div>
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
