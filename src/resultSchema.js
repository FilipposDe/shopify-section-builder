import { blockStyleSettings } from "./settings/blockStyle"
import { blockContentSettings } from "./settings/blockContent"
import { sectionStyleSettings } from "./settings/sectionStyle"

function prepSettings(settingsArr) {
    return settingsArr.map((setting) => {
        if (["header", "paragraph"].includes(setting.type)) {
            return {
                type: setting.type,
                content: setting.content,
            }
        } else {
            const result = {
                id: setting.id,
                type: setting.type,
                label: setting.label,
                info: setting.info,
                placeholder: setting.placeholder,
                default: setting.default,
                options: setting.options,
            }

            return result
        }
    })
}

const getResultSchema = (state) => {
    const sectionSettings = prepSettings([...sectionStyleSettings])
    const blockSettings = prepSettings([
        ...blockContentSettings,
        ...blockStyleSettings,
    ])
    const schemaJson = {
        name: state.name,
        settings: sectionSettings,
        blocks: [
            {
                type: "row_1_col",
                name: "Column for 1st row",
                settings: blockSettings,
            },
            {
                type: "row_2_col",
                name: "Column for 2nd row",
                settings: blockSettings,
            },
            {
                type: "row_3_col",
                name: "Column for 3rd row",
                settings: blockSettings,
            },
            {
                type: "row_4_col",
                name: "Column for 4th row",
                settings: blockSettings,
            },
        ],
        // blocks: [
        //     ...state.blocks.map((block) => {
        //         const { type, settings, name } = block
        //         const cleanSettings = settings.map((setting) => {
        //             const { id, type, placeholder, label } = setting
        //             return { id, type, placeholder, label }
        //         })
        //         return { type, name, settings: cleanSettings }
        //     }),
        // ],
        presets: [
            {
                name: state.name,
            },
        ],
    }

    return `{% schema %}
${JSON.stringify(schemaJson, null, 4)}
{% endschema %}`
}

export default getResultSchema
