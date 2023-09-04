import React, { useCallback, useEffect, useRef } from 'react';
import { FindrDom } from '../classes/FindrDom';

/**
 * The component in charge of highlighting it's children
 */
export const Highlighted = ({ target, options, children, ping, ...props }) => {
  console.log(props)
  const findrDomRef = useRef(null);
  useEffect(() => {
    const sourceElement = sourceRef.current;
    if (sourceElement) {
      const findrDom = new FindrDom({ source: sourceElement });
      findrDomRef.current = findrDom;
      return () => {
        findrDom.clean();
      };
    }
  }, []);
  const find = useCallback(
    (target, options) => {
      const findrDom = findrDomRef.current;
      if (findrDom instanceof FindrDom)
        findrDom.find({
          target: target,
          options: Object.assign({ highlights: true }, options),
        });
    },
    [findrDomRef]
  );

  useEffect(() => {
    find(target, options);
  }, [target, options, find]);

  //Ping is a temporary solution to react to some external state change
  useEffect(() => {
    const pong = () => {
      if (ping) find(target, options);
    };
    setTimeout(pong, 1000);
  }, [ping, target, options, find]);

  const sourceRef = useRef(null);
  return (
    <div {...props} ref={sourceRef}>
      {children}
    </div>
  );
};
