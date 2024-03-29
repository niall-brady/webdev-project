import * as React from "react";
import GetPrice from "./GetPrice";
import MaterialTable from "@material-table/core";
import { showLoading } from "./shared/showLoading";

// MUI Imports //
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

const Price = () => {
  const { outId, loading } = GetPrice();
  //console.log(outId);

  // if loading, do not render table, needed as there will be no rendered data initially (if remove this you will get errors)
  if (loading) {
    return showLoading;
  }

  //------------------------------------------------
  // Column set up for MUI //
  //------------------------------------------------
  // const columns = [
  //     { field: 'sym', headerName: 'Sym', editable: false },
  //     { field: 'price', headerName: 'Price', type: 'number', editable: false },
  //     {
  //       field: 'priceChange',
  //       headerName: 'Price Change',
  //       type: 'number',
  //       width: 150,
  //       editable: false,
  //     },
  //   ];

  //------------------------------------------------
  // Column set up for material-table //
  //------------------------------------------------
  const columns = [
    {
      field: "time",
      title: "Time",
      cellStyle: { textAlign: "right" },
      align: "right",
    },
    {
      field: "sym",
      title: "Sym",
      cellStyle: { textAlign: "right" },
      align: "right",
    },
    {
      field: "price",
      title: "Current Price",
      cellStyle: { textAlign: "right" },
      titleStyle: { textAlign: "right" },
      align: "right",
      customSort: (a, b) => a.price - b.price,
    },
    {
      field: "priceChange",
      title: "Min Price",
      cellStyle: { textAlign: "right" },
      align: "right",
      customSort: (a, b) => a.priceChange - b.priceChange,
    },
    {
      field: "maxPrice",
      title: "Max Price",
      cellStyle: { textAlign: "right" },
      align: "right",
      customSort: (a, b) => a.maxPrice - b.maxPrice,
    },
  ];
  //set up column data and number of rows using a for loop. Extracts data from outId
  var rows = [];
  for (var i = 0; i < outId.length; i++) {
    rows[i] = {
      id: i,
      time: outId[i].time,
      sym: outId[i].sym,
      price: Number(outId[i].current_price).toFixed(2),
      priceChange: Number(outId[i].min_price).toFixed(2),
      maxPrice: Number(outId[i].max_price).toFixed(2), // this column is not shown but needed to change colour of table depending on price
      editable: false,
    };
  }

  // ---------------------------------------------------------------
  // Plotting if using MUI
  // ---------------------------------------------------------------
  // add in autoheight and row count
  // return (
  //   <div style={{ height: 650, width: '55%' }}>
  //     <DataGrid
  //       rows={rows}
  //       columns={columns}
  //       hideFooterPagination={true}
  //     />
  // </div>
  // );

  // ---------------------------------------------------------------
  // Plotting if using material-tables
  // ---------------------------------------------------------------

  // create function to plot table
  const plottable = () => {
    return (
      <div style={{ height: 650, width: "45%" }}>
        <MaterialTable
          data={rows}
          columns={columns}
          title="Prices"
          options={{
            pageSize: 10,
            search: false,
            showTitle: false,
          }}
          // hideFooterPagination={true}
        />
      </div>
    );
  };

  // call plotting.
  return (
    <div align="center">
      <h5>Last Updated At: {Date().toLocaleString()}</h5>
      {plottable()}
    </div>
  );
};

export default Price;
