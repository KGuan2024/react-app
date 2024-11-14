import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import styles from "./IconCellRenderer.module.css";

export interface IconRendererParams {
  icons: { icon: (props: SvgIconProps) => JSX.Element; tooltip?: string }[];
  text?: string;
}

export default (params: IconRendererParams) => {
  const icons = params.icons.map((param, i) => {
    return (
      <Tooltip title={param.tooltip} key={i} placement="right">
        <SvgIcon component={param.icon} inheritViewBox />
      </Tooltip>
    );
  });

  return (
    <>
      <div className={styles.iconContainer}>
        {icons}
        <span>{params?.text}</span>
      </div>
    </>
  );
};
