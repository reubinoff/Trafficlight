import React, { Component } from 'react';
import LoginArg from "./loginArg"

class CmtsLogin extends Component {

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
        }
    }

    render() {
        return (
            <div>
                <LoginArg label_name={this.state.default_ip_label} default_value={this.state.default_ip} />
                <LoginArg label_name={this.state.default_user_label} default_value={this.state.default_user} />
                <LoginArg label_name={this.state.default_password_label} default_value={this.state.default_password} />
                <LoginArg label_name={this.state.default_port_label} default_value={this.state.default_port} />
            </div>
        );
    }
}

export default CmtsLogin;
