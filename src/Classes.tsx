import React from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { ColDef } from "ag-grid-community";


export enum Stats {
    Strength = "Strength",
    Dex = "Dex",
    Con = "Constitution",
    Int = "Intelligence",
    Wisdom = "Wisdom",
    Charisma = "Charisma"
}

export interface Classes {
    name: string;
    hitDice: string;
    keyStats: Stats[],
    saves: Stats[]
}


function Classes() {
    // make stats enum

    const [rowData, setRowData] = useState<Classes[]>([
        { name: "Barbarian", hitDice: "D12", keyStats: [Stats.Strength], saves: [Stats.Strength, Stats.Con] },
        { name: "Rogue", hitDice: "D8", keyStats: [Stats.Dex], saves: [Stats.Dex, Stats.Int] },
        { name: "Bard", hitDice: "D8", keyStats: [Stats.Charisma], saves: [Stats.Charisma, Stats.Dex] },
        { name: "Wizard", hitDice: "D6", keyStats: [Stats.Int], saves: [Stats.Int, Stats.Wisdom] },
      ]);
      
      const colDefs: ColDef[] = [
        { field: "name" },
        { field: "hitDice" },
        { field: "keyStats" },
        { field: "saves" }
      ]

      
    return (

        <>
         <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
            <AgGridReact<Classes>
                rowData={rowData}
                columnDefs={colDefs as any[]}
            />
            </div>
        <div>
            Classes AAAAA
        </div>
        <Link to="/">Back</Link>
        </>

    );
  }
  
  export default Classes;