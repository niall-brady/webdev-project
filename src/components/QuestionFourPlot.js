//------------------------------------------------------------------
// Question Four Plot
// Sets up the plot for the data for Question 4 of the webdev project
// Decided to use material table to build the table
//------------------------------------------------------------------

//***********************************************/
// Importing modules
//***********************************************/

import * as React from 'react';
import QuestionFourGet from "./QuestionFourGet";

// Material Table imports
import MaterialTable from 'material-table';

// MUI Imports //
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';


//***********************************************/
// Writing the plot function to call in App.js
//***********************************************/

const QuestionFourPlot = () => {
    
  // First call QuestionFourGet to get data
    const {outId,loading} = QuestionFourGet();
    //console.log(outId);

    // if loading, do not render table, needed as there will be no rendered data initially (if remove this you will get errors)
    if (loading) {
      return <div className="App">Loading...</div>;
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
        { field: 'sym', title: 'Sym'},
        { field: 'price', title: 'Last Price'},
        {
          field: 'priceChange',
          title: 'Price Change',
        },
      ];
    
      //----------------------------------------------------------------------------
      // Set up data/rows. Use output data from QuestionFourGet stored in outId. 
      // Same for both MUI and material-table
      // Only issue here is that "rows" uses hardcoding.
      //----------------------------------------------------------------------------
      const rows = [
        {
          id: 1,
          sym: outId[0].sym,
          price: outId[0].lastPrice,
          priceChange: outId[0].diffPrice[0],
          editable: true,
        },
        {
          id: 2,
          sym: outId[1].sym,
          price: outId[1].lastPrice,
          priceChange: outId[1].diffPrice[0], 
          editable: true,
        },
        {
          id: 3,
          sym: outId[2].sym,
          price: outId[2].lastPrice,
          priceChange: outId[2].diffPrice[0],  
          editable: true, 
        },
        {
          id: 4,
          sym: outId[3].sym,
          price: outId[3].lastPrice,
          priceChange: outId[3].diffPrice[0], 
          editable: true,
        },
        {
          id: 5,
          sym: outId[4].sym,
          price: outId[4].lastPrice,
          priceChange: outId[4].diffPrice[0], 
          editable: true,
        },
        {
        id: 6,
        sym: outId[5].sym,
        price: outId[5].lastPrice,
        priceChange: outId[5].diffPrice[0], 
        editable: true,
        },
        {
        id: 7,
        sym: outId[6].sym,
        price: outId[6].lastPrice,
        priceChange: outId[6].diffPrice[0], 
        editable: true,
        },
        {
        id: 8,
        sym: outId[7].sym,
        price: outId[7].lastPrice,
        priceChange: outId[7].diffPrice[0], 
        editable: true,
        },
        {
        id: 9,
        sym: outId[8].sym,
        price: outId[8].lastPrice,
        priceChange: outId[8].diffPrice[0], 
        editable: true,
        },
        {
        id: 10,
        sym: outId[9].sym,
        price: outId[9].lastPrice,
        priceChange: outId[9].diffPrice[0], 
        editable: true,
        },
    ];

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
     return (
      <div style={{ height: 650, width: '55%' }}>
        <MaterialTable
          data={rows} 
          columns={columns} 
          title='Sym and Price'
         // hideFooterPagination={true}

         options={{   
          //rowStyle: {backgroundColor: '#E3FEDF},
          rowStyle: rowData => {
            if(rowData.priceChange > 0) {
              return {backgroundColor: '#E3FEDF'};
            }
             else if (rowData.priceChange === 0) {
              return {backgroundColor: '#FCFEDF'}; 
             }
            else return { backgroundColor: '#FEE3DF'}
          },
          search:false,
          paging: false
          
        }}

        />
    </div>
    );
  

}

// export function so can be called in App.js 
export default QuestionFourPlot;