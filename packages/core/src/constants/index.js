export const PIPELINES = {
  READ_PIPELINE: 'stripAlignmentPipeline',
  WRITE_PIPELINE: 'mergeAlignmentPipeline',
};

export const readOptions = { readPipeline: PIPELINES.READ_PIPELINE };

export const writeOptions = {
  writePipeline: PIPELINES.WRITE_PIPELINE,
  ...readOptions,
};
