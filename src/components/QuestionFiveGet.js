//------------------------------------------------------------------
// QuestionFiveGet
// Gets the data for Question 5 of the webdev project
//------------------------------------------------------------------

//***********************************************/
// Importing modules
//***********************************************/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {showLoading} from "./shared/showLoading";
import {showError} from "./shared/showError";

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
    
    // Errors
    const [errorOne, setErrorOne] = useState(false);
    const [errorTwo, setErrorTwo] = useState(false);
    const [errorThree, setErrorThree] = useState(false);

    // const prevSeven = usePrevious(outIdThree);

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
         try {
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

             // catch error
            } catch(error){
                //console.log(error.response.data.error)
                setErrorOne(true)
                }

         };


    //----------------------------------------------------------------------------------------------------
    // call second - last day, need to use hdb
    //----------------------------------------------------------------------------------------------------
    const fetchDataTwo = async () => {
         try {
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
             
            
            // failsafe for errors
            // .then((response) => {
            //     if(response!=error) {
            //         seterrorTwo(true)
            //     }
            // }
            

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

        // catch error    
        } catch(error){
            //console.log(error.response.data.error)
            setErrorTwo(true)
            }

         };


        //---------------------------------------------------------------------------------------------------- 
        // call third - last week, need to use hdb
        //----------------------------------------------------------------------------------------------------
         const fetchDataThree = async () => {
             try {
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

            // catch error    
            } catch(error){
                //console.log(error.response.data.error)
                setErrorThree(true)
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
        }, 3 * 1000) // time is in miliseconds, 10 seconds
        return () => {
        clearInterval(interval)
        }
     
}, []);


// Error Messages

if (errorOne) {return showError}
else if (errorTwo) {return showError}
else if (errorThree) {return showError}

// Don't continue until data has been loaded
// if (loadingOne) {
//     return <div className="App">Loading...</div>;
//    }
//    else if (loadingTwo) {
//     return <div className="App">Loading...</div>;
//    }
//    else if (loadingThree) {
//     return <div className="App">Loading...</div>;
//    }

   if (loadingOne) {return showLoading}
   else if (loadingTwo) {return showLoading}
   else if (loadingThree) {return showLoading}


    // console.log(outIdOne); // log the data to the console
    // console.log(outIdTwo); // log the data to the console
     console.log(outIdThree); // log the data to the console

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

const fsize = 22;
const fsize_date=16;
const msize = 5;
const hcolor = '#FF715B'

    const plottable = () => {

    const today = new Date()
    
    // get time periods
    const hourAgo= new Date(today)
    hourAgo.setHours(hourAgo.getDate() - 1)
    const dayAgo= new Date(today)
    dayAgo.setDate(dayAgo.getDate() - 1)
    const weekAgo= new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    
    return (

            // Box styling elements
            <Box className="Q5"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 310,
                height: 300,
                margin: 'auto',
                },
            }}
            >

            {/* Paper for past hour */}
            <Paper elevation={3} >

                <Typography  variant="h5" component="div" align="center" gutterBottom="false" mt={msize} color={hcolor} fontWeight="bold" >
                    Past Hour
                    </Typography>
                    <br/>

                    <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize} fontStyle='italic'>
                    Sym: {outIdOne[0].sym}
                    </Typography>
                    <br/>
                    
                    <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize} >
                    Size: {Number((outIdOne[0].size).toPrecision(5))}
                    </Typography>
                    <br/>
                                    
                    <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize_date} fontStyle='italic'>
                    {/* Period From: {new Date().toLocaleString()} to {hourAgo.toLocaleString()}  */}
                    Counter Started at: {hourAgo.toLocaleString()}
                    </Typography>
                   

            </Paper>


            {/* Paper for past day */}
            <Paper elevation={3} >

                <Typography variant="h5" component="div" align="center" gutterBottom="false" mt={msize} color={hcolor} fontWeight="bold" >
                    Past Day                
                </Typography>
                <br/>

                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize} fontStyle='italic'>
                    Sym: {outIdTwo[0].sym}
                </Typography>
                    <br/>
                
                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize} >
                    Size: {Number((outIdTwo[0].size).toPrecision(5))}
                </Typography>
                <br/>
                                
                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize_date} fontStyle='italic'>
                    {/* Period From: {new Date().toLocaleString()} to {dayAgo.toLocaleString()}  */}
                    Counter Started at: {dayAgo.toLocaleString()}
                    </Typography>
                    


            </Paper>

            {/* Paper for past week */}
            <Paper elevation={3} >

                <Typography variant="h5" component="div" align="center" gutterBottom="false" mt={msize} color={hcolor} fontWeight="bold" >
                    Past Week
                </Typography>
                    <br/>

                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize} fontStyle='italic' >
                    Sym: {outIdThree[0].sym}
                </Typography>    
                    <br/>

                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize} >
                    Size: {Number((outIdThree[0].size).toPrecision(5))}
                </Typography>
                <br/>
                
                <Typography variant="body1" component="div" align="center" gutterBottom="false" fontSize={fsize_date} fontStyle='italic'>
                {/* Period From: {new Date().toLocaleString()} to {weekAgo.toLocaleString()}  */}
                Counter Started at: {weekAgo.toLocaleString()}
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
          {/* <br/> */}

          <h5>Last Updated At: {Date().toLocaleString()}</h5>

          {plottable()}

          <br/>

          </div>    
        );
    


}

