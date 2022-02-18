import { Button, Card, ChoiceList, TextField } from "@shopify/polaris"
import { useState } from "react"
import { presetBlockSettings } from "./settings"

function CreateBlockForm(props) {
    const [typeTitle, setTypeTitle] = useState("Column with text")
    const [settings, setSettings] = useState([])

    function toggleBlockSetting(values) {
        const newSettings = values.map((id) =>
            presetBlockSettings.find((setting) => setting.id === id)
        )
        setSettings(newSettings)
    }

    function onSubmit() {
        props.onSubmit(typeTitle, settings)
        setTypeTitle("")
        setSettings([])
    }

    return (
        <>
            <Card.Section title="3. Create available blocks (optional)">
                <TextField
                    label="Block type"
                    id="block-type-input"
                    autocomplete="off"
                    placeholder="column-with-text"
                    onChange={(v) => setTypeTitle(v)}
                    value={typeTitle}
                />
            </Card.Section>
            <Card.Section title="4. Add block settings">
                <ChoiceList
                    allowMultiple
                    choices={presetBlockSettings.map((setting) => ({
                        label: setting.label,
                        value: setting.id,
                    }))}
                    onChange={(value) => toggleBlockSetting(value)}
                    selected={settings?.map(
                        (existingSetting) => existingSetting.id
                    )}
                />
                <Button primary onClick={onSubmit}>
                    Add
                </Button>
            </Card.Section>
        </>
    )
}

export default CreateBlockForm
