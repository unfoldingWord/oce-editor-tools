import React from 'react'
import PropTypes from 'prop-types';
import PkEditor from "./PkEditor";
import usePkBookImport from "../hooks/usePkBookImport";

export default function PkUsfmEditor( props) {
  const { repoIdStr, langIdStr, bookId, usfmText } = props;

  const { loading, done } = usePkBookImport( repoIdStr, langIdStr, bookId, usfmText )

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
  /** repoIdStr identifies a set of documents in proskomma */
  repoIdStr: PropTypes.string,
  /** langIdStr identifies the language of a set of documents in proskomma */
  langIdStr: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string, 
  /** The text in usfm format to load in the editor */
  usfmText: PropTypes.string,
  /** Optional callback - for extending the toolbar */
  onRenderToolbar: PropTypes.func,
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
};

PkUsfmEditor.defaultProps = {
  verbose: false
}
