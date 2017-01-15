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
        this._onChange = this._onChange.bind(this)
        this._deleteCore = this._deleteCore.bind(this)
        this._updateCore = this._updateCore.bind(this)

    }
    componentWillMount() {
        const { _id } = this.props;
        this.setState({ _id })

    }
    componentWillUnmount() {

    }

    _onChange(name, value) {
        console.log(name + " : " + value);
        console.log(this.state);
        this.setState({ name: value });

    }
    _deleteCore() {
        CoreActions.DeleteCore(this.state._id);
        console.log("DELETE")
    }
    _updateCore() {
        console.log("UPDATE")
    }
    render() {
        const { _id, ip,
            user,
            password,
            port,
            owner,
            description } = this.props;
        return (
            <div>
                <InputField onValueChange={this._onChange} name={'Ip'} value={ip} />
                <InputField onValueChange={this._onChange} name={'User'} value={user} />
                <InputField onValueChange={this._onChange} name={'Password'} value={password} />
                <InputField onValueChange={this._onChange} name={'Port'} value={port} />
                <InputField onValueChange={this._onChange} name={'Owner'} value={owner} />
                <InputField onValueChange={this._onChange} name={'Description'} value={description} />

                <div>
                    <button className='btn btn-info' onClick={this._updateCore} >Save</button>
                    <button className='btn btn-danger' onClick={this._deleteCore}>Delete</button>
                </div>
            </div>

        );

    }


}

export default CoreFullForm;