import dispatcher from "../dispatcher"
import axios from "axios";

export function reloadCores() {
    axios.get("/api/cores")
        .then(sendResponse)
        .catch((error) => {
            printerr(error);
            sendResponse({ data: [] });
        })
}

export function AddCore(loginParams) {
    axios.put("/api/cores", loginParams)
        .then(updateOnCoreAdded)
        .catch((error) => {
            printerr(error);
            updateOnCoreReject(error);
        })
}

export function DeleteCore(id) {
    axios.delete("/api/cores/" + id)
        .then(updateOnCoreDeleted)
        .catch((error) => {
            printerr(error);
            updateOnCoreDeletedFailed(error);
        })
}

//********************************************************************************** */
///********************************   Callbacks *************************************/
//********************************************************************************** */
function printerr(error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }
}
function updateOnCoreReject(err) {
    dispatcher.dispatch(
        {
            type: "CORE_PUT",
            result: false,
            err: err
        }
    );
}
function updateOnCoreAdded(res) {
    dispatcher.dispatch(
        {
            type: "CORE_PUT",
            result: true,
            id: res.data._id
        }
    );
}
function updateOnCoreDeletedFailed(err) {
    dispatcher.dispatch(
        {
            type: "CORE_DELETE",
            n: 0,
            err:err
        }
    );
}
function updateOnCoreDeleted(res) {
    dispatcher.dispatch(
        {
            type: "CORE_DELETE",
            n: res.data.Core.n
        }
    );
}
function sendResponse(res) {
    dispatcher.dispatch(
        {
            type: "RECEIVE_CORES",
            cores: res.data
        }
    );
}

/*
"code": 200,
  "description": "",
  "id": "5872bf7f6f0179705cb21202"*/
