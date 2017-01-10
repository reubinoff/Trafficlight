import React, { Component } from 'react';
import CmtsLogin from './login';
import * as actionsCmtsStatus from '../../actions/cmtsStatusActions'

class CmtsLoginArea extends Component {
  constructor() {
    super();
    this.state = {
      login_status: "Disconnected",
      loginArgs: {}
    }
    this.ChangeLoginStatus = this.ChangeLoginStatus.bind(this);
  }
  ChangeLoginStatus(loginArgs) {
    this.setState({loginArgs});
  }
  cmtsConnected() {
    console.log("connecting to: ",this.state.loginArgs)
    actionsCmtsStatus.cmtsConnected(this.state.loginArgs);
  }
  cmtsDisconnected() {
    actionsCmtsStatus.cmtsDisonnected();
  }
  render() {

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <CmtsLogin onChangeState={this.ChangeLoginStatus} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="btn-toolbar" role="toolbar" aria-label="...">
              <button className="btn btn-success" onClick={this.cmtsConnected.bind(this)} >Save</button>
              <button className="btn btn-default" onClick={this.cmtsDisconnected.bind(this)}  >Disconnect</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CmtsLoginArea;
