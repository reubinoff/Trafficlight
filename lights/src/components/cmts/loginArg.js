import React, { Component } from 'react';


let styles = {
  form_row: {
    width: '50%',
    margin: '20px'
  }
}

class loginArgument extends Component {
  constructor() {
    super();
    this.state = {
      loginArgs: {
        value: ""
      }
    }
  }
  render() {

    return (
      React.createElement('div', { className: 'form-group row', style: styles.form_row },
        React.createElement('label', {className:'col-sm-2 col-form-label' , htmlFor: this.props.name }, this.props.name),
          React.createElement('input', {
            id: this.props.name,
            className: 'form-control ',
            type: 'text',
            placeholder: this.props.default,
            onChange: this.props.onValueChange,
            value : this.props.value
          })
        )
    );
  }
}
loginArgument.propTypes = {
  onValueChange: React.PropTypes.func.isRequired,
  default: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
};



export default loginArgument;