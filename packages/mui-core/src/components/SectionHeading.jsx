import React from 'react';
import { AccordionSummary, Typography } from '@mui/material';

export default function SectionHeading({
  type,
  chapterNumber: chNum,
  content,
  show,
  index,
  verbose,
  sx,
  ...props
}) {
  return (
    <AccordionSummary
      className="sectionHeading"
      aria-controls="panel1d-content"
      id="panel1d-header"
      data-chapter-number={chNum}
      sx={{
        minHeight: 'auto',
        '&.Mui-expanded': {
          minHeight: 'auto',
          margin: `0`,
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
          margin: `0.5em 0em 0em`,
        },
        ...sx,
      }}
      {...props}
    >
      <Typography sx={{fontWeight: 500}} className="expand">
        {type} {show ? '' : '…'}
      </Typography>
    </AccordionSummary>
  );
}
