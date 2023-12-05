import React from 'react'
import PropTypes from 'prop-types'
import {
  EditorCacheProvider,
  EditorMain
} from "@oce-editor-tools/base"
import GraftPopup from "./GraftPopup"
import { EditorToolbar } from './EditorToolbar';
import Section from './Section';
import SectionBody from './SectionBody';
import SectionHeading from './SectionHeading';

function Editor({
  onSave,
  epiteleteHtml,
  sourceId,
  bookId,
  verbose,
  onRenderToolbar,
  reference,
  onReferenceSelected,
  scrollLock,
  scrollDelay = 200,
  children,
  defaultOptions,
}) {
  const props = {
    sourceId,
    onSave,
    epiteleteHtml,
    bookId,
    verbose,
    reference,
    setReference: onReferenceSelected,
    scrollLock,
    scrollDelay,
    children,
    defaultOptions,
  };
  const components = {
    section: Section,
    sectionHeading: SectionHeading,
    sectionBody: SectionBody,
    editorGraft: GraftPopup,
  };
  return (
    <EditorCacheProvider{...props}>
      <EditorToolbar showToggles={false} onRenderToolbar={onRenderToolbar} />
      <EditorMain components={components} />
    </EditorCacheProvider>
  );
}


// children,

  Editor.propTypes = {
    /** Instance of EpiteleteHtml class */
    epiteleteHtml: PropTypes.any.isRequired,
    /** bookId to identify the content in the editor */
    bookId: PropTypes.string.isRequired,
    /** a unique identifier for this editor (defaults to epitelete's docSetId) */
    sourceId: PropTypes.string,
    /** Whether to show extra info in the js console */
    verbose: PropTypes.bool,
    /** Book, chapter, verse to scroll to and highlight (use to make a controlled editor) */
    reference: PropTypes.shape({
      sourceId: PropTypes.string,
      bookId: PropTypes.string,
      chapter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      verse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    /** delay time before scrolling to reference */
    scrollDelay: PropTypes.func,
    /** Editor options to set by default */
    defaultOptions: PropTypes.shape({
      sectionable: PropTypes.bool,
      blockable: PropTypes.bool,
      editable: PropTypes.bool,
      preview: PropTypes.bool,
      locked: PropTypes.bool,
    }),
    /** Method to call when save button is pressed */
    onSave: PropTypes.func,
    /** Optional callback - for extending the toolbar */
    onRenderToolbar: PropTypes.func,
    /** Callback triggered when a verse is clicked on */
    onReferenceSelected: PropTypes.func,
  };

Editor.defaultProps = {
  verbose: false
}

export default Editor;
