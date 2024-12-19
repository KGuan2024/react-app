import { useEffect, useRef, useState } from "react";
import FilterTree from "./reuseable-components/filters/FilterTree";
import { useMonstersFilterStore } from "./stores/filters/monster-filters.store";
import { getMonsters, Monster } from "./mock-data-services/monsters.mock";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import styles from "./Monsters.module.css";
import { defaultGridOptions } from "./constants/grid.const";
import Button from "@mui/material/Button";
import { Size } from "./constants/consts";
import { useQuery } from "./hooks/useQuery.hook";

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

  const { data, loading, error } = useQuery(getMonsters, filters);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    resetFilters();
    setShowFilters(false);
  }, [resetFilters]);

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
      <header className="pageHeader">Monsters</header>
      <section className="gridUtils">
        <Button
          variant="contained"
          className={styles.filterButton}
          onClick={(e) => { e.stopPropagation(); toggleFilters();}}
        >
          Filters
        </Button>
      </section>

      <div className={styles.filtersAndGridContainer}>
        <div className={styles.filtersContainer}>
          {FilterTree({
            filters: filters,
            selectFilterHandler: updateSelectedFilters,
            toggleHandler: updateExpandedFilters,
            closeHandler: () => setShowFilters(false),
            onClickOutside: () => setShowFilters(false),
            show: showFilters,
          })}
        </div>

        <div className={`${styles.gridContainer} ag-theme-quartz`}>
          {showFilters && <div className={styles.overlay}></div>}
          <AgGridReact<Monster>
            rowData={data}
            columnDefs={colDefs}
            gridOptions={gridOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Monsters;
