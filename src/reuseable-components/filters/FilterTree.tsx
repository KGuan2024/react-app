import FolderChipset from "../chipsets/FolderChipset";
import { hasChildren } from "./filter-utils";
import styles from "./FilterTree.module.css";
import { ReactComponent as closeIcon } from "../../assets/icons/xmark-solid.svg";
import { SvgIcon } from "@mui/material";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside.hook";
import { RoundHighlightIconButtonDark } from "../mui-components/ButtonVariants";
export interface Filter {
  key: string;
  type: string;
  children?: Filter[];
  selectedState?: SelectedState | boolean;
  expanded?: boolean;
}

export enum SelectedState {
  "None",
  "Some",
  "All",
}

interface FolderChipsetProps {
  filters: Filter[];
  selectFilterHandler: Function;
  toggleHandler: Function;
  closeHandler: Function;
  onClickOutside: Function;
  show?: boolean;
}

function FilterTree({
  filters,
  selectFilterHandler,
  toggleHandler,
  closeHandler,
  onClickOutside,
  show,
}: FolderChipsetProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => onClickOutside());

  function RenderFiltersList(
    filters: Filter[],
    parentIndexPath: number[] = []
  ) {
    const mappedFilters = filters?.map((filter: Filter, index: number) => (
      <section key={filter.key} className={styles.filterSection}>
        <div className={styles.parentFilterContainer}>
          {parentIndexPath.length > 0 && (
            <div className={styles.horizontalLead}></div>
          )}

          {FolderChipset({
            label: filter.key,
            state: filter.selectedState,
            expandable: hasChildren(filter),
            expanded: filter.expanded,
            checkboxHandler: () => {
              selectFilterHandler(index, parentIndexPath);
            },
            toggleHandler: () => {
              toggleHandler(index, parentIndexPath);
            },
          })}
        </div>

        {filter.expanded && (
          <div className={styles.childFilterSection}>
            {RenderFiltersList(
              filter.children || [],
              parentIndexPath.concat(index)
            )}
          </div>
        )}
      </section>
    ));
    return mappedFilters;
  }

  return (
    show && (
      <div className={styles.filterTreeContainer} ref={ref}>
        <div className={styles.filterTreeHeader}>
          <div>Filters</div>
          <RoundHighlightIconButtonDark onClick={() => closeHandler()}>
            {" "}
            <SvgIcon component={closeIcon} inheritViewBox />
          </RoundHighlightIconButtonDark>
        </div>
        <div className={styles.filtersContainer}>
          {RenderFiltersList(filters, [])}
        </div>
      </div>
    )
  );
}

export default FilterTree;
