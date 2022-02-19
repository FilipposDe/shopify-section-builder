export const presetSectionSettings = [
    /**
     * Default style
     */
    {
        id: "padding-left",
        label: "Padding left (px)",
        type: "number",
        placeholder: "0",
        description: "Space left of the section",
    },
    {
        id: "padding-right",
        label: "Padding right (px)",
        type: "number",
        placeholder: "0",
        description: "Space right of the section",
    },
    {
        id: "padding-top",
        label: "Padding top (px)",
        type: "number",
        placeholder: "0",
        description: "Space above the section",
    },
    {
        id: "padding-bottom",
        label: "Padding bottom (px)",
        type: "number",
        placeholder: "0",
        description: "Space below the section",
    },
    {
        id: "max-width",
        label: "Max width (px)",
        type: "number",
        placeholder: "0",
        description:
            "Prevent from the section from being full width (inspect how the other sections of the theme behave)",
    },
    {
        id: "media-breakpoint",
        label: "Mobile breakpoint (px)",
        type: "number",
        placeholder: "0",
        description:
            "The point in which rows become vertical as the screen width becomes smaller (inspect how the other sections of the theme behave)",
    },
    {
        id: "row-margin-bottom",
        label: "Row bottom margin (px)",
        type: "number",
        placeholder: "0",
        description: "Space below each row",
    },
    {
        id: "text-color",
        label: "Text color",
        type: "color",
        description: "Main section text color",
    },
    {
        id: "bg-color",
        label: "Background color",
        type: "color",
        description: "Main section background color",
    },
    /**
     * Content
     */
    {
        id: "title",
        label: "Section title",
        type: "text",
        placeholder: "Text here",
        effect: {
            type: "CONTENT",
            order: 1,
            code: `<h2>
      {{ section.settings.title }}
    </h2>\n`,
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
            code: "{{ section.settings.html_title }}\n",
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
