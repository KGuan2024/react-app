import { Button, Checkbox, FormControlLabel, SvgIcon } from "@mui/material";

import { ReactComponent as openIcon } from "../../assets/icons/angle-down-solid.svg";
import { ReactComponent as closeIcon } from "../../assets/icons/angle-up-solid.svg";
import { SelectedState } from "../filters/FilterTree";
import styles from "./FolderChipset.module.css";

interface FolderChipsetProps {
  label: string;
  state?: SelectedState | boolean;
  expandable: boolean;
  expanded?: boolean;
  checkboxHandler: Function;
  toggleHandler: Function;
}
function FolderChipset({
  label,
  state,
  expandable,
  expanded,
  checkboxHandler,
  toggleHandler,
}: FolderChipsetProps) {
  return (
    <div className={styles.folderChipsetContainer}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={state === SelectedState.All || state === true}
            indeterminate={state === SelectedState.Some}
            onChange={() => checkboxHandler()}
          />
        }
      />
      {expandable && (
        <Button className={styles.toggleButton} onClick={() => toggleHandler()}>
          <SvgIcon component={expanded ? closeIcon : openIcon} inheritViewBox />
        </Button>
      )}
    </div>
  );
}

export default FolderChipset;
