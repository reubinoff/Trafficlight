import React, { Component } from 'react';
import InputField from '../general/InputField'
import * as CoreActions from '../../actions/coresAction'

class CoreFullForm extends Component {
    constructor() {
        super();
        this.state = {
            _id: "",
            ip: "",
            user: "",
            password: "",
            port: "", owner: "",
            description: ""
        }
        this._onChange_ip = this._onChange_ip.bind(this);
        this._onChange_user = this._onChange_user.bind(this);
        this._onChange_pass = this._onChange_pass.bind(this);
        this._onChange_port = this._onChange_port.bind(this);
        this._onChange_owner = this._onChange_owner.bind(this);
        this._onChange_des = this._onChange_des.bind(this);

        this._deleteCore = this._deleteCore.bind(this)
        this._updateCore = this._updateCore.bind(this)

    }
    componentWillMount() {
        const { _id, ip} = this.props;
        this.setState({ _id })
        this.setState({ ip })
    }
    componentWillUnmount() {

    }

    _onChange_ip(ip) { this.setState({ ip }); }
    _onChange_user(user) { this.setState({ user }); }
    _onChange_pass(password) { this.setState({ password }); }
    _onChange_port(port) { this.setState({ port }); }
    _onChange_owner(owner) { this.setState({ owner }); }
    _onChange_des(description) { this.setState({ description }); }

    _deleteCore() {
        CoreActions.DeleteCore(this.state._id);
        console.log("DELETE core: " + this.state.ip)
    }
    _updateCore() {
        CoreActions.UpdateCore(this.state);
        console.log("UPDATE core: " + this.state.ip)
    }
    render() {
        const { ip,
            user,
            password,
            port,
            owner,
            description } = this.props;
        return (
            <div>
                <InputField onValueChange={this._onChange_ip} name={'Ip'} value={ip} />
                <InputField onValueChange={this._onChange_user} name={'User'} value={user} />
                <InputField onValueChange={this._onChange_pass} name={'Password'} value={password} />
                <InputField onValueChange={this._onChange_port} name={'Port'} value={port} />
                <InputField onValueChange={this._onChange_owner} name={'Owner'} value={owner} />
                <InputField onValueChange={this._onChange_des} name={'Description'} value={description} />

                <div>
                    <button className='btn btn-info' onClick={this._updateCore} >Save</button>
                    <button className='btn btn-danger' onClick={this._deleteCore}>Delete</button>
                </div>
            </div>

        );

    }


}

export default CoreFullForm;