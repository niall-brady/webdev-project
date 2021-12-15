import {useEffect, useState} from 'react';
import { ResponsiveLine } from '@nivo/line'
import { themeGraph, graphXFormat, graphXTicks } from './graphVariables';

function ConvertData(result, yAxisName) {
    /*
        This function is needed to sort the data into a format readable by nivo
    
        Looping through results,
        getting unique syms,
        sorting each unique sym into its own object,
        appending x (Time) and y's (devPrice or avgsPrice) relating to that sym into that object's data array
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
            var dateTime = null     // For storing the editted time variable

            result = result.sort(function(a, b){
                if(a['sym'] < b['sym']) { return -1; }
                if(a['sym'] > b['sym']) { return 1; }
                return 0;
            })

            // Looping through all items in results
            for (var i = 0; i < result.length; i++) {
                // First time finding this sym
                if (result[i]['sym'] !== lastSym) {
                    // Incrementing symCounter, resetting xyListCounter and emptying xyList
                    symCounter++
                    xyListCounter = 0
                    xyList = []

                    // Editting the format of time
                    dateTime = new Date(result[i]['time'])
                    dateTime = dateTime.toJSON()

                    // Setting first element of xylist to this item's dat & incrementing xyListCounter
                    xyList[xyListCounter] = {x:dateTime, y:(result[i][yAxisName]).toFixed(2)}
                    xyListCounter++

                    // Adding id (sym) and data (xyList) to symList at index symCounter
                    symList[symCounter] = {id: result[i]['sym'], data:xyList}

                    // Updating lastSym to be this new symbol
                    lastSym = result[i]['sym']
                }
                // Other times finding same sym
                else {
                    // Editting the format of time
                    dateTime = new Date(result[i]['time'])
                    dateTime = dateTime.toJSON()

                    // Setting element of xylist to this item's dat at index xyListCounter
                    xyList[xyListCounter] = {x:dateTime, y:(result[i][yAxisName]).toFixed(2)}
                    xyListCounter++ // Incrementing xyListCounter

                    // Adding id (unchanged) and data (updated) to symList at index symCounter
                    symList[symCounter] = {id:symList[symCounter]['id'], data:xyList}
                }
            }

            // Sorting dates properly
            xyList = []
            for (var j = 0; j < symList.length; j++) {
                xyList = symList[j].data
                xyList = xyList.sort((a, b) => {
                    return new Date(a.x).getTime() - new Date(b.x).getTime()
                })

                symList[j] = {id:symList[j].id, data:xyList}
            }

            // Setting data variable to the symList created
            setData(symList)
        }
        
    }, [result]) // Rerunning only if result changes

    return data
}

const ShowGraph = function ShowGraph(data, graphTickValues) {
    var yLabel = "Standard Deviation of Price"
    var yLabelShort = "Std Price"
    var xLabel = "Time"
    var xLabelShort = "Time"
    return (
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
                //colors={{scheme: themeGraph}}
                colors={themeGraph}
                colorBy="index"
                tooltip={(input) => {
                    var sym = input.point.serieId
                    var pointX = input.point.data.xFormatted
                    var pointY = input.point.data.yFormatted
                    return (
                    <div className="plotToolTip">
                        <p><span className="plotToolTipSpan">Sym:</span> {sym}</p>
                        <p><span className="plotToolTipSpan">{xLabelShort}:</span> {pointX}</p>
                        <p><span className="plotToolTipSpan">{yLabelShort}:</span> {pointY}</p>
                    </div>
                  )}}
                axisRight={null}
                axisBottom={{
                    tickValues: graphTickValues,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: graphXTicks,
                    legend: xLabel,
                    legendOffset: 40,
                    legendPosition: "middle"
                  }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: yLabel,
                    legendOffset: -50,
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
                    fontSize: 14,
                    axis: {legend:{text:{fontSize: 20}}}
                    }
                }
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
        </div>)
}

export default ShowGraph
export {ConvertData, ShowGraph}