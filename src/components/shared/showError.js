//showError

//use same format as showLoading
const showError = (
    <div align="center"> 
        <h2 className="Loading">
            Network Error! No data to show as unable to contact qREST
            <br/>
            Disconnected At: {Date().toLocaleString()}
         </h2> 
    </div> 
)

export {showError}