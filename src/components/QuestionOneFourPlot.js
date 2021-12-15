// Q1 and Q4 Combined

//------------------------------------------------------------------------
// Plot combines Part 1 of Q1 (Shawn's) and Q4 (Katie's) for conciseness
// Uses material table
//------------------------------------------------------------------------


//***********************************************/
// Importing modules
//***********************************************/

import * as React from 'react';
import QuestionFourGet from "./QuestionFourGet";
import GetPrice from "./GetPrice";
import {showLoading} from "./shared/showLoading";

// Material Table imports
import MaterialTable from '@material-table/core';
import {ArrowUpward} from '@material-ui/icons'

//***********************************************/
// Writing the plot function to call in App.js
//***********************************************/


const QuestionOneFourPlot = () => {
    
    // First call QuestionFourGet to get data
      const {outId,loading} = GetPrice();
      const outIdOne = outId
      const loadingOne = loading
      
      const {outIdFour,loadingFour} = QuestionFourGet();

    // Loading if no data
      if (loadingOne) {return showLoading}
      else if (loadingFour) {return showLoading}


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

    // Price Change column
    { field: 'priceChange', 
    title: 'Price Change', 
    cellStyle:{textAlign: "right"}, 
    align: "right", 
    },

    // Min Price
    {
      field: "minPrice",
      title: "Min Price",
      cellStyle: { textAlign: "right" },
      align: "right",
      customSort: (a, b) => a.minPrice - b.minPrice,
    },

    // Max Price
    {
      field: "maxPrice",
      title: "Max Price",
      cellStyle: { textAlign: "right" },
      align: "right",
      customSort: (a, b) => a.maxPrice - b.maxPrice,
    },
  ];

  //----------------------------------------------------------------------------
  // Set up data/rows
  //----------------------------------------------------------------------------

  // set up arrows for price change column
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
  var rows = [];
  for (var i = 0; i < outIdOne.length; i++) {
    rows[i] = {
      id: i,

      // From Question One
      time: outIdOne[i].time,
      sym: outIdOne[i].sym,
      price: Number(outIdOne[i].current_price).toFixed(2),
      minPrice: Number(outIdOne[i].min_price).toFixed(2),
      maxPrice: Number(outIdOne[i].max_price).toFixed(2), 

      // From Question Four
      priceChange: (arrowDiff[i]),
      colourChange:Number(outIdFour[i].diffPrice[0]).toFixed(2), // this column is not shown but needed to change colour of table depending on price

      editable: false,
    };
  }

  // ---------------------------------------------------------------
  // Plotting if using material-tables
  // ---------------------------------------------------------------

  // create function to plot table
  const plottable = () => {
    return (
      <div style={{ height: 650, width: "70%" }}>
        <MaterialTable
          data={rows}
          columns={columns}
          //title="Prices"

          options={{   
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
            pageSize: 10,
            //paging: false,
            padding:'dense', 
            sorting:true,   
            showTitle: false,      
          }}

          icons={{
            SortArrow: React.forwardRef((props, ref) => <ArrowUpward {...props} fontSize="small" ref={ref}/>)
         }}
  

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

export default QuestionOneFourPlot;


  
