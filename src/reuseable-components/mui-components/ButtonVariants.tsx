import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";

const roundButtonStyle = {
  borderRadius: "100%",
  width: 120,
  height: 120,
  padding: "var(--spacing-sm)",
  minWidth: "unset",
};

export const RoundButton = styled(Button)<ButtonProps>(
  ({ theme }) => roundButtonStyle
);

export const RoundHighlightIconButtonDark = styled(Button)<ButtonProps>(
  ({ theme }) => ({
    ...roundButtonStyle,
    background: "transparent",
    height: "var(--icon-l)",
    width: "var(--icon-l)",
    color: "inherit",
    "&:hover": {
      backgroundColor: "var(--hover-overlay-light)",
    },
    "& > svg": {
      height: "var(--icon-s)",
      width: "var(--icon-s)",
    },
  })
);
