//------------------------------------------------------------------
// Question Four Get
// Gets the data for Question 4 of the webdev project
//------------------------------------------------------------------

//***********************************************/
// Importing modules
//***********************************************/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { DataGrid } from '@mui/x-data-grid'; // unmute if doing plotting in here


//***************************************************************************/
// set up function and export that gets the data, called in QuestionFourPlot
//***************************************************************************/

export default function QuestionFourGet() {
 
    // define constants. Hardcode for each sym -------------------------------------
      
    const [outIdFour, setOutIdFour] = useState([]);
    const [loadingFour, setLoadingFour] = useState(true);
    const [errorFour, setErrorFour] = useState(false);

    // const [APPLId, setAPPLId] = useState([]);
    // const [AIGId, setAIGId] = useState([]);
    // const [AMDId, setAMDId] = useState([]);
    // const [DELLId, setDELLId] = useState([]);
    // const [DOWId, setDOWId] = useState([]);
    // const [GOOGId, setGOOGId] = useState([]);
    // const [HPQId, setHPQId] = useState([]);
    // const [IBMId, setIBMId] = useState([]);
    // const [INTCId, setINTCId] = useState([]);
    // const [MSFTId, setMSFTId] = useState([]);

    //------------------------------------------------------------------------------

    // set up UseEffect/React Hook to perform an async axios post request
    useEffect(() => {
       let interval // set up the refresh interval
        const fetchData = async () => {
        try {
            const response  = await axios.post("https://localhost:8091/executeFunction",
            {
                "function_name": "string",
                "arguments": { "db": "rdb",
                "query":"select lastPrice:last price,diffPrice:(last price)-(1#(-2#price)) by sym from trade where time within (.z.D+00:00;.z.p)"
                }
                },
                        {
                            auth: {
                            username: "user",
                            password: "pass"
                            },
                            headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "BASIC dXNlcjpwYXNz"
                            }
                        }
                        );        


           // console log --------
           //console.log(response.data.result);

           // define variables ------------------------------------------//
            setOutIdFour(response.data.result);
            setLoadingFour(false);

        //    setAPPLId(response.data.result[0])
        //    setAIGId(response.data.result[1])
        //    setAMGId(response.data.result[2])
        //    setDELLId(response.data.result[3])
        //    setDOWId(response.data.result[4])
        //    setGOOGId(response.data.result[5])
        //    setHPQId(response.data.result[6])
        //    setIBMId(response.data.result[7])
        //    setINTCId(response.data.result[8])
        //    setMSFTId(response.data.result[9])
           //------------------------------------------------------------//
            // return it

       // catch error
        } catch(error){
            //console.log(error.response.data.error)
            setErrorFour(true)
            }
        
        };
        fetchData(); // calls the async axios post
        
        // defines in ms when the data will refresh
        interval = setInterval(() => {
        fetchData()
        }, 3 * 1000) // time is in miliseconds
        return () => {
        clearInterval(interval)
        }
     
}, []);

    console.log(outIdFour); // log the data to the console
    return {outIdFour,loadingFour, errorFour}; //return the outputs, mute if plotting



//**************************************************************************//    
// BELOW IS PLOTTING. WORKS BUT NOW THE ACTUAL PLOTTING IS IN QuestionFourPlot
//**************************************************************************//  

//--------------------------------------------------------------
// Advanced Plot
//--------------------------------------------------------------
  //  if (loading) {
  //   return <div className="App">Loading...</div>;
  //  }

  //  const columns = [
  //   { field: 'sym', headerName: 'Sym', width: 180, editable: true },
  //   { field: 'price', headerName: 'Price', type: 'number', editable: true },
  //   {
  //     field: 'priceChange',
  //     headerName: 'Price Change',
  //     type: 'number',
  //     width: 180,
  //     editable: true,
  //   },
  // ];


//   const rows = [
//     {
//       id: 1,
//       sym: outId[0].sym,
//       price: outId[0].lastPrice,
//       priceChange: outId[0].diffPrice[0],
//     },
//     {
//       id: 2,
//       sym: outId[1].sym,
//       price: outId[1].lastPrice,
//       priceChange: outId[1].diffPrice[0], 
//     },
//     {
//       id: 3,
//       sym: outId[2].sym,
//       price: outId[2].lastPrice,
//       priceChange: outId[2].diffPrice[0],   
//     },
//     {
//       id: 4,
//       sym: outId[3].sym,
//       price: outId[3].lastPrice,
//       priceChange: outId[3].diffPrice[0], 
//     },
//     {
//       id: 5,
//       sym: outId[4].sym,
//       price: outId[4].lastPrice,
//       priceChange: outId[4].diffPrice[0], 
//     },
//     {
//     id: 6,
//     sym: outId[5].sym,
//     price: outId[5].lastPrice,
//     priceChange: outId[5].diffPrice[0], 
//     },
//     {
//     id: 7,
//     sym: outId[6].sym,
//     price: outId[6].lastPrice,
//     priceChange: outId[6].diffPrice[0], 
//     },
//     {
//     id: 8,
//     sym: outId[7].sym,
//     price: outId[7].lastPrice,
//     priceChange: outId[7].diffPrice[0], 
//     },
//     {
//     id: 9,
//     sym: outId[8].sym,
//     price: outId[8].lastPrice,
//     priceChange: outId[8].diffPrice[0], 
//     },
//     {
//     id: 10,
//     sym: outId[9].sym,
//     price: outId[9].lastPrice,
//     priceChange: outId[9].diffPrice[0], 
//     },
// ];


// return (
//     <div style={{ height: 300, width: '100%' }}>
//     <DataGrid rows={rows} columns={columns} />
//   </div>
// );

//--------------------------------------------------------------
// Basic Plot - Text to screen
//--------------------------------------------------------------
    // return (
    //     <div className="card text-center m-3">
    //         <h5 className="card-header">Update Real Time Test</h5>
    //         <div className="card-body">
    //             {JSON.stringify(outId)}
    //             {/* Returned Sym: {symId}
    //             <div> Returned Average Price: {avgPriceId}  </div> */}
    //             {/* <div> Returned Max Ask: {maxAskId} </div>
    //             <div> Returned Min Ask: {minAskId} </div> */}
    //         </div>
    //     </div>
    // );


}


//--------------------------------------------------------------------------//
//Old QREST Query for safekeeping
// Just paste in the place of the new query if need to go back. No other edits should be needed

// {
//     "function_name": ".dataaccess.qrest",
//     "arguments":{
//     "tablename":"trade",
//     "starttime":".z.d+00:00",
//     "endtime":".z.p",
//     "freeformby":"sym",
//     "freeformcolumn":"lastPrice:(last price), diffPrice:((last price)-(1#(-2#price)))"
//     }
//     }
