import React from "react"
import ReactDOM from "react-dom"
import App from "./App.js"
import { StoreProvider } from "./Context.js"
import { initialState, reducer } from "./reducer.js"

ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={reducer}>
        <App />
    </StoreProvider>,
    document.getElementById("root")
)
