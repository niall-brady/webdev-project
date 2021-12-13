import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import GetVolResult from "./getData";
import { /*graphTickValues,*/ graphXFormat, graphXTicks, themeGraph } from "./shared/graphVariables";
import ConvertData from "./shared/graphFunctions.js";
import {showLoading} from "./shared/showLoading";

/* 
    (Niall's Volatility Graph)
*/

// Exported graph component
const GraphVolatility = () => {
    // Date Range Choice
    const [dayRange, setDayRange] = useState(1)

    // Getting result from qRest query
    const {result, loading, error, graphTickValues} = GetVolResult(dayRange);

    // Converting result to be readable by nivo
    const data = ConvertData(result, "devPrice")

    // If still loading data
    if (loading) return showLoading

    // Else if an error has occurred
    else if (error) console.log(error)

    // Otherwise...    
    // (className set for the plot so that it can be styled in 'App.css' by referring to that name)
    return (
        <div>
        <h2 className="Heading" >Volatility Graph</h2>
        <div className="plot">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L%Z", type: "time" }}
                xFormat={graphXFormat}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                axisTop={null}
                colors={{scheme: themeGraph}}
                axisRight={null}
                axisBottom={{
                    tickValues: graphTickValues,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: graphXTicks,
                    legend: "Time",
                    legendOffset: 36,
                    legendPosition: "middle"
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
                gridXValues={graphTickValues}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                theme={{
                    legends: { hidden: { text: { textDecoration: 'line-through' } } },
                }}
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
                        toggleSerie: true,
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