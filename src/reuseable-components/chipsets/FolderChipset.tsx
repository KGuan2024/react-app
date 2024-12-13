import { Button, Checkbox, FormControlLabel, SvgIcon } from "@mui/material";

import { ReactComponent as openIcon } from "../../assets/icons/angle-down-solid.svg";
import { ReactComponent as closeIcon } from "../../assets/icons/angle-up-solid.svg";
import { SelectedState } from "../filters/FilterTree";

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
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
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
        <Button
          style={{ justifyContent: "flex-start" }}
          onClick={() => toggleHandler()}
        >
          <SvgIcon
            style={{ pointerEvents: "none" }}
            component={expanded ? closeIcon : openIcon}
            inheritViewBox
          />
        </Button>
      )}
    </div>
  );
}

export default FolderChipset;
