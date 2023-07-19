/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { HtmlPerfEditor } from '@xelah/type-perf-html'
import { getCurrentVerse, getCurrentChapter } from '../helpers/getReferences'
import { getCurrentCursorPosition } from '../helpers/cursorUtils'

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
  onReferenceSelected,
  setCaretPosition,
  ...props
}) {
  const [currentVerse, setCurrentVerse] = useState(null)
  useEffect(() => {
    if (verbose) console.log("Block: Mount/First Render", index)
    return () => {
      if (verbose) console.log("Block: UnMount/Destroyed", index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkReturnKeyPress = (event) => {
    let activeTextArea = document.activeElement
    if (verbose) console.log( event  )
    if (event.key === "Enter") {
//      let activeTextArea = document.activeElement
      if (activeTextArea.children.length > 1) {
        const lineBreak = activeTextArea.children[1]?.outerHTML
        activeTextArea.children[1].outerHTML = lineBreak.replace(/<br\s*\/?>/gi, "&nbsp")
      }
    }
  }

  const checkCurrentVerse = () => {
    if (document.getSelection().rangeCount >= 1 && onReferenceSelected) {
      const range = document.getSelection().getRangeAt(0)
      console.log({ range })
      const selectedNode = range.startContainer
      console.log({ selectedNode })
      const verse = getCurrentVerse(selectedNode)
      const chapter = getCurrentChapter(selectedNode)
      if (verbose) console.log("checkCurrentVerse", { chapter, verse });
      console.log({bookId})
      if ( onReferenceSelected && chapter && verse ) 
        onReferenceSelected({ bookId, chapter, verse })
    }
  }

  // const updateCursorPosition = () => {
  //   let cursorPosition = getCurrentCursorPosition('editor')
  //   console.log(cursorPosition)
  //   setCaretPosition && setCaretPosition(cursorPosition)
  // }
  // const updateVerseNumber = () => {
  //   const selectedNode = document.getSelection().getRangeAt(0).startContainer
  //   console.log({ selectedNode })
  //   selectedNode.previousElementSibling ? setCurrentVerse(document.getSelection().getRangeAt(0).startContainer?.previousElementSibling?.dataset.attsNumber) : setCurrentVerse(null)
  //   if (selectedNode.previousElementSibling) {
  //     console.log("no prev sibling")
  //   }
  //   console.log("mouse click", { currentVerse })
  // }
  // const diableBackspace = (event) => {
  //   if (event.keyCode == 8) {
  //     console.log("BACKSPACE")
  //     event.preventDefault()
  //   }
  // }
  let component

  let editable = !!content.match(/data-type="paragraph"/)

  if (editable) {
    component = (
      <div
        className='editor-paragraph'
        contentEditable={contentEditable}
        onKeyUp={checkReturnKeyPress}
        onKeyDown={checkReturnKeyPress}
        onMouseUp={checkCurrentVerse}
        // onMouseDown={updateCursorPosition}
        {...props}
      />
    )
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
