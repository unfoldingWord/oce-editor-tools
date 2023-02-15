import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function SectionHeading({ type: _type, content, show, index, verbose, ...props }) {
  useEffect(() => {
    if (verbose) console.log('SectionHeading: Mount/First Render', index);
    return (() => {
      if (verbose) console.log('SectionHeading: UnMount/Destroyed', index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchRes = content.match(/<span class="mark[^"]+chapter-(\d+)/)
  const chNum = (matchRes && matchRes[1]) || 0
  const type = chNum ? `Chapter ${chNum}` : "Title & Introduction";

  return (
    <div className='sectionHeading' data-chapter-number={chNum} {...props}>
      <span className='expand'>
        {show ? '' : '...'}
        {type}
        {show ? '' : '...'}
      </span>
    </div>
  );
};

SectionHeading.propTypes = {
  content: PropTypes.string,
}