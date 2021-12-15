import React, { useState } from "react";
import GetResult from "./get";
import { ConvertData, ShowGraph } from "./shared/graphFunctions.js";
import {showLoading} from "./shared/showLoading";
import { Tab, Tabs } from '@mui/material';

/* 
    (Conor's Running Averages Graph)
*/

// Exported graph component
const Graph = () => {
    const yLabel = "Running Average Price"
    const yLabelShort = "R. Avg Price"

    // Date Range Choice
    const [dayRange, setDayRange] = useState(1)

    ///// For 24 hr
    // Getting result from qRest query
    const {result:result1, loading:loading1, error:error1, graphTickValues:tickValues1} = GetResult(1);

    // Converting result to be readable by nivo
    const data1 = ConvertData(result1, "avgsPrice")

    ///// For 3 days
    // Getting result from qRest query
    const {result:result3, loading:loading3, error:error3, graphTickValues:tickValues3} = GetResult(3);

    // Converting result to be readable by nivo
    const data3 = ConvertData(result3, "avgsPrice")

    ///// For 5 days
    // Getting result from qRest query
    const {result:result5, loading:loading5, error:error5, graphTickValues:tickValues5} = GetResult(5);

    // Converting result to be readable by nivo
    const data5 = ConvertData(result5, "avgsPrice")

    // Otherwise...    
    // (className set for the plot so that it can be styled in 'App.css' by referring to that name)
    return (
        <div>
        <h2 className="Heading" >Running Average Price</h2>
        <Tabs
          value={dayRange}
          onChange={(event, newValue) => {setDayRange(newValue)}}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          centered
          variant='fullWidth'
        >
          <Tab value={1} label="24 hr" wrapped={true}/>
          <Tab value={3} label="3 Days" wrapped={true} />
          <Tab value={5} label="5 Days" wrapped={true}/>
        </Tabs>
        {(dayRange == 1) && loading1 && showLoading}
        {(dayRange == 1) && !loading1 && error1 && console.log(error1)}
        {(dayRange == 1) && !loading1 && !error1 && ShowGraph(data1, tickValues1, yLabel, yLabelShort)}

        {(dayRange == 3) && loading3 && showLoading}
        {(dayRange == 3) && !loading3 && error3 && console.log(error3)}
        {(dayRange == 3) && !loading3 && !error3 && ShowGraph(data3, tickValues3, yLabel, yLabelShort)}

        {(dayRange == 5) && loading5 && showLoading}
        {(dayRange == 5) && !loading5 && error5 && console.log(error5)}
        {(dayRange == 5) && !loading5 && !error5 && ShowGraph(data5, tickValues5, yLabel, yLabelShort)}
        </div>
    );
}
 
export default Graph;