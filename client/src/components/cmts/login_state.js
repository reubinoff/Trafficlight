import React, { Component } from 'react';

class LoginState extends Component {
    constructor() {
        super();
        this.state = {
            name: "Status"
        }
    }
    render() {
        //this.props.ChangeLoginStatus("NewState");
        var defaultBtn = [
            'btn',
            'btn-circle'
        ];
        var btnClassOK = [
            defaultBtn,
            'btn-success'
        ];
        var btnClassBad = [
            defaultBtn,
            'btn-danger'
        ];

        var defaultShape = [
            'glyphicon'
        ];
        var shapeClassOK = [
            defaultShape,
            'glyphicon-ok'
        ];
        var shapeClassBad = [
            defaultShape,
            'glyphicon-remove'
        ];

        var styleBtn = [btnClassOK.join(" "), btnClassBad.join(" ")];
        var styleShape = [shapeClassOK.join(" "), shapeClassBad.join(" ")];
        return (
            <div>
                <div className="col-lg-12">
                    <label >{this.state.name}</label>
                    <button type="button" className={styleBtn[this.props.status]}><i className={styleShape[this.props.status]}></i></button>
                    <p name="status"></p>
                </div>
            </div>
        );
    }
}

export default LoginState;
