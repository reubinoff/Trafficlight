
import React, { Component } from 'react';
import coresStore from '../stores/coresStore'
import * as CoreActions from "../actions/coresAction";
import Core from "../components/cmts/core";

class CoreList extends Component {
    constructor() {
        super();

        this.getCores = this.getCores.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.timer={};
        this.state = {
            cores: coresStore.getAll(),
        };

    }
    startTimer() {
         this.timer = setInterval(this.reloadCores,  3000);
    }
    componentWillMount() {
        coresStore.on("change", this.getCores);
        this.startTimer();
        
    }
    componentWillUnmount() {
        coresStore.removeListener("change", this.getCores);
        clearInterval(this.timer);
    }
    getCores() {
        this.setState({
            cores: coresStore.getAll(),
        });
    }
    reloadCores() {
        CoreActions.reloadCores();
    }

    render() {

        const { cores } = this.state;

        const CoreComponents = cores.map((core) => {
            return <Core key={core._id} _id={core._id} port={core.port} ip={core.ip} />;
        });
        return (
            <div>
                <h1>Cores List</h1>
                <table className="table table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th>ID</th>
                            <th>IP</th>
                            <th>Port</th>
                            <th>Connected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CoreComponents}
                    </tbody>
                </table>
                <button type='button' className='btn btn-success' onClick={this.reloadCores.bind(this)}>
                    <i className='glyphicon glyphicon-repeat'  ></i>
                </button>

            </div>
        );

    }
}

export default CoreList;
