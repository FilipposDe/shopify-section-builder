const INDENT = 2

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

function getChildren(children) {
    const t = 1
    let str = ""
    str += `<div>\n`
    for (const childStr of children) {
        str += `${tab(t)}${childStr}`
    }
    str += `</div>\n`
    return str
}

function getLiquid(sectionClass) {
    let str = ""
    str += `<style>
    .trz-section-{{ section.id }} {
        {% if section.settings.max_width %}
        max-width: {{ section.settings.max_width }}px;
        margin: 0 auto;
        {% endif %}
        padding-top: {{ section.settings.padding_top }}px;
        padding-bottom: {{ section.settings.padding_bottom }}px;
        padding-right: {{ section.settings.padding_right }}px;
        padding-left: {{ section.settings.padding_left }}px;
        {% if section.settings.text_color != blank %}
        color: {{ section.settings.text_color }};
        {% endif %}
        {% if section.settings.bg_color != blank %}
        color: {{ section.settings.bg_color }};
        {% endif %}
    }

    .trz-section-{{ section.id }} .trz-row {
        display: flex;      
        margin-bottom: {{ section.settings.row_margin_bottom }}px; 
    }

    .trz-section-{{ section.id }} .trz-row:last-child {
        margin-bottom: 0; 
    }

    .trz-section-{{ section.id }} .trz-col {
        flex: 1;       
        display: flex;
        flex-direction: column;
    }
    
    @media (max-width: {{ section.settings.breakpoint }}px) {
        .trz-section-{{ section.id }} .trz-row {
            flex-direction: column;
        }
    } 

    {% for block in section.blocks %}
    .trz-col.trz-block-{{ block.id }} {
        padding-top: {{ block.settings.padding_y }}px;
        padding-bottom: {{ block.settings.padding_y }}px;
        padding-left: {{ block.settings.padding_x }}px;
        padding-right: {{ block.settings.padding_x }}px;
        text-align: {{ block.settings.text_align }};
        {% if block.settings.text_color != blank %}
        color: {{ block.settings.text_color }};
        {% endif %}
        {% if block.settings.bg_color != blank %}
        color: {{ block.settings.bg_color }};
        {% endif %}
        {% if block.settings.border_color != blank %}
        border-color: {{ block.settings.border_color }};
        {% endif %}
        align-items: {{ block.settings.align_items }};
        justify-content: {{ block.settings.justify_content }};
        border-radius: {{ block.settings.border_radius }}px;
        border-style: solid;
        border-width: {{ block.settings.border_width }}px;
        {% if block.settings.border_top_width != blank %}
        border-top-width: {{ block.settings.border_top_width }}px;
        {% endif %}
        {% if block.settings.border_bottom_width != blank %}
        border-top-width: {{ block.settings.border_bottom_width }}px;
        {% endif %}
        {% if block.settings.border_left_width != blank %}
        border-top-width: {{ block.settings.border_left_width }}px;
        {% endif %}
        {% if block.settings.border_right_width != blank %}
        border-top-width: {{ block.settings.border_right_width }}px;
        {% endif %}
    }

    {% endfor %}
</style>\n\n`

    str += `<section class="trz-section-{{ section.id }}">
    {% assign row_1_blocks = section.blocks | where: "type", "row_1_col" %}
    {% if row_1_blocks.size > 0 %}
        <div class="trz-row">
            {% for block in row_1_blocks %}
                <div class="trz-col trz-block-{{ block.id }}">
                    {% if block.settings.heading_type == 'text' %}
                    {{ block.settings.text_content }}
                    {% else %}
                    <{{ block.settings.heading_type }}>{{ block.settings.text_content }}</{{ block.settings.heading_type }}>
                    {% endif %}
                    {% if block.settings.image != nil %}
                    {{ block.settings.image | image_url: width: 1024 | image_tag }}
                    {% endif %}
                </div>
            {% endfor %}
        </div>
    {% endif %}
    {% assign row_2_blocks = section.blocks | where: "type", "row_2_col" %}
    {% if row_2_blocks.size > 0 %}
        <div class="trz-row">
            {% for block in row_2_blocks %}
                <div class="trz-col trz-block-{{ block.id }}">
                    {{ block.settings.text_content }}
                </div>
            {% endfor %}
        </div>
    {% endif %}
</section>\n\n`

    return str
}

export default getLiquid
