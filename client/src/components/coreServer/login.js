import React, { Component } from 'react';
import LoginArg from "./loginArg"

class CoreLogin extends Component {

    constructor() {
        super();

        this.state = {
            default_user: "ccap",
            default_ip: "0.0.0.0",
            default_port: "ccap",
            default_password: "ccap",

            default_user_label: "Username",
            default_ip_label: "Ip",
            default_port_label: "Port",
            default_password_label: "Password",
            loginArgs: {
                ip: "",
                user: "",
                password: "",
                port: ""
            }
        }

        this.onChangeState = this.onChangeState.bind(this)
    }
    componentWillMount() {
         var loginArgs= {
                ip: this.state.default_ip,
                user: this.state.default_user,
                password: this.state.default_password,
                port: this.state.default_port
            }
        this.setState({loginArgs});
          if (this.props.onChangeState)
            this.props.onChangeState(loginArgs)

    }
    onChangeState(name, value) {
        var loginArgs = this.state.loginArgs;
        switch (name) {
            case this.state.default_user_label:
                loginArgs.user = value
                break;
            case this.state.default_ip_label:
                loginArgs.ip = value
                break;
            case this.state.default_port_label:
                loginArgs.port = value
                break;
            case this.state.default_password_label:
                loginArgs.password = value
                break;
            default:
                break;
        }
         if (this.props.onChangeState)
            this.props.onChangeState(loginArgs)

    }
    render() {
        return (
            <div>
                <LoginArg label_name={this.state.default_ip_label} onChange={this.onChangeState} default_value={this.state.default_ip} />
                <LoginArg label_name={this.state.default_user_label} onChange={this.onChangeState} default_value={this.state.default_user} />
                <LoginArg label_name={this.state.default_password_label} onChange={this.onChangeState} default_value={this.state.default_password} />
                <LoginArg label_name={this.state.default_port_label} onChange={this.onChangeState} default_value={this.state.default_port} />
            </div>
        );
    }
}

export default CoreLogin;
