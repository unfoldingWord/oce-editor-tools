import {
  Box,
  Button,
  Fade,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import PrintIcon from "@mui/icons-material/Print";
import { useContext, useState } from "react";
import AppLangContext from "../contexts/AppLangContext";
import {
  alignmentText,
  directionText,
  fontFamily,
} from "../i18n/languageDirection";
import printModalResources from "../lib/printModalResources";
import ColumnsSelector from "./ColumnsSelector";
import PageSizeSelector from "./PageSizeSelector";
import i18n from "../i18n";

const printModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  maxHeight: "95%",
};

export default function PrintModal({
  openPrintModal,
  handleClosePrintModal,
  pk,
  docId,
}) {
  const appLang = useContext(AppLangContext);

  const allNames = [
    "wordAtts",
    "titles",
    "headings",
    "introductions",
    "footnotes",
    "xrefs",
    "paraStyles",
    "characterMarkup",
    "chapterLabels",
    "versesLabels",
  ];

  const [includedNames, setIncludedNames] = useState(allNames);

  const [formatData, setFormatData] = useState({
    pageFormat: "A4P",
    nColumns: 1,
  });

  const getStyles = (name) => {
    return {
      fontWeight: includedNames.indexOf(name) === -1 ? "normal" : "bold",
    };
  };

  const floatDirection = (lang) =>
    alignmentText(lang) === "right" ? "left" : "right";

  const substituteCss = (template, replaces) => {
    let ret = template;
    for (const [placeholder, replacement] of replaces) {
      ret = ret.replace(placeholder, replacement);
    }
    return ret;
  };

  const handleIncludedChange = (event) => {
    const {
      target: { value },
    } = event;
    setIncludedNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const pageCss = substituteCss(printModalResources.pageCssTemplate, [
    ["%pageWidth%", printModalResources.pageSizes[formatData.pageFormat].width],
    [
      "%pageHeight%",
      printModalResources.pageSizes[formatData.pageFormat].height,
    ],
    ["%nColumns%", formatData.nColumns],
  ]);

  const makeIncludedFlags = (allN, includedN) => {
    const ret = {};
    for (const name of allN) {
      ret[`show${name.substring(0, 1).toUpperCase()}${name.substring(1)}`] =
        includedN.includes(name);
    }
    return ret;
  };

  const onPrintClick = () => {
    const paras = printModalResources.doRender({
      pk,
      scriptureData: makeIncludedFlags(allNames, includedNames),
      docId,
    });
    const newPage = window.open();
    newPage.document.body.innerHTML = `<div id="paras">${paras}</div>`;
    newPage.document.head.innerHTML = "<title>Diegesis PDF Preview</title>";
    const script = document.createElement("script");
    script.src = `${window.location.protocol}//${window.location.host}/static/pagedjs_0_4_0.js`;
    newPage.document.head.appendChild(script);
    const style = document.createElement("style");
    style.innerHTML = pageCss;
    newPage.document.head.appendChild(style);
  };

  const columnsList = [1, 2, 3];

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPrintModal}
        onClose={handleClosePrintModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openPrintModal}>
          <Box sx={printModalStyle}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {i18n(appLang, "PREVIEW_DOCUMENT")}
            </Typography>
            <Grid
              container
              dir={directionText(appLang)}
              style={{ fontFamily: fontFamily(appLang) }}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid item sx={{ margin: "2%" }}>
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <InputLabel id="included-content-group-label" sx={{marginRight:'5%',marginTop:'2%'}}>
                    {i18n(appLang, "INCLUDED_CONTENT")}
                  </InputLabel>
                  <Select
                    labelId="included-content-group-label"
                    id="included-content"
                    multiple
                    value={includedNames}
                    onChange={handleIncludedChange}
                    input={<OutlinedInput label="Name" />}
                    sx={{width: 450}}
                  >
                    {allNames.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>
              </Grid>
              <Grid item sx={{ margin: "2%" }}>
                <PageSizeSelector
                  formLabelTitle={i18n(appLang, "PAGE_SIZE")}
                  listItems={printModalResources.pageSizes}
                  formatData={formatData}
                  setFormatData={setFormatData}
                />
              </Grid>
              <Grid item sx={{ margin: "2%" }}>
                <ColumnsSelector
                  formLabelTitle={i18n(appLang, "COLUMNS")}
                  listItems={columnsList}
                  formatData={formatData}
                  setFormatData={setFormatData}
                />
              </Grid>
            </Grid>
            <Button
              onClick={onPrintClick}
              sx={{ float: floatDirection(appLang) }}
            >
              <PrintIcon color="primary" sx={{ fontSize: 50 }} />
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
