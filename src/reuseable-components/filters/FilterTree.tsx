import FolderChipset from "../chipsets/FolderChipset";
import { hasChildren } from "./filter-utils";

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
      <section key={filter.key}>
        <div
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          {parentIndexPath.length > 0 && (
            <div
              style={{ width: "8px", height: "1px", background: "grey" }}
            ></div>
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
          <div
            style={{
              marginLeft: "8px",
              borderLeft: "1px solid grey",
            }}
          >
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

  return <>{RenderFiltersList(filters, [])}</>;
}

export default FilterTree;
