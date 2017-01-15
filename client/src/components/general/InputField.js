import React, { Component } from 'react';


export default class InputField extends Component {
    constructor(props) {
        super();
        this.state = {
            value: 0
        }
        this.onValueChange = this.onValueChange.bind(this);
    }
    componentWillMount() {
        const { value } = this.props;
        this.setState({ value });
    }
    onValueChange(e) {
        var value = e.target.value;
        this.setState({ value });
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, value);
    }
    render() {

        return (
            <div>
                <div className='col-sm-4'>
                    <label >{this.props.name}</label>
                </div>
                <div className='col-sm-8'>
                    <input
                        type='text'
                        name={this.props.name}
                        onChange={this.onValueChange}
                        className='form-control'
                        value={this.state.value}
                        placeholder={this.props.name}
                    />
                </div>
            </div>
        );
    }
}
InputField.propTypes = {
    onValueChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    name: React.PropTypes.string.isRequired,
};
