import React, { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { data } from "../../data/data";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function DataTable() {
  const rowData = data.map((item) => ({
    year: item._year,
    month: item.month,
    product: item.product,
    state: item.state,
    requirement: Number(item.requirement_in_mt_) || 0,
    availability: Number(item.availability_in_mt_) || 0,
  }));

  const [colDefs] = useState([
    { field: "year", headerName: "Year", sortable: true, filter: true },
    { field: "month", headerName: "Month", sortable: true, filter: true },
    { field: "product", headerName: "Product", sortable: true, filter: true },
    { field: "state", headerName: "State", sortable: true, filter: true },
    {
      field: "requirement",
      headerName: "Requirement (MT)",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    {
      field: "availability",
      headerName: "Availability (MT)",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={15}
        defaultColDef={{ resizable: true }} // Allows resizing columns
      />
    </div>
  );
}
