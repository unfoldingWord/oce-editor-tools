/* eslint-disable no-unused-vars */
import React,
{ useEffect }
from 'react'
import { HtmlPerfEditor } from '@xelah/type-perf-html'
import { getCurrentVerse, getCurrentChapter } from '../helpers/getReferences'
import { useEditorContext } from '../context/EditorCacheProvider'

const getTarget = ({ content }) => {
  const div = document.createElement("div")
  div.innerHTML = content

  const { target } = div.firstChild?.dataset || {}

  return target
}

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
  setCaretPosition,
  block,
  ...props
}) {
  const {
    actions: { setReference },
  } = useEditorContext();

  useEffect(() => {
    if (verbose) console.log("Block: Mount/First Render", index)
    return () => {
      if (verbose) console.log("Block: UnMount/Destroyed", index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkReturnKeyPress = (event) => {
    let activeTextArea = document.activeElement
    if (event.key === "Enter") {
      if (activeTextArea.children.length > 1) {
        const lineBreak = activeTextArea.children[1]?.outerHTML
        activeTextArea.children[1].outerHTML = lineBreak.replace(/<br\s*\/?>/gi, "&nbsp")
      }
    }
  }

  const getReferenceFromCaretPosition = () => {
    if (document.getSelection().rangeCount < 1) return;
    const range = document.getSelection().getRangeAt(0)
    const selectedNode = range.startContainer
    const verse = getCurrentVerse(selectedNode)
    const chapter = getCurrentChapter(selectedNode)
    if (verbose) console.log("checkCurrentVerse", { chapter, verse });
    return { bookId, chapter, verse };
  }

  const setReferenceFromCaretPosition = () => {
    if (!setReference) return;
    const { bookId, chapter, verse } = getReferenceFromCaretPosition() ?? {};
    if(bookId && chapter && verse)
      setReference({ bookId, chapter, verse });
  }

  let component

  let editable = !!content.match(/data-type="paragraph"/)

  if (block) {
    let blockProps = {
      editable,
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
      setCaretPosition,
      setReference,
      getReferenceFromCaretPosition,

      ...props,
    };
    return block({ ...blockProps });
  }

  if (editable) {
    component = (
      <div
        className="editor-paragraph"
        contentEditable={contentEditable}
        onKeyUp={checkReturnKeyPress}
        onKeyDown={checkReturnKeyPress}
        onMouseUp={setReferenceFromCaretPosition}
        {...props}
      />
    );
  }

  if (!editable) {
    const sequenceId = getTarget({ content })

    if (sequenceId && !options.preview) {
      const _props = {
        sequenceIds: [...sequenceIds, sequenceId],
        addSequenceId,
        htmlPerf,
        onHtmlPerf,
      }
      component = <HtmlPerfEditor {..._props} />
    }
    component ||= <div {...props} contentEditable={false} />
  }

  return <>{component}</>
}
