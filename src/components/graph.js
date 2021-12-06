import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import GetResult from "./getData";

// Graph function
const PlotLineGraph = ({ res }) => (
    <ResponsiveLine
        data={res}
        width={500}
        height={500}
    />
)

const exampleData = [
    {
      id: "Data",
      data: [
        { x: 1, y: 130 },
        { x: 2, y: 165 },
        { x: 3, y: -142 },
        { x: 4, y: 19 }
      ]
    },
    {
      id: "Data2",
      data: [{ x: 1, y: -30 }, { x: 2, y: 50 }, { x: 3, y: -12 }, { x: 4, y: 28 }]
    }
];

function ConvertData(result){
    const [data, setData] = useState(null)

    useEffect(() => {
        if (result != null){
            var items = Array(result.length);

            items.fill(null);

            for (var i = 0; i < result.length; i++) {
                items[i] = {id: result[i].sym, data: [{x: result[i].time, y:result[i].devPrice}]};
            }

            setData(items)
        }
        
    }, [result])

    return data
}


function ConvertDataNew(result){
    /*
        Looping through results,
        getting unique syms,
        sorting each unique sym into its own object,
        adding x and y's relating to that sym into that object

        (Works because the results are ordered by sym)
    */

    const [data, setData] = useState(null)

    useEffect(() => {
        if (result != null){
            var lastSym = "_"
            var symList = []
            var symCounter = -1
            var coordsCounter = 0
            var coordsList = []

            for (var i = 0; i < result.length; i++) {
                // First time finding sym
                if (result[i].sym != lastSym) {
                    symCounter++
                    coordsCounter = 0
                    coordsList = []
                    coordsList[0] = {x:result[i].time, y:result[i].devPrice}
                    symList[symCounter] = {id: result[i].sym, data:coordsList}
                    lastSym = result[i].sym
                }
                // Other times finding same sym
                else {
                    coordsList[coordsCounter] = {x:result[i].time, y:result[i].devPrice}
                    symList[symCounter] = {id:symList[symCounter].id, data:coordsList}
                    coordsCounter++
                }
            }

            setData(symList)
        }
        
    }, [result])

    return data
}

// Exporting graph
const Graph = () => {
    const {result, loading, error} = GetResult();

    const data = ConvertDataNew(result)

    if (loading) return <h1>Loading...</h1>
    else if (error) console.log(error)
    else
    return (
        <div className="plot">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                axisTop={null}
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
    );
}
 
export default Graph;