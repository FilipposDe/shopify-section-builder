import getLiquid from "./liquid"

const getResultHtml = (state) => {
    // /**
    //  * Initial style
    //  */

    // // Get settings and replace 'SECTION' with its class
    // const styleSettings = state.settings
    //     .filter((setting) => setting.effect.type === "STYLE_DECLARATION")
    //     .map((setting) => {
    //         const newSetting = JSON.parse(JSON.stringify(setting))
    //         if (newSetting.effect.selector === "SECTION") {
    //             newSetting.effect.selector = `.section-${state.className}-{{ section.id }}`
    //         }
    //         return newSetting
    //     })

    // // Populate rules array
    // const cssRules = []
    // const selectors = styleSettings.map((setting) => setting.effect.selector)
    // const uniqueSelectors = Array.from(new Set(selectors))
    // for (const selector of uniqueSelectors) {
    //     const cssRule = {
    //         selector,
    //     }
    //     const declarations = styleSettings
    //         .filter((setting) => setting.effect.selector === selector)
    //         .map((setting) => setting.effect.declarationText)
    //     cssRule.declarations = declarations
    //     cssRules.push(cssRule)
    // }

    // /**
    //  * Content
    //  */

    // const contentSettings = state.settings
    //     ?.filter((setting) => setting.effect.type === "CONTENT")
    //     .sort((a, b) => a.order < b.order)

    // const sectionContents = contentSettings.map(
    //     (setting) => setting.effect.code
    // )
    // const blocks = []
    // const sectionChildren = [...sectionContents, ...blocks]

    return getLiquid(state.className)

    //     // Setup content settings

    //     // const contentBlocksSettings = state.blocks?.map((block) => {
    //     //   return block?.settings
    //     //     ?.filter((setting) => setting.effect.type === "CONTENT")
    //     //     .sort((a, b) => a.order < b.order);
    //     // });
    //     // //   .reduce((a, b) => {
    //     // //     return { ...a, [b.type]: b };
    //     // //   }, {});
    //     // console.log({ contentBlocksSettings });

    //     // Main file building

    //     let result = ""

    //     // - Content
    //     result += `
    // <section className="section-${state.className}">`
    //     // - - Section content
    //     for (const setting of contentSectionSettings) {
    //         result += `
    //   <div className="custom-${setting.id}">${setting.effect.code}  </div>\n`
    //     }
    //     // - - End section content
    //     // - - Blocks content
    //     if (state.blocks.length) {
    //         result += `  <div className="custom-blocks">\n`
    //         result += `    {% for block in section.blocks %}\n`
    //         result += `      <div className="custom-block">\n`
    //         result += `        {% case block.type %}\n`
    //         for (const type of state.blocks.map((block) => block.type)) {
    //             result += `          {% when '${type}' %}\n`
    //             // eslint-disable-next-line no-unsafe-optional-chaining
    //             for (const setting of state.blocks.find(
    //                 (block) => block.type === type
    //             )?.settings)
    //                 result += `          <div className="custom-block-${setting.id}">
    //             ${setting.effect.code}
    //           </div>\n`
    //         }
    //         result += `          {% else %}\n`
    //         result += `        {% endcase %}\n`
    //         result += `      </div>\n`
    //         result += `    {% endfor %}\n`
    //         result += `  </div>\n`
    //     }
    //     // - - End blocks content
    //     result += "</section>\n"
    //     result += "\n"
    //     // - End Content

    // return result
}

export default getResultHtml
