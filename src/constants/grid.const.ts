import { GridOptions } from "ag-grid-community";

export const defaultGridOptions: GridOptions = {
  onGridReady: (params) => {
    params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: (event) => {
    if (event.clientWidth > 0 || event.clientHeight > 0) {
      event.api.sizeColumnsToFit();
    }
  },
  // loadingOverlayComponent: LoadingOverlayComponent,
  // loadingOverlayComponentParams: {
  //   header: "Loading Data",
  // },
};
