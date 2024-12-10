import { useEffect, useState } from "react";
import FilterTree, {
  Filter,
  SelectedState,
} from "./reuseable-components/filters/FilterTree";
import { useMonstersFilterStore } from "./stores/filters/monster-filters.store";
import { mockMonstersData, Monster } from "./mock-data-services/monsters.mock";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import styles from "./Monsters.module.css";
import { hasChildren } from "./reuseable-components/filters/filter-utils";

interface FlatMonsterFilters {
  category: string[];
  subcategory: string[];
  subtype: string[];
  size: string[];
}

function Monsters() {
  const filters = useMonstersFilterStore((state) => state.filters);
  const updateSelectedFilters = useMonstersFilterStore(
    (state) => state.updateSelectedFilters
  );
  const updateExpandedFilters = useMonstersFilterStore(
    (state) => state.updateExpandedFilters
  );

  const [rowData, setRowData] = useState<Monster[]>(mockMonstersData);

  useEffect(() => {
    // on filter change, filter displayed monsters data
    // in real life this would be using an api instead but this is the best we got for now
    // move out to mocks and simulate it like an api call with small timeout and async await ?

    let flatFilters: FlatMonsterFilters = {
      category: [],
      subcategory: [],
      subtype: [],
      size: [],
    };
    filters.forEach((filter) => {
      // we aint applying the top level ones if those are selected/deselected
      getFlatFilterStructure(filter.children || [], flatFilters);
    });
    const filteredMonsters: Monster[] = filterMonsters(flatFilters, [
      ...mockMonstersData,
    ]);
    setRowData(filteredMonsters);
  }, [filters]);

  function filterMonsters(
    flatFilters: FlatMonsterFilters,
    monsters: Monster[]
  ) {
    return monsters.filter((monster) => {
      const categoryMatch =
        !flatFilters.category.length ||
        flatFilters.category.includes(monster.category);
      const subcategoryMatch =
        !flatFilters.subcategory.length ||
        flatFilters.subcategory.includes(monster.subcategory);
      const subtypeMatch =
        !flatFilters.subtype.length ||
        (monster.subtype && flatFilters.subtype.includes(monster.subtype));

      const sizeMatch =
        !flatFilters.size.length || flatFilters.size.includes(monster.size);

      return categoryMatch && subcategoryMatch && subtypeMatch && sizeMatch;
    });
  }

  function getFlatFilterStructure(
    filters: Filter[],
    flatFilters: FlatMonsterFilters
  ) {
    filters.forEach((filter) => {
      if (
        filter.selectedState === SelectedState.All ||
        (!hasChildren(filter) && filter.selectedState)
      ) {
        addFlatFilter(filter, flatFilters);
      } else if (
        filter.children &&
        (filter.selectedState as SelectedState) === SelectedState.Some
      ) {
        getFlatFilterStructure(filter.children, flatFilters);
      }
    });
  }

  function addFlatFilter(filter: Filter, flatFilters: FlatMonsterFilters) {
    switch (filter.type) {
      case "MonsterCategory":
        flatFilters.category.push(filter.key);
        break;
      case "MonsterSubcategory":
        flatFilters.subcategory.push(filter.key);
        break;
      case "MonsterType":
        flatFilters.subtype.push(filter.key);
        break;
      case "Size":
        flatFilters.size.push(filter.key);
        break;

      default:
    }
  }

  const colDefs: ColDef[] = [
    {
      field: "name",
    },
    {
      field: "category",
    },
    {
      field: "subcategory",
    },
    {
      field: "size",
      // put custom sort here
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        {FilterTree({
          filters: filters,
          selectFilterHandler: updateSelectedFilters,
          toggleHandler: updateExpandedFilters,
        })}
      </div>

      <div
        className={`${styles.gridContainer} ag-theme-quartz`}
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact<Monster> rowData={rowData} columnDefs={colDefs as any[]} />
      </div>
    </div>
  );
}

export default Monsters;
