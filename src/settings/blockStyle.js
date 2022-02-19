export const blockStyleSettings = [
    {
        type: "paragraph",
        content: ".",
    },
    {
        type: "paragraph",
        content: ".",
    },
    {
        type: "paragraph",
        content: ".",
    },
    {
        type: "header",
        content: "Spacing",
    },
    {
        id: "padding_x",
        label: "Padding X (px)",
        type: "number",
        placeholder: "0",
        info: "Space left and right of the block (inside)",
        default: 20,
    },
    {
        id: "padding_y",
        label: "Padding Y (px)",
        type: "number",
        placeholder: "0",
        info: "Space above and below of the block (inside)",
        default: 20,
    },
    {
        id: "margin_x",
        label: "margin X (px)",
        type: "number",
        placeholder: "0",
        info: "Space left and right of the block (outside)",
        default: 0,
    },
    {
        id: "margin_y",
        label: "margin Y (px)",
        type: "number",
        placeholder: "0",
        info: "Space above and below of the block (outside)",
        default: 0,
    },
    {
        type: "header",
        content: "Colors",
    },
    {
        id: "text_color",
        label: "Text color",
        type: "color",
        default: "#000000",
    },
    {
        id: "bg_color",
        label: "Background color",
        type: "color",
    },
    {
        id: "border_color",
        label: "Border color",
        type: "color",
        default: "#000000",
    },
    {
        type: "header",
        content: "Alignment",
    },
    {
        id: "text_align",
        type: "select",
        label: "Text align",
        default: "left",
        options: [
            {
                value: "center",
                label: "Center",
            },
            {
                value: "left",
                label: "Left",
            },
            {
                value: "right",
                label: "Right",
            },
        ],
    },
    {
        id: "align_items",
        type: "select",
        label: "Horizontal alignment",
        default: "normal",
        options: [
            {
                value: "normal",
                label: "Normal",
            },
            {
                value: "center",
                label: "Center",
            },
            {
                value: "flex-start",
                label: "Start",
            },
            {
                value: "flex-end",
                label: "End",
            },
            {
                value: "stretch",
                label: "Stretch",
            },
        ],
    },
    {
        id: "justify_content",
        type: "select",
        label: "Vertical alignment",
        default: "normal",
        options: [
            {
                value: "normal",
                label: "Normal",
            },
            {
                value: "center",
                label: "Center",
            },
            {
                value: "flex-start",
                label: "Start",
            },
            {
                value: "flex-end",
                label: "End",
            },
            {
                value: "space-between",
                label: "Space between",
            },
            {
                value: "space-arount",
                label: "Space arount",
            },
            {
                value: "space-evenly",
                label: "Space evenly",
            },
        ],
    },
    {
        type: "header",
        content: "Borders",
    },
    {
        id: "border_radius",
        label: "Border radius (px)",
        type: "number",
        placeholder: "0",
        default: 0,
    },
    {
        id: "border_width",
        label: "Border width (px)",
        type: "number",
        placeholder: "0",
        default: 0,
    },
    {
        id: "border_top_width",
        label: "Top border width (px)",
        type: "number",
        placeholder: "0",
    },
    {
        id: "border_bottom_width",
        label: "Bottom border width (px)",
        type: "number",
        placeholder: "0",
    },
    {
        id: "border_left_width",
        label: "Left border width (px)",
        type: "number",
        placeholder: "0",
    },
    {
        id: "border_right_width",
        label: "Right border width (px)",
        type: "number",
        placeholder: "0",
    },
]
