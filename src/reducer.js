import getResultHtml from "./resultHtml"
import getResultSchema from "./resultSchema"

export const initialState = {
    name: "Custom section",
    className: "custom-section",
    settings: [],
    blocks: [],
    html: "",
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "INIT_CODE": {
            return {
                ...state,
                html: getResultHtml(state),
                schema: getResultSchema(state),
            }
        }
        case "SET_NAME": {
            const name = action.payload
            const className = name.replace(/\s/g, "-").toLowerCase()
            const newState = {
                ...state,
                name: name,
                className: className,
            }
            return {
                ...newState,
                html: getResultHtml(newState),
                schema: getResultSchema(newState),
            }
        }
        case "SET_SECTION_SETTING": {
            const newState = {
                ...state,
                settings: [...action.payload],
            }
            return {
                ...newState,
                html: getResultHtml(newState),
                schema: getResultSchema(newState),
            }
        }
        case "ADD_SECTION_BLOCK": {
            const newState = {
                ...state,
                blocks: [...state.blocks, action.payload],
            }
            return {
                ...newState,
                html: getResultHtml(newState),
                schema: getResultSchema(newState),
            }
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
            return {
                ...newState,
                html: getResultHtml(newState),
                schema: getResultSchema(newState),
            }
        }
        default:
            return state
    }
}
