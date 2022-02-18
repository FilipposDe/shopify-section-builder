import getResultHtml from "./resultHtml"

const initialHtml = `<style>
</style>

<section>
</section>

`

export const initialState = {
    name: "Custom section",
    className: "custom-section",
    settings: [],
    blocks: [],
    code: initialHtml,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_NAME": {
            const name = action.payload
            const className = name.replace(/\s/g, "-").toLowerCase()
            const newState = {
                ...state,
                name: name,
                className: className,
            }
            return { ...newState, code: getResultHtml(newState) }
        }
        case "SET_SECTION_SETTING": {
            const newState = {
                ...state,
                settings: [...action.payload],
            }
            return { ...newState, code: getResultHtml(newState) }
        }
        case "ADD_SECTION_BLOCK": {
            const newState = {
                ...state,
                blocks: [...state.blocks, action.payload],
            }
            return { ...newState, code: getResultHtml(newState) }
        }
        case "REMOVE_SECTION_BLOCK": {
            const newState = {
                ...state,
                blocks: [
                    ...state.blocks.filter(
                        (block) => block.type !== action.payload
                    ),
                ],
            }
            return { ...newState, code: getResultHtml(newState) }
        }
        default:
            return state
    }
}
