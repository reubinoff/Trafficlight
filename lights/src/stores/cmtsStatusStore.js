// import { EventEmitter } from "events"
// import dispatcher from '../dispatcher'

// class CmtsStatus extends EventEmitter {

//     constructor() {

//         super();

//         const CONNECTED = 0;
//         // const DISCONNECTED = 1;

//         this.status = CONNECTED;
//     }

//     UpdateStatus(status_) {
//         this.status = status_;
//         this.emit("change");
//     }

//     GetStatus() {
//         return this.status;
//     }

//     handleActions(action) {
//         switch (action.type) {
//             case "CMTS_STATUS_CHANGE": {
//                 this.UpdateStatus(action.text);
//                 break;
//             }
//             default:{

//             }
//         }
//     }
// }



// // 0 - Connected
// // 1 - Disconnected

// const cmtsStatusStore = new CmtsStatus();
// dispatcher.register(cmtsStatusStore.handleActions.bind(cmtsStatusStore));
// window.dis = dispatcher; //dis.dispatch({type: "CMTS_STATUS_CHANGE", text:"1"})
// export default cmtsStatusStore;