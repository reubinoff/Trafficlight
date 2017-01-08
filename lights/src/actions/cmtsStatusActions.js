import dispatcher from '../dispatcher'
import * as  globalActions from './globalActions'

export function cmtsConnected(loginParams) {
    // Dend Connect request and after: 
    globalActions.cmtsConnect(loginParams, function (res) {
        //generate  and check if connected
        var status = 0
        dispatcher.dispatch({
            type: "CMTS_STATUS_CHANGE",
            text: {status}
        });
    });

}
export function cmtsDisonnected() {

    dispatcher.dispatch({
        type: "CMTS_STATUS_CHANGE",
        text: "1"
    })
}
