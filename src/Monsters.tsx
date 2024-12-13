import { useEffect, useState } from "react";
import FilterTree from "./reuseable-components/filters/FilterTree";
import { useMonstersFilterStore } from "./stores/filters/monster-filters.store";
import {
  getFilteredMonsters,
  mockMonstersData,
  Monster,
} from "./mock-data-services/monsters.mock";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import styles from "./Monsters.module.css";
import { defaultGridOptions } from "./constants/grid.const";
import Button from "@mui/material/Button";
import { Size } from "./constants/consts";

function Monsters() {
  const gridOptions = {
    ...defaultGridOptions,
  };
  const filters = useMonstersFilterStore((state) => state.filters);
  const resetFilters = useMonstersFilterStore((state) => state.reset);
  const updateSelectedFilters = useMonstersFilterStore(
    (state) => state.updateSelectedFilters
  );
  const updateExpandedFilters = useMonstersFilterStore(
    (state) => state.updateExpandedFilters
  );

  const [rowData, setRowData] = useState<Monster[]>(mockMonstersData);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    // on filter change, filter displayed monsters data
    const filteredMonsters = getFilteredMonsters(filters);
    setRowData(filteredMonsters);
  }, [filters]);

  useEffect(() => {
    resetFilters();
  }, []);

  function toggleFilters() {
    setShowFilters(!showFilters);
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
      valueGetter: (params) => {
        const size = Size[params.data.size] || "";
        return `${size[0].toUpperCase()}${size.slice(1)}`;
      },
      comparator: (a, b) => {
        return a > b ? -1 : 1;
      },
    },
  ];

  return (
    <div className={styles.container}>
      <header>Monsters</header>
      <Button variant="contained" onClick={() => toggleFilters()}>
        Filters
      </Button>

      <div className={styles.filtersAndGridContainer}>
        {showFilters && (
          <div className={styles.filtersContainer}>
            {FilterTree({
              filters: filters,
              selectFilterHandler: updateSelectedFilters,
              toggleHandler: updateExpandedFilters,
            })}
          </div>
        )}

        <div className={`${styles.gridContainer} ag-theme-quartz`}>
          <AgGridReact<Monster>
            rowData={rowData}
            columnDefs={colDefs as any[]}
            gridOptions={gridOptions as any}
          />
        </div>
      </div>
    </div>
  );
}

export default Monsters;
