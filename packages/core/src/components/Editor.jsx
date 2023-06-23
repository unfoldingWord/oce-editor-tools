import React, {
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
} from 'react'
import PropTypes from 'prop-types'
import { useDeepCompareCallback, useDeepCompareMemo } from "use-deep-compare"
import isEqual from 'lodash.isequal'
import { HtmlPerfEditor } from "@xelah/type-perf-html"
import EpiteleteHtml from "epitelete-html"
// import { insertVerseNumber, insertChapterNumber, insertFootnote } from '../helpers/cursorUtils'

import useEditorState from "../hooks/useEditorState"
import Section from "./Section"
import SectionHeading from "./SectionHeading"
import SectionBody from "./SectionBody"
import RecursiveBlock from "./RecursiveBlock"
import Buttons from "./Buttons"
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'

import GraftPopup from "./GraftPopup"
import FindReplace from './FindReplace';

export default function Editor( props) {
  const { 
    onSave, epiteleteHtml, 
    bookId, verbose, bcvSyncRef, 
    onRenderToolbar, onReferenceSelected,
    setChapterNumber,
    setVerseNumber,
    scrollLock
  } = props

  const editorRef = useRef(null)

  const [graftSequenceId, setGraftSequenceId] = useState(null)
  // const [caretPosition, setCaretPosition] = useState()

  // const [isSaving, startSaving] = useTransition()
  const [htmlPerf, setHtmlPerf] = useState()
  const [orgUnaligned, setOrgUnaligned] = useState()
  const [brokenAlignedWords, setBrokenAlignedWords] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [blockIsEdited, setBlockIsEdited] = useState(false)
  const [isFocused, setIsFocused] = useState(false);

  const bookCode = bookId.toUpperCase()

  // const [chapters, setChapters] = useState()

  // const style = isSaving ? { cursor: 'progress' } : {}

  let sequenceIds
  sequenceIds = [htmlPerf?.mainSequenceId]
  const sequenceId = htmlPerf?.mainSequenceId

  const style = (/*isSaving  ||*/ !sequenceId) ? { cursor: 'progress' } : {}

  const {
    state: {
      sectionable,
      blockable,
      editable,
      preview,
    },
    actions: {
      setSequenceIds,
      addSequenceId,
      setSequenceId,
      setToggles,
    },
  } = useEditorState({sequenceIds: [htmlPerf?.mainSequenceId], ...props})

  const readOptions = { readPipeline: "stripAlignmentPipeline" }
  const [sectionIndices, setSectionIndices] = useState({})
  const [hasIntroduction, setHasIntroduction] = useState(false)

  const [epLastSaveUndoInx,setEpLastSaveUndoInx] = useState()
  const [epUndoInx,setEpUndoInx] = useState()
  const [openSearch, setOpenSearch] = useState(false);

  // Avoid sync problems (due to updates in two directions) by setting the below flag 
  // i.e. always update in a single direction either read from Epitelete-html or write to it...
  const [epCachedDataLoaded,setEpCachedDataLoaded] = useState(false)

  const hasUnsavedData = ((epUndoInx !== null) && (epLastSaveUndoInx !== epUndoInx)) || false

  const canUndo = blockIsEdited || epiteleteHtml?.canUndo(bookCode)
  const canRedo = (!blockIsEdited) && epiteleteHtml?.canRedo(bookCode)
  const canSave = (blockIsEdited || hasUnsavedData)

  const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      let iCopy = Object.assign({}, item)
      delete iCopy[keyField]
      obj[item[keyField]] = iCopy
      return obj
    }, {})

  const getFlatWordObj = useCallback((obj) => {
    const resArray = []
    if (obj) {
      Object.entries(obj).forEach(([chNum, chObj]) => {
        Object.entries(chObj).forEach(([vNum, verseArr]) => {
          verseArr.forEach(wObj => {
            const occurrenceStr = (wObj?.totalOccurrences > 1) ? `-${wObj?.occurrence}/${wObj?.totalOccurrences}` : ""
            resArray.push({ id: `${chNum}:${vNum}-${wObj?.word}${occurrenceStr}`, wObj })
          })
        })
      })
    }
    return arrayToObject(resArray,"id")
  },[])

  const setOrgUndoInx = useCallback (() => {
    if ((!epCachedDataLoaded) && (epiteleteHtml?.history[bookCode])) {
      // Read data from Epitelete-html
      const prevUndoInx = epiteleteHtml?.history[bookCode]?.undoInx
      const newEpLastSaveUndoInx = epiteleteHtml?.history[bookCode]?.lastSaveUndoInx
      setEpUndoInx(prevUndoInx || 0)
      setEpLastSaveUndoInx(newEpLastSaveUndoInx || 0)
      setEpCachedDataLoaded(true)
    }
  }, [bookCode, epiteleteHtml?.history, epCachedDataLoaded])

  useEffect(() => {
    console.log('isFocused: ', isFocused);
  }, [isFocused])

  useEffect(() => {
    // Initial update - called on initial mount
    setOrgUndoInx()
  }, [setOrgUndoInx])

  useEffect(() => {
    if ((epCachedDataLoaded) && (epiteleteHtml?.history[bookCode])) {
      // Write data to Epitelete-html
      // I.e cache a copy of these internal values externally (in Epitelete-html)
      const tmpObj = epiteleteHtml?.history[bookCode]
      if (epLastSaveUndoInx !== null) tmpObj.lastSaveUndoInx = epLastSaveUndoInx
      if (epUndoInx !== null) tmpObj.undoInx = epUndoInx
      epiteleteHtml.history[bookCode] = {...tmpObj}
    }
  }, [epiteleteHtml, bookCode, epUndoInx, epLastSaveUndoInx, epCachedDataLoaded])

  const setOrgHtml = useCallback ((newHtmlPerf) => {
    const _alignmentData = epiteleteHtml.getPipelineData(bookCode)
    setOrgUnaligned(getFlatWordObj(_alignmentData?.unalignedWords))
    setOrgUndoInx()
    setHtmlPerf(newHtmlPerf)
  }, [epiteleteHtml, bookCode, getFlatWordObj, setOrgUndoInx])

  useEffect(() => {
    // Roundtrip - get html and alignment data
    if (epiteleteHtml) {
      //        epiteleteHtml.readHtml(bookCode,{},bcvQuery).then((_htmlPerf) => {
      epiteleteHtml.readHtml( 
        bookCode, 
        { readPipeline: "stripAlignmentPipeline" }
      ).then((_htmlPerf) => setOrgHtml(_htmlPerf))
    }
  }, [bookCode, epiteleteHtml, setOrgHtml])
  
  const handleUnalignedClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const setHtmlAndUpdateUnaligned = (newHtmlPerf) => {
    const _alignmentData = epiteleteHtml.getPipelineData(bookCode)
    const nextUnalignedData = getFlatWordObj(_alignmentData?.unalignedWords)
    const diffUnaligned = Object.keys(orgUnaligned)
      .filter(x => !nextUnalignedData[x])
      .concat(Object.keys(nextUnalignedData).filter(x => !orgUnaligned[x]))
    setBrokenAlignedWords(diffUnaligned)
    setHtmlPerf(newHtmlPerf)
  }

  const popperOpen = Boolean(anchorEl)
  const id = popperOpen ? 'simple-popper' : undefined

  const incUndoInx = () => setEpUndoInx((prev) => (prev+1))

  const decUndoInx = () => {
    setEpUndoInx((prev) => ((prev>0) ? prev-1 : 0))
  }

  const onInput = () => {
    if (!blockIsEdited) {
      incUndoInx()
      setBlockIsEdited(true)
    }
  }

  const onHtmlPerf = useDeepCompareCallback(( _htmlPerf, { sequenceId }) => {
    setBlockIsEdited(false)
    const perfChanged = !isEqual(htmlPerf, _htmlPerf)
    if (perfChanged) setHtmlPerf(_htmlPerf)

    if (verbose) console.log('onhtmlperf', perfChanged)
    const saveNow = async () => {
      const writeOptions = { writePipeline: "mergeAlignmentPipeline", readPipeline: "stripAlignmentPipeline" }
      const newHtmlPerf = await epiteleteHtml.writeHtml( bookCode, sequenceId, _htmlPerf, writeOptions)
      if (verbose) console.log({ info: "Saved sequenceId", bookCode, sequenceId })

      const perfChanged = !isEqual(htmlPerf, newHtmlPerf)
      if (perfChanged) {
        setHtmlAndUpdateUnaligned(newHtmlPerf)
      }
    }
    saveNow()
  }, [htmlPerf, bookCode, orgUnaligned, setBrokenAlignedWords, setHtmlPerf])

  const handleSave = async () => {
    setEpLastSaveUndoInx(epUndoInx)
    setBlockIsEdited(false)
    const usfmText = await epiteleteHtml.readUsfm( bookCode )
    onSave && onSave(bookCode,usfmText)
  }

  const undo = async () => {
    decUndoInx()
    setBlockIsEdited(false)
    const newPerfHtml = await epiteleteHtml.undoHtml(bookCode, readOptions)
    setHtmlAndUpdateUnaligned(newPerfHtml)
  }

  const redo = async () => {
    incUndoInx()
    setBlockIsEdited(false)
    const newPerfHtml = await epiteleteHtml.redoHtml(bookCode, readOptions)
    setHtmlAndUpdateUnaligned(newPerfHtml)
  }

  useEffect(() =>{
    if( htmlPerf && ! sequenceIds ) {
      setSequenceIds([htmlPerf.mainSequenceId])
      setSequenceId(htmlPerf.mainSequenceId)
    }
  }, [htmlPerf, sequenceIds, setSequenceId, setSequenceIds]
  )

  const sectionIndex = useDeepCompareMemo(() => (
    sectionIndices[sequenceId] || 0
  ), [sectionIndices, sequenceId])

  // eslint-disable-next-line no-unused-vars
  const onSectionClick = useDeepCompareCallback(({ content: _content, index }) => {
    let _sectionIndices = { ...sectionIndices }
    _sectionIndices[sequenceId] = index
    setSectionIndices(_sectionIndices)
  }, [setSectionIndices, sectionIndices])

  useEffect( () => {
    const firstChapterHeading = editorRef.current.querySelector(`.MuiAccordion-root[index="${sectionIndices[sequenceId]}"] .sectionHeading`)
    if ( firstChapterHeading ) {
      const hasIntro = Number(firstChapterHeading.dataset.chapterNumber) === sectionIndices[sequenceId]
      setHasIntroduction( hasIntro )
    }
  }, [sequenceId, sectionIndices])

  const handleReferenceSelected = ({ bookId, chapter, verse }) => {
    chapter && setChapterNumber && setChapterNumber(chapter)
    verse && setVerseNumber && setVerseNumber(verse)
    onReferenceSelected && onReferenceSelected({ bookId, chapter, verse })
  }

  const scrollReference = (chapterNumber) => {
    const refEditors = document.getElementsByClassName('ref-editor')
    refEditors.length > 0 && Array.prototype.filter.call(refEditors, (refEditor) => {
      const editorInView = refEditor.querySelector(`#ch-${chapterNumber}`)
      if (editorInView) {
        // editorInView.scrollIntoView()
        // editorInView.classList.add('scroll-mt-10')
      }
    })
  }

  useEffect( () => {
    if ( htmlPerf && !isFocused && sequenceId && editorRef.current && bcvSyncRef ) {
      const { chapter, verse } = bcvSyncRef

      let _sectionIndices = { ...sectionIndices }
      _sectionIndices[sequenceId] = Number(chapter) - ( hasIntroduction ? 0 : 1)
      setSectionIndices(_sectionIndices)

      const existingVerse = editorRef.current.querySelector(`span.mark.verses.highlight-verse`)
      if ( existingVerse ) {
        existingVerse.classList.remove('highlight-verse')
      }

      const verseElem = editorRef.current.querySelector(`span.mark.verses[data-atts-number='${verse}']`)
      if (verseElem) {
        verseElem.classList.add('highlight-verse')
        verseElem.scrollIntoView({ block: "center"})
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bcvSyncRef, htmlPerf, sequenceId, editorRef, hasIntroduction])

  const onIntersection = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        console.log({ entry })
        setChapterNumber && setChapterNumber(entry.target.dataset.attsNumber)
        (!scrollLock) && scrollReference(entry.target.dataset.attsNumber) 
      }
    }
  }

  const options = {
    root: document.querySelector('editor'),
    threshold: 0,
    rootMargin: '0% 0% -60% 0%',
  }
  const observer = new IntersectionObserver(onIntersection, options)

  const watchNodes = document.querySelectorAll('.editor .chapter')
  const watchArr = Array.from(watchNodes)
  const reverseArray = watchArr.length > 0 ? watchArr.slice().reverse() : []
  reverseArray.forEach((chapter) => { observer.observe(chapter) })

  const handlers = {
    onBlockClick: ({ content: _content, element }) => {
      const _sequenceId = element.dataset.target
      if (_sequenceId) {
        setGraftSequenceId(_sequenceId)
        // setOpenSideBar(!openSideBar)
        // setSideBarTab('footnotes')
      } else {
        // setSideBarTab('')
        // setGraftSequenceId(null)
      }
    },
    onSectionClick,
  }

  const htmlEditorProps = {
    htmlPerf,
    onInput,
    onHtmlPerf,
    sequenceIds,
    addSequenceId,
    components: {
      section: Section,
      sectionHeading: SectionHeading,
      sectionBody: SectionBody,
      block: (__props) => RecursiveBlock({ 
        htmlPerf, 
        onHtmlPerf, 
        sequenceIds, 
        addSequenceId, 
        onReferenceSelected: handleReferenceSelected,
        ...__props 
      }),
    },
    options: {
      sectionable,
      blockable,
      editable,
      preview
    },
    handlers,
    decorators: {},
    sectionIndex,
    verbose,
  }


  const graftProps = {
    ...htmlEditorProps,
    options: { ...options, sectionable: false },
    sequenceIds: [graftSequenceId],
    graftSequenceId,
    setGraftSequenceId,
  }

  const updateHtml = async () => {
    const newPerfHtml = await epiteleteHtml.readHtml(bookCode, readOptions);
    setHtmlAndUpdateUnaligned(newPerfHtml);
  };

  const handleSearch = () => {
    setOpenSearch((openSearch) => !openSearch);
  };

  const buttonsProps = {
    onSearch: handleSearch,
    sectionable,
    blockable,
    editable,
    preview,
    allAligned: !brokenAlignedWords || brokenAlignedWords.length === 0,
    onShowUnaligned: handleUnalignedClick,
    onRenderToolbar,
    undo,
    redo,
    canUndo,
    canRedo,
    setToggles,
    canSave,
    onSave: handleSave,
    showToggles: false,
    content: (
      <FindReplace
        onReplace={updateHtml}
        epitelete={epiteleteHtml}
        bookCode={bookCode}
        open={openSearch}
      />
    ),
  };
  return (
    <div 
      key="1" 
      className="Editor" 
      style={style} 
      ref={editorRef}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Buttons {...buttonsProps} />
      <Popper id={id} open={popperOpen} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          List of words with broken alignment:
          <Box>
            {brokenAlignedWords && brokenAlignedWords.map((str,i) => <li key={i}>{str}</li>)}
          </Box>
        </Box>
      </Popper>
      {sequenceId && htmlPerf ? <HtmlPerfEditor {...htmlEditorProps} /> : <div/>}
      <GraftPopup {...graftProps} />
    </div>
  )
}

Editor.propTypes = {
  /** Method to call when save button is pressed */
  onSave: PropTypes.func,
  /** Instance of EpiteleteHtml class */
  epiteleteHtml: PropTypes.instanceOf(EpiteleteHtml),
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
  /** Book, chapter, verse to scroll to and highlight */
  bcvSyncRef: PropTypes.shape({
    syncSrcId: PropTypes.string,
    bookId: PropTypes.string,
    chapter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    verse: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),
  /** Optional callback - for extending the toolbar */
  onRenderToolbar: PropTypes.func,
  /** Callback triggered when a verse is clicked on */
  onReferenceSelected: PropTypes.func,
}

Editor.defaultProps = {
  verbose: false
}
