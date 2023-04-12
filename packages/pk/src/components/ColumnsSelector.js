import {
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext } from "react";
import AppLangContext from "../contexts/AppLangContext";
import { directionText, fontFamily } from "../i18n/languageDirection";

export default function ColumnsSelector({ formLabelTitle, listItems,formatData ,setFormatData}) {
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
            defaultValue="1"
            size="small"
            color="primary"
            sx={{ marginRight: "1em", backgroundColor: "#FFF"}}
            onChange={(e) => setFormatValue("nColumns", e.target.value)}
          >
            {listItems.map((nc, n) => (
              <MenuItem key={n} value={nc} style={{ fontFamily: fontFamily(appLang) }}>
                {`${nc}`}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
    </>
  );
}
