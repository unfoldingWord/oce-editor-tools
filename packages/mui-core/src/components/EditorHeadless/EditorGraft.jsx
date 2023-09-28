import React from 'react';
import { HtmlPerfEditor } from '@xelah/type-perf-html';

export function EditorGraft(graftProps) {
  const { graftSequenceId } = graftProps;
  return graftSequenceId ? <HtmlPerfEditor key="2" {...graftProps} /> : '';
}

export default EditorGraft;
