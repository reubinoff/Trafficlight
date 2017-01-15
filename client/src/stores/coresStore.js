import { EventEmitter } from "events"
import dispatcher from '../dispatcher'

class CoresStore extends EventEmitter {

    constructor() {

        super();

        this.cores = [];

    }

    getAll() {
        return this.cores;
    }



    UpdateStatus(cores) {
        this.cores = cores;
        this.emit("change");
    }

    handleActions(action) {
        switch (action.type) {
            case "RECEIVE_CORES": {
                this.UpdateStatus(action.cores);
                break;
            }
            case "CORE_PUT": {
                var result = action.result;
                if (result === true) {
                    this.emit("core_added", action.id);
                } else {
                    this.emit("core_reject", action.err);
                }

                this.UpdateStatus(action.cores);
                break;
            }
            case "CORE_DELETE": {
                var result_delete = action.n
                if (result_delete === 1) {
                    this.emit("core_deleted");
                } else {
                    this.emit("general_operation_result", action.err);
                }
                break;
            }
            default: {

            }
        }
    }
}



// 0 - Connected
// 1 - Disconnected

const coresStore = new CoresStore();
dispatcher.register(coresStore.handleActions.bind(coresStore));
window.dis = dispatcher; //dis.dispatch({type: "CMTS_STATUS_CHANGE", text:"1"})
export default coresStore;