
import React, { Component } from 'react';
import coresStore from '../stores/coresStore'
import * as CoreActions from "../actions/coresAction";
import CoreListItem from "../components/cmts/CoreListItem";
import CoreFullForm from "../components/cmts/coreFullForm";


let styles = {
  divide: {
    'borderRight': ' 1px solid #ccc',
    'paddingRight': '10px',
    'marginRight': '-10px'
  },
  form_row: {
    'overflowY': 'scroll',
    'maxHeight': '370px'
  }
}

class CoreSettings extends Component {
  constructor() {
    super();
    this.getCores = this.getCores.bind(this);
    this._onListItemClick = this._onListItemClick.bind(this);

    this.state = {
      cores: coresStore.getAll(),
      activeId: 0,
      selectedCore: ""
    };
  }
  componentWillMount() {
    coresStore.on("change", this.getCores);

  }
  componentWillUnmount() {
    coresStore.removeListener("change", this.getCores);
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

    const CoreComponents = cores? cores.map((core) => {
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
