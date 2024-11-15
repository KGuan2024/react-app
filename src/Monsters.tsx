import { FormGroup } from "@mui/material";
import { useImmer } from "use-immer";
import {
  hasChildren,
  navToNode,
  updateSelectedFilters,
} from "./reuseable-components/filters/filter-utils";
import FolderChipset from "./reuseable-components/chipsets/FolderChipset";
import FilterTree, { Filter } from "./reuseable-components/filters/FilterTree";

function Monsters() {
  const monstersMock: Filter[] = [
    {
      key: "Beast",
      type: "MonsterCategory",
      children: [
        {
          key: "Mammal",
          type: "MonsterSubcategory",
          children: [
            {
              key: "Dire Wolf",
              type: "Monster",
            },
          ],
        },
        {
          key: "Avian",
          type: "MonsterSubcategory",
          children: [
            {
              key: "Roc",
              type: "Monster",
            },
            {
              key: "Kenku",
              type: "Monster",
            },
          ],
        },
      ],
    },
    {
      key: "Elemental",
      type: "MonsterCategory",
      children: [
        {
          key: "Air Elemental",
          type: "Monster",
        },
        {
          key: "Fire Elemental",
          type: "Monster",
        },
        {
          key: "Water Elemental",
          type: "Monster",
        },
        {
          key: "Earth Elemental",
          type: "Monster",
        },
      ],
    },
    {
      key: "Fey",
      type: "MonsterCategory",
      children: [
        {
          key: "Humanoid",
          type: "MonsterSubcategory",
          children: [
            {
              key: "Hag",
              type: "Monster",
            },
            {
              key: "Satyr",
              type: "Monster",
            },
            {
              key: "Dryad",
              type: "Monster",
            },
          ],
        },
        {
          key: "Animal",
          type: "MonsterSubcategory",
          children: [
            {
              key: "Dandylion",
              type: "Monster",
            },
            {
              key: "Goose Mother",
              type: "Monster",
            },
          ],
        },
        {
          key: "Fungi & Plant",
          type: "MonsterSubcategory",
          children: [
            {
              key: "Blubbering shroom",
              type: "Monster",
            },
          ],
        },
      ],
    },
  ];

  const [filters, updateFilters] = useImmer(monstersMock);

  function toggleFilterDisplay(
    filterIndex: number,
    parentIndexPath: number[] = []
  ) {
    updateFilters((draft) => {
      const nodeToToggle = navToNode(
        parentIndexPath.concat(filterIndex),
        draft
      );
      if (nodeToToggle) {
        nodeToToggle.expanded = !nodeToToggle.expanded;
      }
    });
  }

  function changeFilterSelection(index: number, indexPath: number[]) {
    updateFilters((draft) => {
      updateSelectedFilters(draft, index, indexPath);
    });
  }

  function RenderFiltersList(
    filters: Filter[],
    parentIndexPath: number[] = []
  ) {
    const mappedFilters = filters?.map((filter: Filter, index: number) => (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        key={filter.key}
      >
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
              changeFilterSelection(index, parentIndexPath);
            },
            toggleHandler: () => {
              toggleFilterDisplay(index, parentIndexPath);
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
      </div>
    ));
    return mappedFilters;
  }

  return (
    <div>
      {FilterTree({
        filters: filters,
        selectFilterHandler: changeFilterSelection,
        toggleHandler: toggleFilterDisplay,
      })}
    </div>
  );
}

export default Monsters;
