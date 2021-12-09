import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import GetResult from "./get";
import { graphTickValues, graphXFormat, graphXTicks, themeGraph } from "./shared/graphVariables";
import ConvertData from "./shared/graphFunctions.js"

/* 
    (Conor's Running Averages Graph)
*/

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