import React from 'react';
import { useEditorContext } from './Editor';
import SectionHeading from './SectionHeading';
import RecursiveBlock from './RecursiveBlock';
import { HtmlPerfEditor } from '@xelah/type-perf-html';
import { Highlighted } from '../../findr/highlights/components/Highlighted';

export function EditorMain({ components, ...props }) {
  const { block, sectionHeading, ..._components } = components ?? {};

  const {
    state: {
      sectionIndices,
      editorProps,
      highlighterTarget,
      highlighterOptions,
      editorRef,
    },
  } = useEditorContext();

  const { bookId, htmlPerf, onHtmlPerf, sequenceIds, addSequenceId } =
    editorProps;

  const htmlEditorProps = {
    ...editorProps,
    components: {
      ..._components,
      sectionHeading: (_props) => SectionHeading({ ..._props, sectionHeading }),
      block: (__props) =>
        RecursiveBlock({
          bookId,
          htmlPerf,
          onHtmlPerf,
          sequenceIds,
          addSequenceId,
          block,
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
