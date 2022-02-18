/* eslint-disable no-unreachable */
import React from "react"
import { hot } from "react-hot-loader"
import "@shopify/polaris/build/esm/styles.css"
import "./App.css"
import enTranslations from "@shopify/polaris/locales/en.json"
import {
    AppProvider,
    Page,
    Card,
    Button,
    Layout,
    TextField,
    Heading,
    ChoiceList,
    Badge,
    Stack,
    ResourceList,
    ResourceItem,
    TextStyle,
} from "@shopify/polaris"
import getLiquid from "./liquid"
import { presetBlockSettings, presetSectionSettings } from "./settings"
import CreateBlockForm from "./CreateBlockForm"
import { useStore } from "./Context"

function App() {
    const [state, dispatch] = useStore()
    const ref = React.useRef(null)

    function toggleSectionSetting(values) {
        const newSettings = values.map((id) =>
            presetSectionSettings.find((setting) => setting.id === id)
        )
        dispatch({ type: "SET_SECTION_SETTING", payload: newSettings })
    }

    function addBlock(title, settings) {
        dispatch({
            type: "ADD_SECTION_BLOCK",
            payload: {
                name: title,
                type: title.replace(/\s/g, "-").toLowerCase(),
                settings: settings,
            },
        })
    }

    // Schema
    const resultSchemaJson = {
        name: state.name,
        settings: [
            ...state.settings
                .sort((a, b) => {
                    return a.index - b.index
                })
                .map((setting) => {
                    const { id, type, placeholder, label } = setting
                    return { id, type, placeholder, label }
                }),
        ],
        blocks: [
            ...state.blocks.map((block) => {
                const { type, settings, name } = block
                const cleanSettings = settings.map((setting) => {
                    const { id, type, placeholder, label } = setting
                    return { id, type, placeholder, label }
                })
                return { type, name, settings: cleanSettings }
            }),
        ],
        presets: [
            {
                name: state.name,
            },
        ],
    }

    console.log({ state, resultJson: resultSchemaJson })

    return (
        <AppProvider i18n={enTranslations}>
            <Page title="Build your own section" fullWidth>
                <Layout>
                    <Layout.Section oneHalf>
                        <Card>
                            <Card.Section title="1. Set section info">
                                <TextField
                                    label="Name"
                                    id="section-name-input"
                                    autoComplete="off"
                                    placeholder="Featured"
                                    value={state.name}
                                    onChange={(v) =>
                                        dispatch({
                                            type: "SET_NAME",
                                            payload: v,
                                        })
                                    }
                                />
                            </Card.Section>
                            <Card.Section title="2. Add section settings">
                                <Heading>Style</Heading>
                                <ChoiceList
                                    allowMultiple
                                    //   title="While the customer is checking out"
                                    choices={presetSectionSettings
                                        .filter(
                                            (setting) =>
                                                setting.effect.type ===
                                                "STYLE_DECLARATION"
                                        )
                                        .map((setting) => ({
                                            label: setting.label,
                                            helpText:
                                                setting.description ||
                                                "Section settings",
                                            value: setting.id,
                                        }))}
                                    onChange={(value) =>
                                        toggleSectionSetting(value)
                                    }
                                    selected={state.settings?.map(
                                        (existingSetting) => existingSetting.id
                                    )}
                                />
                                <Heading>Content</Heading>
                                <ChoiceList
                                    allowMultiple
                                    //   title="While the customer is checking out"
                                    choices={presetSectionSettings
                                        .filter(
                                            (setting) =>
                                                setting.effect.type ===
                                                "CONTENT"
                                        )
                                        .map((setting) => ({
                                            label: setting.label,
                                            helpText:
                                                setting.description ||
                                                "Section settings",
                                            value: setting.id,
                                        }))}
                                    onChange={(value) =>
                                        toggleSectionSetting(value)
                                    }
                                    selected={state.settings?.map(
                                        (existingSetting) => existingSetting.id
                                    )}
                                />
                            </Card.Section>

                            <CreateBlockForm onSubmit={addBlock} />

                            <Card.Section title="Your added blocks">
                                <Card>
                                    <ResourceList
                                        resourceName={{
                                            singular: "block",
                                            plural: "blocks",
                                        }}
                                        items={state.blocks}
                                        renderItem={(block) => {
                                            return (
                                                <ResourceItem
                                                    id={block.type}
                                                    accessibilityLabel={`View details for ${block.name}`}
                                                    shortcutActions={[
                                                        {
                                                            content: "Delete",
                                                            onClick: (e) => {
                                                                dispatch({
                                                                    type: "REMOVE_SECTION_BLOCK",
                                                                    payload:
                                                                        block.type,
                                                                })
                                                            },
                                                        },
                                                    ]}
                                                >
                                                    <h3>
                                                        <TextStyle variation="strong">
                                                            {block.name}
                                                        </TextStyle>
                                                    </h3>
                                                    <Stack spacing="extra-tight">
                                                        {block.settings
                                                            .length ? (
                                                            block.settings?.map(
                                                                (setting) => {
                                                                    return (
                                                                        <Badge
                                                                            key={
                                                                                setting.label
                                                                            }
                                                                        >
                                                                            {
                                                                                setting.label
                                                                            }
                                                                        </Badge>
                                                                    )
                                                                }
                                                            )
                                                        ) : (
                                                            <Badge>
                                                                No settings
                                                                added
                                                            </Badge>
                                                        )}
                                                    </Stack>
                                                </ResourceItem>
                                            )
                                        }}
                                    />
                                </Card>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card
                            title="Section file content"
                            actions={[
                                {
                                    content: "Copy code",
                                    onClick: (e) => {
                                        const el =
                                            document.createElement("textarea")
                                        el.value = ref.current.innerText
                                        document.body.appendChild(el)
                                        el.select()
                                        document.execCommand("copy")
                                        document.body.removeChild(el)
                                        alert("Copied!")
                                    },
                                },
                            ]}
                        >
                            <Card.Section>
                                <pre style={{ width: "100%" }}>
                                    <code
                                        ref={ref}
                                        className="Polaris-TextStyle--variationCode"
                                    >
                                        {state.code}
                                        {"{% schema %}"}
                                        <br />
                                        {JSON.stringify(
                                            resultSchemaJson,
                                            null,
                                            2
                                        )}
                                        <br />
                                        {"{% endschema %}"}
                                    </code>
                                </pre>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </AppProvider>
    )
}

export default hot(module)(App)
