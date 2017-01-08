import React, { Component } from 'react';
import CmtsLogin from './login';
import * as actionsCmtsStatus from '../../actions/cmtsStatusActions'

class CmtsLoginArea extends Component {
  constructor() {
    super();
    this.state = {
      login_status: "Disconnected"
    }
  }
  ChangeLoginStatus(login_status) {
    this.setState({ login_status });
    // like: this.setState(login_status= {login_status} );
  }
  cmtsConnected() {
    var loginArgs={
      ip:'ip',
      user:'u',
      password:'p',
      port:2
    }
    actionsCmtsStatus.cmtsConnected(loginArgs);
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
              <CmtsLogin />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button className="btn btn-success" onClick={this.cmtsConnected.bind(this)} >Save</button>
            <button className="btn btn-success" onClick={this.cmtsDisconnected.bind(this)} >Dis</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CmtsLoginArea;
