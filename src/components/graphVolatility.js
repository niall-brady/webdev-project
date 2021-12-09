import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import GetVolResult from "./getData";

/* 
    (Niall's Volatility Graph)
*/

// const exampleData = [
//     {
//       id: "sym1",
//       data: [
//         { x: 1, y: 130 },
//         { x: 2, y: 165 },
//         { x: 3, y: -142 },
//         { x: 4, y: 19 }
//       ]
//     },
//     {
//       id: "sym2",
//       data: [{ x: 1, y: -30 }, { x: 2, y: 50 }, { x: 3, y: -12 }, { x: 4, y: 28 }]
//     }
// ];

function ConvertData(result){
    /*
        This function is needed to sort the data into a format readable by nivo
        (See exampleData above)
    
        Looping through results,
        getting unique syms,
        sorting each unique sym into its own object,
        appending x (Time) and y's (devPrice) relating to that sym into that object's data array
    */

    const [data, setData] = useState(null)

    useEffect(() => {
        // To avoid errors if result is still being loaded
        if (result !== null){
            var lastSym = "_"       // This is just to initialise the lastSym variable
            var symList = []        // Initialising list of symbols, the id part of each object
            var symCounter = -1     // Starts at -1 as it corresponds to the index of the current sym
            var xyListCounter = 0   // Keeps track of the xyList index that the loop is on
            var xyList = []         // Array of x and y's for the data part of each object

            result = result.sort(function(a, b){
                if(a.sym < b.sym) { return -1; }
                if(a.sym > b.sym) { return 1; }
                return 0;
            })

            // Looping through all items in results
            for (var i = 0; i < result.length; i++) {
                // First time finding this sym
                if (result[i].sym !== lastSym) {
                    // Incrementing symCounter, resetting xyListCounter and emptying xyList
                    symCounter++
                    xyListCounter = 0
                    xyList = []

                    // Setting first element of xylist to this item's dat & incrementing xyListCounter
                    xyList[xyListCounter] = {x:result[i].time, y:(result[i].devPrice).toFixed(2)}
                    xyListCounter++

                    // Adding id (sym) and data (xyList) to symList at index symCounter
                    symList[symCounter] = {id: result[i].sym, data:xyList}

                    // Updating lastSym to be this new symbol
                    lastSym = result[i].sym
                }
                // Other times finding same sym
                else {
                    // Setting element of xylist to this item's dat at index xyListCounter
                    xyList[xyListCounter] = {x:result[i].time, y:(result[i].devPrice).toFixed(2)}
                    xyListCounter++ // Incrementing xyListCounter

                    // Adding id (unchanged) and data (updated) to symList at index symCounter
                    symList[symCounter] = {id:symList[symCounter].id, data:xyList}
                }
            }
            // Setting data variable to the symList created
            setData(symList)
        }
        
    }, [result]) // Rerunning only if result changes

    return data
}

// Exported graph component
const GraphVolatility = () => {
    // Getting result from qRest query
    const {result, loading, error} = GetVolResult();

    // Converting result to be readable by nivo
    const data = ConvertData(result)

    // If still loading data
    if (loading) return <h1>Loading...</h1>

    // Else if an error has occurred
    else if (error) console.log(error)

    // Otherwise...
    else
    // (className set for the plot so that it can be styled in 'App.css' by referring to that name)
    return (
        <div>
        <h2 className="Heading" >Volatility Graph</h2>
        <div className="plot">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto'
                }}
                xFormat="time:%Y-%m-%dT%H:%M:%S"
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                axisTop={null}
                colors={{scheme: 'nivo'}}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Time',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Standard Deviation of Price',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
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
 
export default GraphVolatility;