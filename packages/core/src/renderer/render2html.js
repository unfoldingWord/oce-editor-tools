import {renderStyles as styles} from './renderStyles'

const camelToKebabCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

/**
 * convert styles object into styles string
 * @param {object} styles
 * @return {string} objects flattened into string
 */
function styleObjectToString(styles) {
  let retArr = []
  Object.entries(styles).forEach(([key, value]) => {
    retArr.push(`${camelToKebabCase(key)}: ${value};`)
  })
  return retArr.flat(100).join(' ')
}

/**
 * lookup style for type and subType
 * @param {string} type
 * @param {string} subType
 * @param {boolean} asObject - if true then return as object, otherwise combine into string.  Default is false
 * @return {(*)|*|string}
 */
const getStyles = (type, subType, asObject = false) => {
  if (!styles[type]) {
    throw new Error(`Unknown style type '${type}'`)
  }
  if (!styles[type][subType]) {
    console.log(`No styles for ${type}/${subType}`)
    return styles[type].default
  }
  const stylesObject = { ...styles[type].default, ...styles[type][subType] }
  if (!stylesObject) {
    return styleObjectToString(stylesObject)
  }
  return stylesObject
}

function InlineElement(props) {
  const newStyles = {
    ...props.style,
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    backgroundColor: "#CCC",
    marginTop: "1em",
    marginBottom: "1em"
  }
  return `<span
            style="${(styleObjectToString(newStyles))}"
            onClick={toggleDisplay}
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

const renderers = {
  text: (text) => text,
  chapter_label: (number) =>
    `<span style="${getStyles('marks', 'chapter_label')}">${number}</span>`,
  verses_label: (number) =>
    `<span style="${getStyles('marks', 'verses_label')}">${number}</span>`,
  paragraph: (subType, content, footnoteNo) => {
    return ['usfm:f', 'usfm:x'].includes(subType)
      ? InlineElement({
        style: getStyles('paras', subType, true),
        linkText: subType === 'usfm:f' ? footnoteNo : '*',
        children: content.flat(100).join(''),
      })
      : `<p style="${getStyles('paras', subType)}">${content.flat(100).join('')}</p>`},
  wrapper: (subType, content) =>
    `<span style="${getStyles('wrappers', subType)}">${content}</span>`,
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

export { renderers }
