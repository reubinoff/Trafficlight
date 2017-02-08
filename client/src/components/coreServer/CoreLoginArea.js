import React, { Component } from 'react';
import loginArgument from './loginArg';



class CoreLoginArea extends Component {
  constructor() {
    super();
    this.state = {
      ip: "",
      password: "",
      user: "",
      port: ""
    }
    this.onIpChange = this.onIpChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPortChange = this.onPortChange.bind(this);
    this.OnAddCoreSubmit = this.OnAddCoreSubmit.bind(this);
    this.restoreDefaults = this.restoreDefaults.bind(this);
  }
  restoreDefaults(event) {
    var args = {
      ip: "0.0.0.0",
      password: "ccap",
      user: "ccap",
      port: "2022"
    }
    this.setState({
      ip: args.ip,
      password: args.password,
      user: args.user,
      port: args.port
    });
  }
  onIpChange(event) {
    var ip = event.target.value;
    this.setState({ ip });
  }
  onUserChange(event) {
    var user = event.target.value;
    this.setState({ user });
  }
  onPasswordChange(event) {
    var password = event.target.value;
    this.setState({ password });
  }
  onPortChange(event) {
    var port = event.target.value;
    this.setState({ port });
  }
  OnAddCoreSubmit(event) {
    var loginArgs = {
      ip: this.state.ip,
      password: this.state.password,
      user: this.state.user,
      port: this.state.port
    }
    if (this.props.onSubmit)
      this.props.onSubmit(loginArgs)
    event.preventDefault();
  }
  render() {

    return (
      React.createElement('div', {},
        React.createElement('form', { ref: 'form', onSubmit: this.OnAddCoreSubmit, className: 'form-group', noValidate: true },
          React.createElement(loginArgument, { onValueChange: this.onIpChange, default: '10.40.22.114', name: 'IP', value: this.state.ip }),
          React.createElement(loginArgument, { onValueChange: this.onUserChange, default: 'ccap', name: 'Username', value: this.state.user }),
          React.createElement(loginArgument, { onValueChange: this.onPasswordChange, default: 'ccap', name: 'Password', value: this.state.password }),
          React.createElement(loginArgument, { onValueChange: this.onPortChange, default: '2022', name: 'Port', value: this.state.port }),

          React.createElement('div', { className: 'row' },
            React.createElement('button', { className: 'btn btn-info ', type: 'submit', style: { margin: '20px' } }, "Add Core"),
            React.createElement('button', { type: 'button', onClick: this.restoreDefaults, className: 'btn btn-secondary' }, "Defaults")
          ),
        )
      )
    );
  }
}

export default CoreLoginArea;
