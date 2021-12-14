import React, { useState } from "react";
import GetResult from "./get";
import { ConvertData, ShowGraph } from "./shared/graphFunctions.js";
import {showLoading} from "./shared/showLoading";
import { Tab, Tabs } from '@mui/material';

/* 
    (Conor's Running Averages Graph)
*/

// // Exported graph component
// const Graph = () => {
//     // Getting result from qRest query
//     const {result, loading, error} = GetResult();

//     // Converting result to be readable by nivo
//     const data = ConvertData(result, "avgsPrice")

//     // If still loading data
//     if (loading) return showLoading

//     // Else if an error has occurred
//     else if (error) console.log(error)

//     // Otherwise...
//     else
//     // (className set for the plot so that it can be styled in 'App.css' by referring to that name)
//     return (
//         <div>
//         <h2 className="Heading" >Running Average Price</h2>
//         <div className="plot">
//             <ResponsiveLine
//                 data={data}
//                 margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                 xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L%Z", type: "time" }}
//                 xFormat={graphXFormat}
//                 yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
//                 axisTop={null}
//                 axisRight={null}
//                 axisBottom={{
//                     tickValues:graphTickValues,
//                     orient: 'bottom',
//                     tickSize: 5,
//                     tickPadding: 5,
//                     format: graphXTicks,
//                     tickRotation: 0,
//                     legend: 'Time',
//                     legendOffset: 36,
//                     legendPosition: 'middle'
//                 }}
//                 gridXValues={graphTickValues}
//                 axisLeft={{
//                     orient: 'left',
//                     tickSize: 5,
//                     tickPadding: 5,
//                     tickRotation: 0,
//                     legend: 'Running Average Price',
//                     legendOffset: -40,
//                     legendPosition: 'middle'
//                 }}
//                 colors={{scheme: themeGraph}}
//                 pointSize={10}
//                 pointColor={{ theme: 'background' }}
//                 pointBorderWidth={2}
//                 pointBorderColor={{ from: 'serieColor' }}
//                 pointLabelYOffset={-12}
//                 useMesh={true}
//                 theme={{
//                     legends: { hidden: { text: { textDecoration: 'line-through' } } },
//                 }}
//                 legends={[
//                     {
//                         anchor: 'bottom-right',
//                         direction: 'column',
//                         justify: false,
//                         translateX: 100,
//                         translateY: 0,
//                         itemsSpacing: 0,
//                         itemDirection: 'left-to-right',
//                         itemWidth: 80,
//                         itemHeight: 20,
//                         itemOpacity: 0.75,
//                         toggleSerie: true,
//                         symbolSize: 12,
//                         symbolShape: 'circle',
//                         symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                         effects: [
//                             {
//                                 on: 'hover',
//                                 style: {
//                                     itemBackground: 'rgba(0, 0, 0, .03)',
//                                     itemOpacity: 1
//                                 }
//                             }
//                         ]
//                     }
//                 ]}
//             />
//         </div>
//         </div>
//     );
// }
 
// export default Graph;

// Exported graph component
const Graph = () => {
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
        {(dayRange == 1) && !loading1 && !error1 && ShowGraph(data1, tickValues1)}

        {(dayRange == 3) && loading3 && showLoading}
        {(dayRange == 3) && !loading3 && error3 && console.log(error3)}
        {(dayRange == 3) && !loading3 && !error3 && ShowGraph(data3, tickValues3)}

        {(dayRange == 5) && loading5 && showLoading}
        {(dayRange == 5) && !loading5 && error5 && console.log(error5)}
        {(dayRange == 5) && !loading5 && !error5 && ShowGraph(data5, tickValues5)}
        </div>
    );
}
 
export default Graph;