import React from 'react'
import PropTypes from 'prop-types';
import PkEditor from "./PkEditor";
import usePkImport from "../hooks/usePkImport";

export default function PkUsfmEditor( props) {
  const { repoIdStr, usfmText, bookId } = props;
  const repoBookId = `${repoIdStr}/${bookId}`

  const { loading, done } = usePkImport( repoBookId, usfmText )

  return (
    <div>
      {loading && (<div>Loading...</div>)}
      {done && <PkEditor { ...props } />}
    </div>
  )
};

PkUsfmEditor.propTypes = {
  /** Method to call when save button is pressed */
  onSave: PropTypes.func,
  /** repoIdStr identifies a set of documents in proskomma, usually contains org and language code */
  repoIdStr: PropTypes.string,
  /** The text in usfm format to load in the editor */
  usfmText: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Optional callback - for extending the toolbar */
  onRenderToolbar: PropTypes.func,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
};

PkUsfmEditor.defaultProps = {
  verbose: false
}
