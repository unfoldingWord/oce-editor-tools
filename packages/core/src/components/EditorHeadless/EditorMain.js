import React from 'react';
import { useEditorContext } from './Editor';
import SectionHeading from './SectionHeading';
import RecursiveBlock from './RecursiveBlock';
import { HtmlPerfEditor } from '@xelah/type-perf-html';
import { Highlighted } from '../../findr/highlights/components/Highlighted';
import { EditorGraft } from './EditorGraft'

export function EditorMain({ components, ...props }) {
  const { block, sectionHeading, editorGraft, ..._components } = components ?? {};

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

  const validSeqIds = sequenceIds && htmlPerf

  const allValidSeqIds = () => {
  // This checking is no longer necessary once it is handled inside the HtmlPerfEditor 
    let retVal = validSeqIds
    if (validSeqIds) {
      sequenceIds?.forEach(seqId => {
        const isValid = (htmlPerf?.sequencesHtml)
                          && (htmlPerf?.sequencesHtml[seqId] != null)
        retVal = retVal && isValid
        if (!isValid) {
          console.log(`Invalid sequenceId ${seqId} in ${sequenceIds}`)
          console.log(htmlPerf)
          console.log(htmlPerf?.sequencesHtml)
        }
      })
    }
    return retVal
  }
  const graftProps = {
    ...htmlEditorProps,
    sequenceIds: [htmlEditorProps.graftSequenceId],
    options: { ...htmlEditorProps.options, sectionable: false },
  }
  const GraftEditor = editorGraft ?? EditorGraft
  return (
    <div key="1" className="Editor" style={style} ref={editorRef} {...props}>
      {/* The below safeguarding 'allValidSeqIds' might become unnecessary, 
          once this is handled inside the HtmlPerfEditor instead
          and at that point it will be enough to just check 'validSeqIds'  */}
      {allValidSeqIds() ? (
        <Highlighted
          target={highlighterTarget}
          options={highlighterOptions}
          ping={sectionIndices}
        >
          <HtmlPerfEditor {...htmlEditorProps} />
          <GraftEditor {...graftProps} />
        </Highlighted>
      ) : null}
    </div>
  );
}

export default EditorMain;
