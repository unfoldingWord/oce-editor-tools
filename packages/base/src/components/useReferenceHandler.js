// eslint-disable-next-line no-unused-vars
import React,
{ useCallback, useEffect, useMemo, useState }
from 'react';
import { isFunction } from '../helpers';

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
  bookId,
}) {
  const [hasIntroduction, setHasIntroduction] = useState(false);
  const [localReference, setLocalReference] = useState();

  const isControlled = (externalReference !== undefined);

  const reference = useMemo(
    () => (locked || !externalReference ? localReference : externalReference),
    [locked, externalReference, localReference]
  );

  const setReference = useCallback(
    (value) => {
      setLocalReference((reference) => {
        const tempReference = isFunction(value) ? value(reference) : value;
        const newReference = { sourceId, ...tempReference };
        if (!locked && setExternalReference) {
          setExternalReference(newReference);
        }
        return newReference;
      });
    },
    [locked, setExternalReference, sourceId]
  );

  useEffect(() => {
    if (
      htmlPerf &&
      sequenceId &&
      editorRef.current &&
      reference &&
      reference.bookId === bookId
    ) {
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
          const parentElem = getScrollParent(verseElem);
          const verseElemRect = verseElem.getBoundingClientRect()
          const parentElemRect = parentElem.getBoundingClientRect()
          const elemsGap = parentElemRect.top - verseElemRect.top;
          if (parentElem) parentElem.scrollTop =
            parentElem.scrollTop - elemsGap - (parentElemRect.height * 0.4);
        }
      }, scrollDelay || 0);
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
    bookId
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

  return { state: { reference, isControlled }, actions: { setReference } };
}
