import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import GetResult from "./get";
import { graphTickValues, graphXFormat, graphXTicks, themeGraph } from "./shared/graphVariables";
import ConvertData from "./shared/graphFunctions.js"

/* 
    (Conor's Volatility Graph)
*/

// function ConvertData(result){
//     /*
//         This function is needed to sort the data into a format readable by nivo
//         (See exampleData above)
    
//         Looping through results,
//         getting unique syms,
//         sorting each unique sym into its own object,
//         appending x (Time) and y's (devPrice) relating to that sym into that object's data array

//         (Works because the results are ordered by sym)
//     */

//     const [data, setData] = useState(null)

//     useEffect(() => {
//         // To avoid errors if result is still being loaded
//         if (result !== null){
//             var lastSym = "_"       // This is just to initialise the lastSym variable
//             var symList = []        // Initialising list of symbols, the id part of each object
//             var symCounter = -1     // Starts at -1 as it corresponds to the index of the current sym
//             var xyListCounter = 0   // Keeps track of the xyList index that the loop is on
//             var xyList = []         // Array of x and y's for the data part of each object

//             result = result.sort(function(a, b){
//                 if(a.sym < b.sym) { return -1; }
//                 if(a.sym > b.sym) { return 1; }
//                 return 0;
//             })

//             // Looping through all items in results
//             for (var i = 0; i < result.length; i++) {
//                 // First time finding this sym
//                 if (result[i].sym !== lastSym) {
//                     // Incrementing symCounter, resetting xyListCounter and emptying xyList
//                     symCounter++
//                     xyListCounter = 0
//                     xyList = []

//                     // Setting first element of xylist to this item's dat & incrementing xyListCounter
//                     xyList[xyListCounter] = {x:result[i].time, y:result[i].avgsPrice}
//                     xyListCounter++

//                     // Adding id (sym) and data (xyList) to symList at index symCounter
//                     symList[symCounter] = {id: result[i].sym, data:xyList}

//                     // Updating lastSym to be this new symbol
//                     lastSym = result[i].sym
//                 }
//                 // Other times finding same sym
//                 else {
//                     // Setting element of xylist to this item's dat at index xyListCounter
//                     xyList[xyListCounter] = {x:result[i].time, y:result[i].avgsPrice}
//                     xyListCounter++ // Incrementing xyListCounter

//                     // Adding id (unchanged) and data (updated) to symList at index symCounter
//                     symList[symCounter] = {id:symList[symCounter].id, data:xyList}
                    
//                 }
//             }
//             // Setting data variable to the symList created
//             setData(symList)
//         }
        
//     }, [result]) // Rerunning only if result changes

//     return data
// }

// Exported graph component
const Graph = () => {
    // Getting result from qRest query
    const {result, loading, error} = GetResult();

    // Converting result to be readable by nivo
    const data = ConvertData(result, "avgsPrice")

    // If still loading data
    if (loading) return <h1>Loading...</h1>

    // Else if an error has occurred
    else if (error) console.log(error)

    // Otherwise...
    else
    // (className set for the plot so that it can be styled in 'App.css' by referring to that name)
    return (
        <div>
        <h2 className="Heading" >Running Average Price</h2>
        <div className="plot">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L%Z", type: "time" }}
                xFormat={graphXFormat}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues:graphTickValues,
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    format: graphXTicks,
                    tickRotation: 0,
                    legend: 'Time',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                gridXValues={graphTickValues}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Running Average Price',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{scheme: themeGraph}}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
        </div>
    );
}
 
export default Graph;