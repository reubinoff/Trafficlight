
import axios from 'axios'
// const socket = io.connect('/requests'); 


export function cmtsConnect(loginParams, cbRes) {
        return fetch('/api/connections', {
            accept: 'application/json',
            method: 'PUT',
            body:JSON.stringify({mose:'moasdasdasdsadsafdsadfsafdsfsafssfsdfsfds'})
        }).then(cbRes);


        // axios.get('/api/connections',{body:{moshe:"adada"}})
        //     .then(function (res) {
        //         cbRes(res);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }



/*
function search(query) {
  return fetch(`/api/food?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

*/
