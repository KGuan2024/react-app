import { useImmer } from "use-immer";
import {
  navToNode,
  updateSelectedFilters,
} from "./reuseable-components/filters/filter-utils";
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
