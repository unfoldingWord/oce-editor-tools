import { useCallback, useEffect, useMemo, useState } from 'react';
import { isFunction } from '../../helpers';

function getScrollParent(node, limit) {
  if (node == null || node === limit) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}

export default function useReferenceHandler({
  editorRef,
  sourceId,
  scrollDelay,
  reference: externalReference,
  setReference: setExternalReference,
  locked,
  htmlPerf,
  sequenceId,
  sectionIndices,
  setSectionIndices,
  verbose,
}) {
  const [hasIntroduction, setHasIntroduction] = useState(false);
  const [localReference, setLocalReference] = useState();

  const reference = useMemo(
    () => (locked || !externalReference ? localReference : externalReference),
    [locked, externalReference, localReference]
  );

  const setReference = useCallback(
    (value) => {
      if (verbose) console.log('setting refference');
      setLocalReference((reference) => {
        const tempReference = isFunction(value) ? value(reference) : value;
        const newReference = { sourceId, ...tempReference };
        if (!locked) {
          setExternalReference(newReference);
        }
        return { newReference };
      });
    },
    [locked, setExternalReference, sourceId, verbose]
  );

  useEffect(() => {
    if (htmlPerf && sequenceId && editorRef.current && reference) {
      const { chapter, verse } = reference;

      setSectionIndices((sectionIndices) => ({
        ...sectionIndices,
        [sequenceId]: Number(chapter) - (hasIntroduction ? 0 : 1),
      }));

      setTimeout(() => {
        const verseElem = editorRef.current.querySelector(
          `.mark.verses[data-atts-number='${verse}']`
        );
        if (reference.sourceId !== sourceId && verseElem) {
          const parent = getScrollParent(verseElem);
          if (parent) parent.scrollTop = verseElem.offsetTop;
        }
      }, scrollDelay || 900);
    }
  }, [
    reference,
    scrollDelay,
    sourceId,
    htmlPerf,
    sequenceId,
    editorRef,
    hasIntroduction,
    setSectionIndices,
  ]);

  useEffect(() => {
    const firstChapterHeading = editorRef.current?.querySelector(
      `.section[index="${sectionIndices[sequenceId]}"] .sectionHeading`
    );
    if (firstChapterHeading) {
      const hasIntro =
        Number(firstChapterHeading.dataset.chapterNumber) ===
        sectionIndices[sequenceId];
      setHasIntroduction(hasIntro);
    }
  }, [sequenceId, sectionIndices, editorRef]);

  return { state: { reference }, actions: { setReference } };
}
