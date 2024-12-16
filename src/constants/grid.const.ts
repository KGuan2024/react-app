import { GridOptions } from "ag-grid-community";
import Loading from "../reuseable-components/loading/Loading";

export const defaultGridOptions: GridOptions = {
  onGridReady: (params) => {
    params.api.sizeColumnsToFit();
  },
  onModelUpdated: (params) => {
    params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (event) => {
    if (event.clientWidth > 0 || event.clientHeight > 0) {
      event.api.sizeColumnsToFit();
    }
  },
  loadingOverlayComponent: Loading,
};
