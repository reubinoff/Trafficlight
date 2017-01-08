import React, { Component } from 'react';
import Title from './Header/Title'

class Header extends Component {

  render() {
    return (
      <div>
        <Title title={this.props.title}/>
      </div>
    );
  }
}

export default Header;
