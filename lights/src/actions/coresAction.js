import dispatcher from "../dispatcher"
import axios from "axios";

export function reloadCores() {
    axios.get("/api/cores")
        .then(sendResponse)
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            var res = {data:[]};
            
            sendResponse(res);
        })



}
function sendResponse(res) {

    dispatcher.dispatch(
        {
            type: "RECEIVE_CORES",
            cores: res.data
        }
    );
}


