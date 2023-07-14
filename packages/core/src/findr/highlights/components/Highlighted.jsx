/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
import { FindrDom } from '../classes/FindrDom';
import { css } from '@emotion/react';

/**
 * The component in charge of highlighting it's children
 */
export const Highlighted = ({ target, options, children, ...props }) => {
  const findrDomRef = useRef(null);
  useEffect(() => {
    const sourceElement = sourceRef.current;
    if (sourceElement) {
      const findrDom = new FindrDom({ source: sourceElement });
      findrDomRef.current = findrDom;
      return () => {
        console.log('cleanig highlights');
        findrDom.clean();
      };
    }
  }, []);
  useEffect(() => {
    const findrDom = findrDomRef.current;
    if (findrDom instanceof FindrDom)
      findrDom.find({
        target: target,
        options: Object.assign({ highlights: true }, options),
      });
  }, [target, options]);
  const sourceRef = useRef(null);
  return (
    <div
      css={css`
        background-color: white;
        p.p {
          margin: 0;
          padding: 1em 0.5em;
          line-height: 1.4;
          font-family: sans-serif;
        }
        span.mark:is(.verses, .chapter) {
          display: inline-block;
          visibility: hidden;
        }
        span.mark:is(.verses, .chapter):after {
          content: attr(data-atts-number);
          position: relative;
          visibility: visible;
          display: inline-flex;
          color: #000;
        }
        span.mark.chapter {
          font-size: 1.2em;
          font-weight: 600;
          margin-right: 0.1em;
        }
        span.mark.verses {
          font-size: 0.7em;
          font-weight: 600;
          vertical-align: top;
          margin-right: 0.2em;
        }
        .highlight {
          background-color: rgb(255 235 0 / 50%);
          border-radius: 3px;
          mix-blend-mode: initial;
          box-shadow: 0px 0px 0px 1px rgb(255 235 0),
            0px 0px 0px 0px rgb(255 235 0);
        }
        div[contenteditable='true']:focus-within {
          outline-style: solid;
          outline: rgb(0 0 0 / 50%) 1px;
          border-radius: 0.3em;
          outline-style: dashed;
          outline-width: 0.05em;
          ${'' /* box-shadow: 0px 7px 7px -7px rgb(0 0 0 / 20%); */}
        }
      `}
    >
      <div {...props} ref={sourceRef}>
        {children}
      </div>
    </div>
  );
};
