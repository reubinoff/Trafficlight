import React, { Component } from 'react';

class LoginArg extends Component {
    constructor() {
        super()
        this.state = { 'loginValue': '' ,name:''}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ 'loginValue': event.target.value ,name:event.target.name});
        if (this.props.onChange)
            this.props.onChange(event.target.name,event.target.value);
    }
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
                <input name={this.props.label_name} style={inputSyle} defaultValue={this.props.default_value} onChange={this.handleChange} />
            </div>
        );
    }
}

export default LoginArg;
