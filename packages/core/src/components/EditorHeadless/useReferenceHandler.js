import { useCallback, useEffect, useMemo, useState } from 'react';
import { isFunction } from '../../helpers';

function getScrollParent(node,limit) {
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
  scrollLock,
  htmlPerf,
  sequenceId,
  sectionIndices,
  setSectionIndices,
}) {
  const [hasIntroduction, setHasIntroduction] = useState(false);
  const [localReference, setLocalReference] = useState();

  const reference = useMemo(
    () =>
      scrollLock || !externalReference ? localReference : externalReference,
    [scrollLock, externalReference, localReference]
  );

  const setReference = useCallback(
    (value) => {
      setLocalReference((reference) => {
        const newReference = isFunction(value) ? value(reference) : value;
        newReference.sourceId = sourceId;
        if (!scrollLock) {
          setExternalReference(newReference);
        }
        console.log({ newReference });
        return { newReference };
      });
    },
    [scrollLock, setExternalReference, sourceId]
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
      }, (scrollDelay || 900));
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

  useEffect(() => {
    console.log({ editorRef });
  },[editorRef])

  return {state: {reference}, actions: {setReference}};
}
