/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { renderStyles as styles } from './renderStyles';

const getStyles = (type, subType) => {
  if (!styles[type]) {
    throw new Error(`Unknown style type '${type}'`);
  }
  if (!styles[type][subType]) {
    console.log(`No styles for ${type}/${subType}`);
    return styles[type].default;
  }
  return { ...styles[type].default, ...styles[type][subType] };
};

function InlineElement(props) {
  const [display, setDisplay] = useState(false);
  const toggleDisplay = () => setDisplay(!display);
  if (display) {
    return (
      <div
        style={{
          ...props.style,
          paddingLeft: '0.5em',
          paddingRight: '0.5em',
          backgroundColor: '#CCC',
          marginTop: '1em',
          marginBottom: '1em',
        }}
        onClick={toggleDisplay}
      >
        {props.children}
      </div>
    );
  } else {
    return (
      <span
        style={{
          verticalAlign: 'super',
          fontSize: 'x-small',
          fontWeight: 'bold',
          marginRight: '0.25em',
          padding: '2px',
          backgroundColor: '#CCC',
        }}
        onClick={toggleDisplay}
      >
        {props.linkText}
      </span>
    );
  }
}

const renderers = {
  text: (text) => text,
  chapter_label: (number) => (
    <span style={getStyles('marks', 'chapter_label')}>{number}</span>
  ),
  verses_label: (number) => (
    <span style={getStyles('marks', 'verses_label')}>{number}</span>
  ),
  extended_bcv_info: (verseId,extInfo) => {
    if (extInfo?.onRenderItem) {
      return extInfo.onRenderItem({
        verseId,
        extInfo
      })
    } else {
      return <span style={getStyles('extendedBcvInfo')}>{JSON.stringify(extInfo)}</span>
    }  
  },
  paragraph: (subType, content, footnoteNo) =>
    ['usfm:f', 'usfm:x'].includes(subType) ? (
      <InlineElement
        style={getStyles('paras', subType)}
        linkText={subType === 'usfm:f' ? `${footnoteNo}` : '*'}
      >
        {content}
      </InlineElement>
    ) : (
      <p style={getStyles('paras', subType)}>{content}</p>
    ),
  wrapper: (subType, content) => (
    <span style={getStyles('wrappers', subType)}>{content}</span>
  ),
  wWrapper: (atts, content) =>
    Object.keys(atts).length === 0 ? (
      content
    ) : (
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'top',
          textAlign: 'center',
        }}
      >
        <div>{content}</div>
        {Object.entries(atts).map((a,inx) => (
          <div
            style={{
              fontSize: 'xx-small',
              fontWeight: 'bold',
            }}
            key={inx}
          >
            {`${a[0]} = ${a[1]}`}
          </div>
        ))}
      </span>
    ),
  mergeParas: (paras) => paras,
};

export { renderers, styles };
