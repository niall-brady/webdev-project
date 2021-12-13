//------------------------------------------------------------------
// QuestionFiveGet
// Gets the data for Question 5 of the webdev project
//------------------------------------------------------------------

//***********************************************/
// Importing modules
//***********************************************/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// MUI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';


//***************************************************************************/
// set up function and export that gets the data, called in QuestionFourPlot
//***************************************************************************/

export default function QuestionFiveGet() {
 
    // define constants for async calls.  -------------------------------------
     
    const url = "https://localhost:8091/executeFunction";
    const [outIdOne, setOutIdOne] = useState([]);
    const [loadingOne, setLoadingOne] = useState(true);
    const [outIdTwo, setOutIdTwo] = useState([]);
    const [loadingTwo, setLoadingTwo] = useState(true);
    const [outIdThree, setOutIdThree] = useState([]);
    const [loadingThree, setLoadingThree] = useState(true);
    
    let authen = {
        username: "user",
        password: "pass"
        },
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "BASIC dXNlcjpwYXNz"
        };


    //****************************************************************************************************/
    // Define async calls
    //****************************************************************************************************/

    //----------------------------------------------------------------------------------------------------
    // call first async axios post - last hour, use rdb
    //----------------------------------------------------------------------------------------------------
    const fetchDataOne = async () => {
        // try {
             const response  = await axios.post(url,
             {
                 "function_name": "string",
                 "arguments": { "db": "rdb",
                 "query":"1#desc select (sum size) by sym from trade where time within (.z.p-01:00;.z.p)"
                 }
                 },
                         {
                             auth: authen
                         }
                         );        
            // console log --------
            //console.log(response.data.result);
 
            // define variables ------------------------------------------//
             setOutIdOne(response.data.result);
             setLoadingOne(false);
         };


    //----------------------------------------------------------------------------------------------------
    // call second - last day, need to use hdb
    //----------------------------------------------------------------------------------------------------
    const fetchDataTwo = async () => {
        // try {
             const response  = await axios.post(url,
             {
                 "function_name": "string",
                 "arguments": { "db": "hdb",
                 "query":"1#desc select (sum size) by sym from trade where time within (.z.p-24:00;.z.p)"
                 }
                 },
                         {
                             auth: authen
                         }
                         );        
            // console log --------
            //console.log(response.data.result);

            // failsafe if null
            if (response.data.result[0].size === null) {
                setOutIdTwo([{size:0, sym:"N/A"}])
                setLoadingTwo(false)
            }
            // define variables ------------------------------------------//
            else{
                setOutIdTwo(response.data.result);
                setLoadingTwo(false);
            }
         };

        //---------------------------------------------------------------------------------------------------- 
        // call third - last week, need to use hdb
        //----------------------------------------------------------------------------------------------------
         const fetchDataThree = async () => {
            // try {
                 const response  = await axios.post(url,
                 {
                     "function_name": "string",
                     "arguments": { "db": "hdb",
                     "query":"1#desc select (sum size) by sym from trade where time within (.z.p-07D00:00;.z.p)"
                     }
                     },
                             {
                                 auth: authen
                             }
                             );        
                // console log --------
                //console.log(response.data.result);

                // failsafe if null
                if (response.data.result[0].size === null) {
                    setOutIdThree([{size:0, sym:"N/A"}])
                    setLoadingThree(false)
                }
                // define variables ------------------------------------------//
                else {
                    setOutIdThree(response.data.result);
                    setLoadingThree(false);
                }
             };

     
 
    //------------------------------------------------------------------------------

    //********************************************************************/
    // set up UseEffect/React Hook to perform each axios post request
    //********************************************************************/

    useEffect(() => {
       let interval // set up the refresh interval
      
        fetchDataOne(); // calls the async axios post to start with
        fetchDataTwo();
        fetchDataThree();
        
        // defines in ms when the data will refresh
        interval = setInterval(() => {
        fetchDataOne();
        fetchDataTwo();
        fetchDataThree();
        }, 3 * 1000) // time is in miliseconds
        return () => {
        clearInterval(interval)
        }
     
}, []);

// Don't continue until data has been loaded
if (loadingOne) {
    return <div className="App">Loading...</div>;
   }
   else if (loadingTwo) {
    return <div className="App">Loading...</div>;
   }
   else if (loadingThree) {
    return <div className="App">Loading...</div>;
   }

    // console.log(outIdOne); // log the data to the console
    // console.log(outIdTwo); // log the data to the console
    // console.log(outIdThree); // log the data to the console

    // I cannot get the outputs to export correctly, therefore have done plotting below
   // return (outIdOne,loadingOne,outIdTwo,loadingTwo,outIdThree,loadingThree); //return the outputs, mute if plotting



//**************************************************************************//    
// BELOW IS PLOTTING. DO NOT USE QUESTIONFIVEPLOT.
//**************************************************************************//  


//--------------------------------------------------------------
// Basic Plot - Text to screen
//--------------------------------------------------------------
    // return (
    //     <div className="card text-center m-3">
    //         <h5 className="card-header">Highest Traded Instrument</h5>
    //         <div className="card-body">
    //             {JSON.stringify(outIdOne)}
    //             {JSON.stringify(outIdTwo)}
    //             {JSON.stringify(outIdThree)}
    //            <div> Returned sym: {outIdOne[0].sym} </div>
    //             {/* Returned Sym: {symId}
    //             <div> Returned Average Price: {avgPriceId}  </div> */}
    //             {/* <div> Returned Max Ask: {maxAskId} </div>
    //             <div> Returned Min Ask: {minAskId} </div> */}
    //         </div>
    //     </div>
    // );

   
//--------------------------------------------------------------
// Advancec Plot, 3 Paper MUI elements inside a MUI Box element
//--------------------------------------------------------------

    const plottable = () => {
        return (

            // Box styling elements
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 310,
                height: 250,
                margin:'auto',
                },
            }}
            >

            {/* Paper for past hour */}
            <Paper elevation={3} >

                <Typography  variant="h4" component="div" align="center" gutterBottom="false" mt={4} color='primary.main' fontWeight="bold" >
                    Past Hour
                    </Typography>
                    <br/>
                
                    <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={24} >
                    Sym: {outIdOne[0].sym}
                    </Typography>
                    <br/>
                    
                    <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={24} >
                    Size: {Number((outIdOne[0].size).toPrecision(5))}
                    </Typography>

            </Paper>


            {/* Paper for past day */}
            <Paper elevation={3} >

                <Typography variant="h4" component="div" align="center" gutterBottom="false" mt={4} color='primary.main' fontWeight="bold" >
                    Past Day                
                </Typography>
                <br/>

                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={24} >
                    Sym: {outIdTwo[0].sym}
                </Typography>
                    <br/>
                
                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={24} >
                    Size: {Number((outIdTwo[0].size).toPrecision(5))}
                </Typography>

            </Paper>

            {/* Paper for past week */}
            <Paper elevation={3} >

                <Typography variant="h4" component="div" align="center" gutterBottom="false" mt={4} color='primary.main' fontWeight="bold" >
                    Past Week
                </Typography>
                    <br/>

                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={24} >
                    Sym: {outIdThree[0].sym}
                </Typography>    
                    <br/>

                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={24} >
                    Size: {Number((outIdThree[0].size).toPrecision(5))}
                </Typography>

            </Paper>

            </Box>
        );
    }

    return (
        
        <div align="center">   
         <h2 className="Heading">
            Highest Traded Instrument
          </h2>
          {plottable()}
          </div>    
        );
    


}

