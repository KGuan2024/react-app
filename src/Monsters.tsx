import { useEffect, useState } from "react";
import FilterTree, {
  Filter,
  SelectedState,
} from "./reuseable-components/filters/FilterTree";
import { useMonstersFilterStore } from "./stores/filters/monster-filters.store";
import {
  getFilteredMonsters,
  mockMonstersData,
  Monster,
} from "./mock-data-services/monsters.mock";
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
  const resetFilters = useMonstersFilterStore((state) => state.reset);
  const updateSelectedFilters = useMonstersFilterStore(
    (state) => state.updateSelectedFilters
  );
  const updateExpandedFilters = useMonstersFilterStore(
    (state) => state.updateExpandedFilters
  );

  const [rowData, setRowData] = useState<Monster[]>(mockMonstersData);

  useEffect(() => {
    // on filter change, filter displayed monsters data
    const filteredMonsters = getFilteredMonsters(filters);
    setRowData(filteredMonsters);
  }, [filters]);

  useEffect(() => {
    resetFilters();
  }, []);

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
