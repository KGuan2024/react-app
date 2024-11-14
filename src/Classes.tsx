import { Link, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import {
  CellClickedEvent,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import IconCellRenderer from "./ag-grid-components/cell-renderers/IconCellRenderer";
import { getDiceIcons, getStatsIcons } from "./utils/shared-utils";
import { Dice, Stats } from "./constants/consts";
import styles from "./Classes.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as arrowRightIcon } from "./assets/icons/circle-arrow-right-solid.svg";
import Tooltip from "@mui/material/Tooltip";

export interface Classes {
  name: string;
  hitDice: string;
  keyStats: Stats[];
  saves: Stats[];
}

function Classes() {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState<Classes[]>([
    {
      name: "Barbarian",
      hitDice: Dice.D12,
      keyStats: [Stats.Strength],
      saves: [Stats.Strength, Stats.Con],
    },
    {
      name: "Rogue",
      hitDice: Dice.D8,
      keyStats: [Stats.Dex],
      saves: [Stats.Dex, Stats.Int],
    },
    {
      name: "Bard",
      hitDice: Dice.D8,
      keyStats: [Stats.Charisma],
      saves: [Stats.Charisma, Stats.Dex],
    },
    {
      name: "Wizard",
      hitDice: Dice.D6,
      keyStats: [Stats.Int],
      saves: [Stats.Int, Stats.Wisdom],
    },
  ]);

  const colDefs: ColDef[] = [
    {
      field: "name",
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <Tooltip title="View Details">
            <div className={styles.nameCell}>
              <div>{params.value}</div>
              <SvgIcon component={arrowRightIcon} inheritViewBox />
            </div>
          </Tooltip>
        );
      },
      onCellClicked: (event: CellClickedEvent) => {
        console.log(event.data);
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
    },
    {
      field: "saves",
      cellRenderer: IconCellRenderer,
      cellRendererParams: (params: ICellRendererParams) => {
        return getIconParams(params);
      },
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
      text: params?.value.toUpperCase(),
    };
  }

  return (
    <>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact<Classes> rowData={rowData} columnDefs={colDefs as any[]} />
      </div>
      <div>Classes</div>
      <Link to="/">Back</Link>
    </>
  );
}

export default Classes;
