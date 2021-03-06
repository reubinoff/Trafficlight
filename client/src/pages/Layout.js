import React, { Component } from 'react';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav'


class Layout extends Component {
  constructor() {
    super();
    this.state = {
      name: "Moshe",
      main: 'Application'
    }
  }


  render() {
    const { location } = this.props;
    const containerSyle = {
      marginTop: "70px",
      marginBottom: "-50px",
      overflowX: 'hidden',
      overflowY: 'auto'
    }
    return (
      <div>
        <Nav location={location} />
        <div className="containter" style={containerSyle}>
          <div className="row" >
            <div className="col-lg-12">
              {this.props.children}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Footer />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Layout;

  // <Header title={this.state.main} />