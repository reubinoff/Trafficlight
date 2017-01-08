import React, { Component } from 'react';

class LoginArg extends Component {

    render() {
        const labelSyle = {
            "width": "180px",
            "clear": "left",
            "textAlign": "right",
            "paddingRight": "10px",
            "float": "left"
        }
        const inputSyle = {
            "float": "left"
        }
        return (
            <div>
                <label style={labelSyle} >{this.props.label_name}</label>
                <input name="generic" style={inputSyle} defaultValue={this.props.default_value} />
            </div>
        );
    }
}

export default LoginArg;
