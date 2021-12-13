import {useEffect, useState} from 'react';

export default function ConvertData(result, yAxisName) {
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