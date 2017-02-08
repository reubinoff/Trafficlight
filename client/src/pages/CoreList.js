
import React, { Component } from 'react';
import coresStore from '../stores/coresStore'
import * as CoreActions from "../actions/coresAction";
import Core from "../components/coreServer/core";

class CoreList extends Component {
    constructor() {
        super();
        this.onClickRow.bind(this.onClickRow);
        this.getCores = this.getCores.bind(this);
        this.reloadCores = this.reloadCores.bind(this);
        this.timer = {};
        this.state = {
            cores: coresStore.getAll(),
            timer:-1
        };

    }
    startTimer() {
        var timer = setInterval(this.reloadCores, 3000);
        this.setState({timer})
    }
    componentWillMount() {
        coresStore.on("change", this.getCores);
        this.startTimer();

    }
    componentWillUnmount() {
        coresStore.removeListener("change", this.getCores);
        clearInterval(this.state.timer);
    }
    getCores() {
        this.setState({
            cores: coresStore.getAll(),
        });
    }
    reloadCores() {
        CoreActions.reloadCores();
    }

    onClickRow(e) {
        console.log(e.target)
    }
    render() {

        const { cores } = this.state;

        const CoreComponents = cores ? cores.map((core) => {
            return <Core key={core._id} {...core} />;
        }) : []
        return (
            <div>
                <h1>Cores List</h1>

                <table width="1000" className="table table-striped"  >
                    <thead className="thead-inverse">
                        <tr>
                            <th>IP</th>
                            <th>Port</th>
                            <th>Socket</th>
                            <th>SSH</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody onClick={this.onClickRow}>
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
