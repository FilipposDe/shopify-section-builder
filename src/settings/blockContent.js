export const blockContentSettings = [
    {
        type: "header",
        content: "Line 1 content",
    },
    {
        id: "text_content",
        label: "Text",
        type: "richtext",
    },
    {
        id: "heading_type",
        label: "Heading type",
        type: "select",
        options: [
            {
                label: "Plain text",
                value: "text",
            },
            {
                label: "H1",
                value: "h1",
            },
            {
                label: "H2",
                value: "h2",
            },
            {
                label: "H3",
                value: "h3",
            },
        ],
    },
    {
        id: "image",
        label: "Image",
        type: "image_picker",
    },
]
