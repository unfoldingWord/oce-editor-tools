import findr from '@findr/text';
import { getNodeText } from './helpers';
export const findrDom = ({
  source,
  target,
  replacement,
  replacementKeys,
  config,
  metadata,
}) => {
  const txt = getNodeText(source);
  const response = findr({
    source: txt,
    target,
    replacement,
    replacementKeys,
    metadata,
    config,
  });
  return response;
};
