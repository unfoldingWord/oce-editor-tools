import {
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext} from "react";
import AppLangContext from "../contexts/AppLangContext";
import { directionText, fontFamily } from "../i18n/languageDirection";

export default function PageSizeSelector({
  formLabelTitle,
  listItems,
  formatData,
  setFormatData,
}) {
  const appLang = useContext(AppLangContext);
  const setFormatValue = (field, value) => {
    const newData = { ...formatData };
    newData[field] = value;
    setFormatData(newData);
  };
  return (
    <>
        <FormGroup sx={{display:'flex',flexDirection:'row',alignItems:'flex-start'}} dir={directionText(appLang)}>
          <FormLabel
            id="page-size-group-label"
            style={{ fontFamily: fontFamily(appLang) }}
            sx={{marginRight:'5%',marginTop:'1%'}}
          >
            {formLabelTitle}
          </FormLabel>
          <Select
            aria-labelledby="page-size-group-label"
            name="page-size-buttons-group"
            defaultValue="A4P"
            size="small"
            color="primary"
            sx={{ marginRight: "1em", backgroundColor: "#FFF"}}
            onChange={(e) => setFormatValue("pageFormat", e.target.value)}
          >
            {Object.entries(listItems).map((pf, n) => (
              <MenuItem key={n} value={pf[0]} style={{ fontFamily: fontFamily(appLang) }}>
                {pf[1].label}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
    </>
  );
}
