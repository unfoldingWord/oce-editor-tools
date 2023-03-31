import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SofriaRenderFromProskomma } from 'proskomma-json-tools';
import sofria2WebActions from '../renderer/sofria2web';
import { renderers } from '../renderer/render2react';
import { getBcvVerifyStruct, isVerifiedWithBcvStruct } from '../helpers/bcvVerify';

const defaultFlags = {
  showWordAtts: false,
  showTitles: true,
  showHeadings: true,
  showIntroductions: true,
  showFootnotes: true,
  showXrefs: true,
  showParaStyles: true,
  showCharacterMarkup: true,
  showChapterLabels: true,
  showVersesLabels: true,
};

export default function usePreview(props) {
  const {
    pk, 
    docId, 
    renderFlags,
    bookId,
    extInfo,
    verbose, 
  } = props;

  const [renderedData, setRenderedData] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if ((docId != null) && (pk != null)) {    
      const renderer = new SofriaRenderFromProskomma({
        proskomma: pk,
        actions: sofria2WebActions,
      })

      const config = {
        ...defaultFlags,
        ...renderFlags,
        bookId,
        extInfo,
        verifyBcv: getBcvVerifyStruct(extInfo),
        doVerify: isVerifiedWithBcvStruct,
        renderers,
      };
      const output = {};
      try {
        renderer.renderDocument({
          docId,
          config,
          output,
        });
        setDone(true)
      } catch (err) {
        if (verbose) console.log('Renderer', err);
        throw err;
      }
      setRenderedData(output.paras)
    }
  }, [pk, verbose, renderFlags, docId, bookId, extInfo]);

  return {
    done,
    renderedData
  }
}

usePreview.propTypes = {
  /** repoIdStr identifies a set of documents in proskomma, usually contains org and language code */
  repoIdStr: PropTypes.string,
  /** bookId to identify the content in the editor */
  bookId: PropTypes.string,
  /** Rendering flags */
  renderFlags: PropTypes.objectOf(PropTypes.bool),
  /** Whether to show extra info in the js console */
  verbose: PropTypes.bool,
};

usePreview.defaultProps = {
  verbose: false,
};
