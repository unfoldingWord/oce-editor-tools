import React from 'react';
import { useEditorContext } from './Editor';
import Section from '../Section';
import SectionHeading from '../SectionHeading';
import SectionBody from '../SectionBody';
import RecursiveBlock from '../RecursiveBlock';
import { HtmlPerfEditor } from '@xelah/type-perf-html';
import { Highlighted } from '../../findr/highlights/components/Highlighted';

export function EditorMain({ components, ...props }) {
  const {
    state: { sectionIndices, editorProps, highlighterTarget, highlighterOptions, editorRef },
  } = useEditorContext();

  const {
    bookId,
    htmlPerf,
    onHtmlPerf,
    sequenceIds,
    addSequenceId,
    onReferenceSelected,
  } = editorProps;

  const htmlEditorProps = {
    ...editorProps,
    components: {
      section: Section,
      sectionHeading: SectionHeading,
      sectionBody: SectionBody,
      block: (__props) =>
        RecursiveBlock({
          bookId,
          htmlPerf,
          onHtmlPerf,
          sequenceIds,
          addSequenceId,
          onReferenceSelected,
          ...__props,
        }),
    },
  };

  const style = !sequenceIds ? { cursor: 'progress' } : {};

  return (
    <div key="1" className="Editor" style={style} ref={editorRef} {...props}>
      {sequenceIds && htmlPerf ? (
        <Highlighted
          target={highlighterTarget}
          options={highlighterOptions}
          ping={sectionIndices}
        >
          <HtmlPerfEditor {...htmlEditorProps} />
        </Highlighted>
      ) : null}
    </div>
  );
}

export default EditorMain;
