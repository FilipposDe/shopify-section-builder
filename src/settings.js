export const presetSectionSettings = [
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
        description: "Creates distance around the section",
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
        description: "Creates distance around the section",
    },
    {
        id: "title",
        label: "Section title",
        type: "text",
        placeholder: "Text here",
        effect: {
            type: "CONTENT",
            order: 1,
            code: `
    <h2>
      {{ section.settings.title }}
    </h2>
`,
        },
        description: "Title of the entire section",
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
            code: "{{ section.settings.html_title }}",
        },
    },
    {
        id: "text",
        label: "Section text",
        type: "text",
        placeholder: "Text here",
        effect: {
            type: "CONTENT",
            order: 2,
            code: "{{ section.settings.text }}",
        },
        description: "Basic text content of the section",
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
    return { ...settingData, index }
})

export const presetBlockSettings = [
    {
        id: "block_text",
        label: "Block text",
        type: "text",
        placeholder: "Text here",
        effect: {
            type: "CONTENT",
            order: 2,
            code: "{{ block.settings.block_text }}",
        },
    },
].map((settingData, index) => {
    return { ...settingData, index }
})
