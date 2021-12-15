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
import {showLoading} from "./shared/showLoading";
import {showError} from "./shared/showError";

// Material Table imports
import MaterialTable from '@material-table/core';
import {ArrowUpward} from '@material-ui/icons'

// MUI Imports //
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';


//***********************************************/
// Writing the plot function to call in App.js
//***********************************************/

const QuestionFourPlot = () => {
    
  // First call QuestionFourGet to get data
    const {outIdFour,loadingFour, errorFour} = QuestionFourGet();
    //console.log(outId);

    // if loading, do not render table, needed as there will be no rendered data initially (if remove this you will get errors)
    // if (loading) {
    //   return <div className="App">Loading...</div>;
    //  }

    if (errorFour) return showError

    if (loadingFour) return showLoading

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
       
      // sym column
      { field: 'sym', 
          title: 'Sym', 
          cellStyle:{textAlign: "right"}, 
          align: "right", 
          //customSort: (a, b) => a.sym - b.sym 
        },
        
        // last price column, have added custom sorting so sorts correctly. Other columns sort fine so no custom sort needed.
        { field: 'price', 
          title: 'Last Price', 
          cellStyle:{textAlign: "right"}, 
          titleStyle:{textAlign: "right"}, 
          align: "right", 
          customSort: (a, b) => a.price - b.price
        },
        
        // Price Change column
        { field: 'priceChange', 
          title: 'Price Change', 
          cellStyle:{textAlign: "right"}, 
          align: "right", 
        },
      ];
    
      //----------------------------------------------------------------------------
      // Set up data/rows. Use output data from QuestionFourGet stored in outId. 
      // Same for both MUI and material-table
      // Only issue here is that "rows" uses hardcoding.
      //----------------------------------------------------------------------------

      var arrowDiff=[] // array to put price change + arrow data into

      // for loop to append arrow to end of Price Change data

      for (var i = 0; i < outIdFour.length; i++) {
        if ( Number(outIdFour[i].diffPrice[0]).toFixed(2) > 0) {
          arrowDiff[i]=(Number(outIdFour[i].diffPrice[0]).toFixed(2) +" 🡱")
        }
        else if ( Number(outIdFour[i].diffPrice[0]).toFixed(2) < 0) {
          arrowDiff[i]=(Number(outIdFour[i].diffPrice[0]).toFixed(2) +" 🡳")
        }
        else {arrowDiff[i]=(Number(outIdFour[i].diffPrice[0]).toFixed(2) + " ‒")}
      }

      //set up column data and number of rows using a for loop. Extracts data from outId
      var rows=[]
      for (var i = 0; i < outIdFour.length; i++) {
        rows[i] = {
          id: i,
          sym: outIdFour[i].sym,
          price: Number(outIdFour[i].lastPrice).toFixed(2),
          priceChange: (arrowDiff[i]),
          colourChange:Number(outIdFour[i].diffPrice[0]).toFixed(2), // this column is not shown but needed to change colour of table depending on price
          editable: false,
        }

      }
    

    //------------------------------//
    // Hardcode the rows
    //------------------------------//

    //   const rows = [
    //     {
    //       id: 1,
    //       sym: outId[0].sym,
    //       price: Number(outId[0].lastPrice).toFixed(2),
    //       priceChange: Number(outId[0].diffPrice[0]).toFixed(2),
    //       editable: true,
    //     },
    //     {
    //       id: 2,
    //       sym: outId[1].sym,
    //       price: Number(outId[1].lastPrice).toFixed(2),
    //       priceChange:(Number(outId[1].diffPrice[0]).toFixed(2) + " 🡱🡳")
    //       //priceChange:arrowDiff[1],
    //       editable: true,
    //     },
    //     {
    //       id: 3,
    //       sym: outId[2].sym,
    //       price: Number(outId[2].lastPrice).toFixed(2),
    //       priceChange: Number(outId[2].diffPrice[0]).toFixed(2),  
    //       editable: true, 
    //     },
    //     {
    //       id: 4,
    //       sym: outId[3].sym,
    //       price: Number(outId[3].lastPrice).toFixed(2),
    //       priceChange: Number(outId[3].diffPrice[0]).toFixed(2), 
    //       editable: true,
    //     },
    //     {
    //       id: 5,
    //       sym: outId[4].sym,
    //       price: Number(outId[4].lastPrice).toFixed(2),
    //       priceChange: Number(outId[4].diffPrice[0]).toFixed(2), 
    //       editable: true,
    //     },
    //     {
    //     id: 6,
    //     sym: outId[5].sym,
    //     price: Number(outId[5].lastPrice).toFixed(2),
    //     priceChange: Number(outId[5].diffPrice[0]).toFixed(2), 
    //     editable: true,
    //     },
    //     {
    //     id: 7,
    //     sym: outId[6].sym,
    //     price: Number(outId[6].lastPrice).toFixed(2),
    //     priceChange: Number(outId[6].diffPrice[0]).toFixed(2), 
    //     editable: true,
    //     },
    //     {
    //     id: 8,
    //     sym: outId[7].sym,
    //     price: Number(outId[7].lastPrice).toFixed(2),
    //     priceChange: Number(outId[7].diffPrice[0]).toFixed(2), 
    //     editable: true,
    //     },
    //     {
    //     id: 9,
    //     sym: outId[8].sym,
    //     price: Number(outId[8].lastPrice).toFixed(2),
    //     priceChange: Number(outId[8].diffPrice[0]).toFixed(2), 
    //     editable: true,
    //     },
    //     {
    //     id: 10,
    //     sym: outId[9].sym,
    //     price: Number(outId[9].lastPrice).toFixed(2),
    //     priceChange: Number(outId[9].diffPrice[0]).toFixed(2), 
    //     editable: true,
    //     },
    // ];

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

      <div style={{ height: 650, width: '45%' }}>
        <MaterialTable
          data={rows} 
          columns={columns} 
          title='Last Price and Price Change by Sym'
         // hideFooterPagination={true}

         options={{   
          //rowStyle: {backgroundColor: '#E3FEDF},
          rowStyle: rowData => {
            if(rowData.colourChange > 0) { // before was hardcoded, to use hardcoding have to ref rowData.priceChange
              return {backgroundColor: '#D0F1FF'}; //#E3FEDF non colorblind friendly, (one #D0F1FF), (two #e7f7d5)
            }
             else if (rowData.colourChange < 0) {
              return {backgroundColor: '#FEE3DF'}; //#FEE3DF non colorblind friendly, (one #FEE3DF), (two #f6d3e8)
             }
            else return { backgroundColor: '#FFFFFF'}
          }, 
          search:false,
          paging: false,
          padding:'dense', 
          sorting:true,         
        }}
        
        // fixes sort arrow issue
        icons={{
          SortArrow: React.forwardRef((props, ref) => <ArrowUpward {...props} fontSize="small" ref={ref}/>)
       }}

        />
    </div>
    );
      }

    // call plotting.
    return (
    <div align="center">   
     <h2 className="Heading">
        Last Value Cache
      </h2>
      {plottable()}
      </div>    
    );


}

// export function so can be called in App.js 
export default QuestionFourPlot;