import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  CellClickedEvent,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import IconCellRenderer from "./ag-grid-components/cell-renderers/IconCellRenderer";
import { getDiceIcons, getStatsIcons } from "./utils/shared-utils";
import { Stats } from "./constants/consts";
import styles from "./Classes.module.css";
import Tooltip from "@mui/material/Tooltip";
import { getClasses } from "./mock-data-services/classes.mock";
import { defaultGridOptions } from "./constants/grid.const";
import { useQuery } from "./hooks/useQuery.hook";

function Classes() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(getClasses);
  const gridOptions = {
    ...defaultGridOptions,
    rowHeight: 100,
  };

  const rowData = data;

  const colDefs: ColDef[] = [
    {
      field: "name",
      minWidth: 100,
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <Tooltip title="View Details">
            <div className={styles.nameCell}>
              <div>{params.value}</div>
              {params.data.description && (
                <div className={styles.description}>
                  {params.data.description}
                </div>
              )}
            </div>
          </Tooltip>
        );
      },
      onCellClicked: (event: CellClickedEvent) => {
        navigate("/classes-detail/" + event.value);
      },
    },
    {
      field: "hitDice",
      cellRenderer: IconCellRenderer,
      cellRendererParams: (params: ICellRendererParams) => {
        return getDiceParams(params);
      },
    },
    {
      field: "keyStats",
      headerName: "Key Stat(s)",
      cellRenderer: IconCellRenderer,
      cellRendererParams: (params: ICellRendererParams) => {
        return getIconParams(params);
      },
      sortable: false,
    },
    {
      field: "saves",
      cellRenderer: IconCellRenderer,
      cellRendererParams: (params: ICellRendererParams) => {
        return getIconParams(params);
      },
      sortable: false,
    },
  ];

  function getIconParams(params: ICellRendererParams) {
    return {
      icons: params.value?.map((data: Stats) => {
        return {
          icon: getStatsIcons(data),
          tooltip: data,
        };
      }),
    };
  }

  function getDiceParams(params: ICellRendererParams) {
    return {
      icons: [
        {
          icon: getDiceIcons(params?.value),
          tooltip: params?.value,
        },
      ],
    };
  }

  return (
    <div className={styles.classes}>
      <header>Classes</header>
      <div className={`${styles.gridContainer} ag-theme-quartz`}>
        <AgGridReact<any>
          gridOptions={gridOptions as any}
          rowData={rowData}
          columnDefs={colDefs as any[]}
        />
      </div>
    </div>
  );
}

export default Classes;
