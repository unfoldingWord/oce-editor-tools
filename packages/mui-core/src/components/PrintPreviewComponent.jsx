import { useEffect, forwardRef } from "react";
import { Previewer } from "pagedjs";

export const PrintPreviewComponent = forwardRef(({
  style,
  printOptions,
  htmlSections,
  webCss,
  printCss,
  setPrintPreviewState,
}, ref) => {

  const cssStr = `
  @page {
    size: ${printOptions.pageWidth} ${printOptions.pageHeight};
    margin: 1cm;
  
    @footnote {
      float: bottom;
      border-top: black 1px solid;
      padding-top: 2mm;
      font-size: 8pt;
    }
  
    @bottom-center {
      content: counter(page);
    }
  }
  
  @page :first {
    @bottom-center {
      content: none;
    }
  }
  
  @page :blank {
    @bottom-center {content: none}
    @top-center {content: none}
    @top-left { content: none}
    @top-right {content: none}
  }
  
  @page :cover-page {
    @bottom-center {content: none}
    @top-center {content: none}
    @top-left { content: none}
    @top-right {content: none}
  }
  
  @page :left {
    margin-right: 30mm;
    margin-left: 20mm;
  
    @top-left {
      font-size: 10px;
      content: element(titleRunning);
      text-align: left;
    }
  }
  
  @page :right {
    margin-left: 30mm;
    margin-right: 20mm;
  
    @top-right {
      font-size: 10px;
      content: element(titleRunning);
      text-align: right;
    }
  }
  
  section.bible-book {
    columns: ${printOptions?.columns || "1"};
  }
  
  .header-title {
    position: running(titleRunning);
  }
  
  @media print {
    h1 {
      break-before: avoid-page;
    }
  
    section, 
    article {
      break-after: page;
    }
  
    section.toc-page,
    section.copyright-page {
      break-before: page;
    }
  }
  
  .cover-page,
  .title-page {
    page: cover-page;
    padding-top: 100px;
  }
  
  #toc {
      font-size: 12px;
  }
  
  #toc h1 {
      text-align: center;
      font-size: 1.6em;
  }
  
  #toc-contents ul {
      list-style: none;
      padding: 0;
      padding-inline-start: 0;
  }
  
  #toc-contents ul ul {
      padding-left: 10px;
  }
  
  [data-direction="rtl"] #toc-contents ul ul {
      padding-left: 0;
      padding-right: 10px;
  }
  
  #toc-contents ul li {
      width: 100%;
      list-style-type: none;
      padding-bottom: 2px;
      line-height: 1.1em;
  }
  
  #toc-contents ul a {
      display: inline-block;
      width: 100%;
      border-bottom: 2px dotted #555555;
      text-decoration: none;
      color: #000 !important;
      /* margin-left: 20px;
      text-indent: -20px; */
  }
  
  #toc-contents > ul > li > a {
      font-weight: bold;
  }
  
  #toc-contents ul a span {
      background-color: white;
      margin: 0 25px 0 0;
      padding: 0 2px 3px 0;
  }
  
  [data-direction="rtl"] #toc-contents ul a span {
      margin: 0 0 0 25px;
      padding: 0 0 3px 2px;
  }
  
  #toc-contents ul a::after {
      position: absolute;
      right: 0;
      content: target-counter(attr(href), page);
      background-color: white;
      padding-bottom: 4px;
      padding-left: 2px;
      padding-right: 10px;
  }
  
  [data-direction="rtl"] #toc-contents ul a::after {
      left: 0 !important;
      right: auto !important;
      padding-right: 2px;
      padding-left: 30px;
  }
  
  h1 {
    font-size: 1.6em;
  }
  
  ${webCss}
  
  ${printCss}
  `
  
  useEffect(() => {
    const generatePrintPreview = async () => {
      console.log("STARTING PRINT RENDERING")
      setPrintPreviewState("started")
      ref.current.innerHTML = ""
      let copyright = htmlSections?.copyright || ""
      let toc = htmlSections?.toc || ""
      const body = htmlSections.body
      const doc = new DOMParser().parseFromString(body, "text/html")
      doc.querySelectorAll("[id]").forEach(e => e.id = `print-${e.id}`)
      const previewer = new Previewer()
      previewer.preview(`${copyright}
${toc}
<section id="body">
${body?.innerHTML}
</section>
`,
        [
          {
            _: cssStr,
          },
        ],
        ref.current,
      ).then((flow) => { // This is following the example from paged.js
        setPrintPreviewState("rendered")
        console.log(`PRINT PREVIEW IS READY. Rendered ${flow.total} pages.`)
      }).catch(e => {
        setPrintPreviewState("error")
        console.log("ERROR RENDERING PRINT PREVIEW: ", e)
      })

    }

    if (htmlSections?.body && Object.keys(printOptions).length) {
      generatePrintPreview()
      return () => {
        // Clean style elements created by PagedJS
        const pagedStyleElements = document.querySelectorAll(
          "style[data-pagedjs-inserted-styles]"
        )
        pagedStyleElements.forEach((element) => element.remove())
      }
    }
  }, [htmlSections?.body, printOptions])

  return (
    // Keep the html here and rerender based on changes to the useEffect parameters 
    // - and use the ref to make this extrnally accessible
    <div id="print-preview" style={style} ref={ref} />
  )
})
