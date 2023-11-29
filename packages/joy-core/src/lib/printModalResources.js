const printModalResources = {
  pageCssTemplate: `
    @page {
        size: %pageWidth% %pageHeight%;
        margin-top: 20mm;
        margin-left: 20mm;
        margin-bottom: 30mm;

        @footnote {
            float:bottom;
            border-top: black 1px solid;
            padding-top: 2mm;
            font-size: 8pt;
        }

        @bottom-center {
            content: counter(page);
        }

        @top-center {
            content: element(heading);
        }

        @top-right {
            content: none;
        }
    }

    @page :blank {
        @bottom-center {
            content: none;
        }

        @top-center {
            content: none;
        }

        @top-right {
            content: none;
        }

    }

    @page :right {
        margin-left: 30mm;
        margin-right: 20mm;
    }

    @page :left {
        margin-right: 30mm;
        margin-left: 20mm;
    }
    
    #paras {
        columns: %nColumns%
    }

    h2, h3, h4, h5 {
        columns: 1
    }

    h1 {
      break-before: page;
      column-span: all;
    }        

    .new-page {
      break-after: page;
      column-span: all;
    }        
  `,
  pageSizesL: {
    A4: {
      label: 'A4',
      orientation: 'landscape',
      width: '297mm',
      height: '210mm',
    },
    USL: {
      label: 'US Letter',
      orientation: 'landscape',
      width: '11in',
      height: '8.5in',
    },
  },
  pageSizesP: {
    A4: {
      label: 'A4',
      orientation: 'portrait',
      width: '210mm',
      height: '297mm',
    },
    A5: {
      label: 'A5',
      orientation: 'portrait',
      width: '148.5mm',
      height: '210mm',
    },
    USL: {
      label: 'US Letter',
      orientation: 'portrait',
      width: '8.5in',
      height: '11in',
    },
    TR: {
      label: 'Trade',
      orientation: 'portrait',
      width: '6in',
      height: '9in',
    },
    CQ: {
      label: 'Crown Quarto',
      orientation: 'portrait',
      width: '189mm',
      height: '246mm',
    },
  },
};

export default printModalResources;
