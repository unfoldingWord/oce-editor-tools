import {renderStyles as styles_} from './renderStyles'

const camelToKebabCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

/**
 * convert styles object into styles string
 * @param {object} styles
 * @return {string} objects flattened into string
 */
const styleObjectToString = (styles) => {
  let retArr = []
  Object.entries(styles).forEach(([key, value]) => {
    retArr.push(`${camelToKebabCase(key)}: ${value};`)
  })
  return retArr.flat(100).join(' ')
}


export class Render2Html {
  /**
   * create an instance of class that uses style passed in.  If styles not defined then will use default settings
   * @param {object} styles - optional custom styles to use for render
   */
  constructor(styles) {
    this.styles = styles || styles_;
  }
  
  /**
   * lookup style for type and subType
   * @param {string} type
   * @param {string} subType
   * @param {boolean} asObject - if true then return as object, otherwise combine into string.  Default is false
   * @return {(*)|*|string}
   */
  getStyles = (type, subType, asObject = false) => {
    if (!this.styles[type]) {
      throw new Error(`Unknown style type '${type}'`)
    }
    if (!this.styles[type][subType]) {
      console.log(`No styles for ${type}/${subType}`)
      return this.styles[type].default
    }
    const stylesObject = {...this.styles[type].default, ...this.styles[type][subType]}
    if (!asObject) {
      return styleObjectToString(stylesObject)
    }
    return stylesObject
  }

  InlineElement(props) {
    const newStyles = {
      ...this.getStyles('paras', 'displayInline', true),
      ...props.style,
    }
    return `<span
          style="${(styleObjectToString(newStyles))}"
        >
            ${props.children}
        </span>`
    /* if not display
      } else {
          return `<span
              style={{
                  verticalAlign: "super",
                  fontSize: "x-small",
                  fontWeight: "bold",
                  marginRight: "0.25em",
                  padding: "2px",
                  backgroundColor: "#CCC"
              }}
              onClick={toggleDisplay}
          >
          ${props.linkText}
      </span>`
      }
  */
  }

  /**
   * get render functions that are bound to this class instance
   * @return {{}} - object containing render functions
   */
  getRenderers() {
    const renderers = {
      text: (text) => text,
      chapter_label: (number) =>
          `<span style="${this.getStyles('marks', 'chapter_label')}">${number}</span>`,
      verses_label: (number) =>
          `<span style="${this.getStyles('marks', 'verses_label')}">${number}</span>`,
      paragraph: (subType, content, footnoteNo) => {
        return ['usfm:f', 'usfm:x'].includes(subType)
            ? this.InlineElement({
              style: this.getStyles('paras', subType, true),
              linkText: subType === 'usfm:f' ? footnoteNo : '*',
              children: content.flat(100).join(''),
            })
            : `<p style="${this.getStyles('paras', subType)}">${content.flat(100).join('')}</p>`
      },
      wrapper: (subType, content) =>
          `<span style="${this.getStyles('wrappers', subType)}">${content}</span>`,
      wWrapper: (atts, content) => {
        return Object.keys(atts).length === 0
            ? content
            : `<span
              style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  textAlign: "center"
              }}
          >
          <div>${content}</div>
              ${Object.entries(atts).map(
                (a) =>
                    `<div
                        style={{
                            fontSize: "xx-small",
                            fontWeight: "bold"
                        }}
                      >
                          {${a[0]} = ${a[1]}} 
                      </div>`
            )}
          </span>`
      },
      mergeParas: (paras) => paras.join('\n'),
    }

    // bind all the renderer methods to this object instance
    const renderers_ = {}
    for (const [key, method] of Object.entries(renderers)) {
      const boundMethod = method.bind(this)
      renderers_[key] = boundMethod
    }
    return renderers_;
  }
}
