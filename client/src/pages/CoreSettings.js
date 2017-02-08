
import React, { Component } from 'react';
import coresStore from '../stores/coresStore'
import * as CoreActions from "../actions/coresAction";
import CoreListItem from "../components/coreServer/CoreListItem";
import CoreFullForm from "../components/coreServer/coreFullForm";


let styles = {
  divide: {
    'borderRight': ' 1px solid #ccc',
    'paddingRight': '10px',
    'marginRight': '-10px'
  },
  form_row: {
    'overflowY': 'scroll',
    'maxHeight': '400px'
  }
}

class CoreSettings extends Component {
  constructor() {
    super();
    ;

    this.state = {
      cores: coresStore.getAll(),
      activeId: 0,
      selectedCore: ""
    };

    this.getCores = this.getCores.bind(this);
    this._onListItemClick = this._onListItemClick.bind(this)
    this._onCoreDeleted = this._onCoreDeleted.bind(this)
    this._onOperationFailed = this._onOperationFailed.bind(this)
    this._onCoreUpdated=this._onCoreUpdated.bind(this);
  }
  componentWillMount() {
    coresStore.on("change", this.getCores);
    coresStore.on("core_deleted", this._onCoreDeleted);
    coresStore.on("core_updated", this._onCoreUpdated);
    coresStore.on("general_operation_result", this._onOperationFailed);
  }
  componentWillUnmount() {
    coresStore.removeListener("change", this.getCores);
    coresStore.removeListener("core_deleted", this._onCoreDeleted);
    coresStore.removeListener("core_updated", this._onCoreUpdated);
    coresStore.removeListener("general_operation_result", this._onOperationFailed);
  }

  _onCoreUpdated(){
    alert ("Core updated!")
     this.reloadCores()
  }
  _onCoreDeleted() {
    alert("Core deletion succeed");
    var selectedCore = <div />
    this.setState({ selectedCore });
    this.reloadCores()
  }
  _onOperationFailed(err) {
    alert("Operation Failed\n" + err);

  }

  getCores() {
    this.setState({
      cores: coresStore.getAll(),
    });
  }
  reloadCores() {
    CoreActions.reloadCores();
  }
  _onListItemClick(e) {
    const item = this.state.cores.find((core) => core._id === e.target.id)
    if (item) {
      var selectedCore = <CoreFullForm key={item._id} {...item} />
      this.setState({ selectedCore });
    }

  }

  render() {
    const { cores } = this.state;

    const CoreComponents = cores ? cores.map((core) => {
      return <CoreListItem key={core._id} activeID={this.state.activeId} onClick_={this._onListItemClick} {...core} />;
    }) : [];
    return (
      <div>
        <h1>Core settings</h1>
        <div className="row">
          <div className="col-sm-3" style={styles.divide} >
            <div className="list-group" style={styles.form_row}>
              {CoreComponents.sort()}
            </div>
            <button type='button' className='btn btn-success' onClick={this.reloadCores.bind(this)}>
              <i className='glyphicon glyphicon-repeat'  ></i>
            </button>
          </div>
          <div className="col-sm-7">
            {this.state.selectedCore}
          </div>
        </div>
      </div>
    );
  }
}

export default CoreSettings;
