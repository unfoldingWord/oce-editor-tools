// render stles for RTL
const renderStyles = {
  paras: {
    default: {
      direction: 'rtl',
      fontSize: 'medium',
      marginTop: '0.5ex',
      marginBottom: '0.5ex',
    },
    displayInline: {
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
      backgroundColor: "#CCC",
      marginTop: "1em",
      marginBottom: "1em"
    },
    nonDisplayInline: {
      verticalAlign: 'super',
      fontSize: 'x-small',
      fontWeight: 'bold',
      marginLeft: '0.25em',
      padding: '2px',
      backgroundColor: '#CCC',
    },
    'usfm:b': {
      height: '1em',
    },
    'usfm:d': {
      fontStyle: 'italic',
    },
    'usfm:f': {
      fontSize: 'small',
    },
    'usfm:hangingGraft': {},
    'usfm:imt': {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 'xx-large',
      textAlign: 'center',
    },
    'usfm:imt2': {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 'x-large',
      textAlign: 'center',
    },
    'usfm:imt3': {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 'large',
      textAlign: 'center',
    },
    'usfm:ip': {
      textIndent: '1.5em',
    },
    'usfm:ipi': {
      paddingRight: '1.5em',
      textIndent: '1.5em',
    },
    'usfm:io': {
      paddingRight: '1.5em',
    },
    'usfm:iot': {
      fontWeight: 'bold',
      fontSize: 'large',
    },
    'usfm:is': {
      fontStyle: 'italic',
      fontSize: 'xx-large',
    },
    'usfm:is2': {
      fontStyle: 'italic',
      fontSize: 'x-large',
    },
    'usfm:is3': {
      fontStyle: 'italic',
      fontSize: 'large',
    },
    'usfm:li': {
      listStyleType: 'disc',
      paddingRight: '3em',
      textIndent: '-1.5em',
    },
    'usfm:li2': {
      listStyleType: 'disc',
      paddingRight: '4.5em',
      textIndent: '-1.5em',
    },
    'usfm:li3': {
      listStyleType: 'disc',
      paddingRight: '6em',
      textIndent: '-1.5em',
    },
    'usfm:m': {},
    'usfm:mi': {
      paddingLeft: '1.5em',
    },
    'usfm:mr': {
      fontSize: 'large',
      fontStyle: 'italic',
    },
    'usfm:ms': {
      fontSize: 'large',
      fontWeight: 'bold',
    },
    'usfm:ms2': {
      fontWeight: 'bold',
    },
    'usfm:mt': {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 'xx-large',
      textAlign: 'center',
    },
    'usfm:mt2': {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 'x-large',
      textAlign: 'center',
    },
    'usfm:mt3': {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 'large',
      textAlign: 'center',
    },
    'usfm:nb': {},
    'usfm:p': {
      textIndent: '1.5em',
    },
    'usfm:pc': {
      textAlign: 'center',
    },
    'usfm:pi': {
      paddingRight: '1.5em',
      textIndent: '1.5em',
    },
    'usfm:pi2': {
      paddingRight: '3em',
      textIndent: '1.5em',
    },
    'usfm:pi3': {
      paddingRight: '4.5em',
      textIndent: '1.5em',
    },
    'usfm:q': {
      paddingRight: '1.5em',
      marginTop: '0.5ex',
      marginBottom: '0.5ex',
    },
    'usfm:q2': {
      paddingRight: '3em',
      marginTop: '0.5ex',
      marginBottom: '0.5ex',
    },
    'usfm:q3': {
      paddingRight: '4.5em',
      marginTop: '0.5ex',
      marginBottom: '0.5ex',
    },
    'usfm:q4': {
      paddingRight: '6em',
      marginTop: '0.5ex',
      marginBottom: '0.5ex',
    },
    'usfm:qa': {
      fontWeight: 'bold',
      fontSize: 'x-large',
    },
    'usfm:qr': {
      textAlign: 'right',
    },
    'usfm:r': {
      fontWeight: 'bold',
    },
    'usfm:s': {
      fontStyle: 'italic',
      fontSize: 'xx-large',
    },
    'usfm:s2': {
      fontStyle: 'italic',
      fontSize: 'x-large',
    },
    'usfm:s3': {
      fontStyle: 'italic',
      fontSize: 'large',
    },
    'usfm:sr': {
      fontSize: 'large',
    },
    'usfm:tr': {},
    'usfm:x': {
      fontSize: 'small',
    },
  },
  marks: {
    default: {},
    chapter_label: {
      float: 'right',
      fontSize: 'xx-large',
      marginLeft: '0.5em',
    },
    verses_label: {
      fontWeight: 'bold',
      fontSize: 'small',
      verticalAlign: 'super',
      marginLeft: '0.5em',
    },
  },
  extendedBcvInfo: {
    default: {
      fontSize: 'xx-large',
      fontWeight: 'bold',
      verticalAlign: 'super',
      marginLeft: '0.5em',
    },
  },
  wrappers: {
    default: {},
    'usfm:add': {
      fontStyle: 'italic',
    },
    'usfm:bd': {
      fontWeight: 'bold',
    },
    'usfm:bdit': {
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    'usfm:bk': {
      fontWeight: 'bold',
    },
    chapter: {},
    'usfm:fl': {},
    'usfm:fm': {},
    'usfm:fq': {
      fontStyle: 'italic',
    },
    'usfm:fqa': {
      fontStyle: 'italic',
    },
    'usfm:fr': {
      fontWeight: 'bold',
    },
    'usfm:ft': {},
    'usfm:it': {
      fontStyle: 'italic',
    },
    'usfm:nd': {
      fontWeight: 'bold',
      fontSize: 'smaller',
      textTransform: 'uppercase',
    },
    'usfm:qs': {
      float: 'left',
      fontStyle: 'italic',
    },
    'usfm:sc': {
      fontSize: 'smaller',
      textTransform: 'uppercase',
    },
    'usfm:tl': {
      fontStyle: 'italic',
    },
    verses: {},
    'usfm:wj': {
      color: '#D00',
    },
    'usfm:xk': {},
    'usfm:xo': {
      fontWeight: 'bold',
    },
    'usfm:xt': {},
  },
};

export { renderStyles };
