
import React, { Component } from 'react';
import CmtsLogin from '../components/cmts/CmtsLoginArea'
import * as coresAction from '../actions/coresAction'
import coresStore from '../stores/coresStore'

class Settings extends Component {

  constructor() {
    super();
    this.OnAddCoreSubmit = this.OnAddCoreSubmit.bind(this)
    this.onCoreAdded = this.onCoreAdded.bind(this);
    this.onCoreReject = this.onCoreReject.bind(this);
  }
  componentWillMount() {
    coresStore.on("core_added", this.onCoreAdded);
    coresStore.on("core_reject", this.onCoreReject);

  }
  componentWillUnmount() {
    coresStore.removeListener("core_added", this.onCoreAdded);
    coresStore.removeListener("core_reject", this.onCoreReject);
  }
  onCoreAdded(data) {
    alert('Core added\nID=' + data)
  }
  onCoreReject(err) {
    alert('Core rejected!\nerr: ' + err)
  }
  OnAddCoreSubmit(loginArgs) {
    console.log("Adding Core: ", JSON.stringify(loginArgs));
    coresAction.AddCore(loginArgs);
  }
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <CmtsLogin onSubmit={this.OnAddCoreSubmit} />
      </div>
    );
  }
}

export default Settings;
