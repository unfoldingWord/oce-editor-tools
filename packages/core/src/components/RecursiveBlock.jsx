/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { HtmlPerfEditor } from '@xelah/type-perf-html'
import { getCurrentVerse, getCurrentChapter } from '../helpers/getReferences'

const getTarget = ({ content }) => {
  const div = document.createElement("div");
  div.innerHTML = content;

  const { target } = div.firstChild?.dataset || {};

  return target;
};

export default function RecursiveBlock({
  htmlPerf,
  onHtmlPerf,
  sequenceIds,
  addSequenceId,
  options,
  content,
  style,
  contentEditable,
  index,
  verbose,
  setFootNote,
  bookId,
  onReferenceSelected,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log("Block: Mount/First Render", index);
    return () => {
      if (verbose) console.log("Block: UnMount/Destroyed", index);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkReturnKeyPress = (event) => {
    if (verbose) console.log( event  )
    if (event.key === "Enter") {
      let activeTextArea = document.activeElement;
      if (activeTextArea.children.length > 1) {
        const lineBreak = activeTextArea.children[1]?.outerHTML;
        activeTextArea.children[1].outerHTML = lineBreak.replace(/<br\s*\/?>/gi, "&nbsp");
      }
    }
  };

  const checkCurrentVerse = () => {
    const range = document.getSelection().getRangeAt(0)
    const selectedNode = range.startContainer
    const verse = getCurrentVerse(selectedNode)
    const chapter = getCurrentChapter(selectedNode)
    if ( onReferenceSelected && chapter && verse ) {
      onReferenceSelected({ bookId, chapter, verse })
    }
  }

  let component;

  let editable = !!content.match(/data-type="paragraph"/);

  if (editable) {
    component = (
      <div
        contentEditable={contentEditable}
        onKeyUp={checkReturnKeyPress}
        onMouseUp={checkCurrentVerse}
        {...props}
      />
    );
  }

  if ( ! editable ) {
    const sequenceId = getTarget({ content });

    if (sequenceId && !options.preview) {
      const _props = {
        sequenceIds: [...sequenceIds, sequenceId],
        addSequenceId,
        htmlPerf,
        onHtmlPerf,
      };
      component = <HtmlPerfEditor {..._props} />;
    }
    component ||= <div {...props} contentEditable={false} />;
  }

  return <>{component}</>;
}
