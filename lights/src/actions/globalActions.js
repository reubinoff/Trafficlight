
import axios from 'axios'
// const socket = io.connect('/requests'); 


export function cmtsConnect(loginParams, cbRes) {
    axios.get('/api/connect',{params: {loginParams}})
        .then(function (res) {
            console.log(res);
            cbRes(res);
        })
        .catch(function (error) {
            console.log(error);
        });

}
