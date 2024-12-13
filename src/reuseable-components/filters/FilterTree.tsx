import FolderChipset from "../chipsets/FolderChipset";
import { hasChildren } from "./filter-utils";
import styles from "./FilterTree.module.css";
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
  showFilters?: boolean;
  selectFilterHandler: Function;
  toggleHandler: Function;
  clickOutsideHandler: Function;
}

function FilterTree({
  filters,
  selectFilterHandler,
  toggleHandler,
}: FolderChipsetProps) {
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
    <div className={styles.filterTreeContainer}>
      {RenderFiltersList(filters, [])}
    </div>
  );
}

export default FilterTree;
