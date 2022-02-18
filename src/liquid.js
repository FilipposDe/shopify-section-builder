const INDENT = 4

function tab(times = 1) {
    return new Array(INDENT * times).fill(" ").join("")
}

function getCssDeclarationsHtml(declarations, t) {
    return declarations.map((dec) => `${tab(t)}${dec}`).join("\n")
}

function getRuleStr(rule, t) {
    const { selector, declarations } = rule
    let str = ""
    str += `${tab(t)}${selector} {\n`
    str += `${getCssDeclarationsHtml(declarations, t + 1)}\n`
    str += `${tab(t)}}\n`
    return str
}

function getStyle(rules) {
    const t = 0
    let str = ""
    str += `<style>\n`
    for (const rule of rules) {
        str += getRuleStr(rule, t + 1)
    }
    str += `</style>\n`
    return str
}

function getLiquid(cssRules) {
    const style = getStyle(cssRules)

    return `${style}
<section>
</section>\n\n`
}

export default getLiquid
