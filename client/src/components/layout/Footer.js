import React from "react";


export default class Footer extends React.Component {


  render() {
    const footerStyles = {
      marginTop: "50px",
    };

    return (

      <footer style={footerStyles}>
        <div className="col-lg-12">
          <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <form className="navbar-form navbar-left" role="search">
                <p>Copyright &copy; {"Moshe Reubinoff"}</p>
              </form>
            </div>
          </nav>

        </div>
      </footer>
    );
  }
}

/*      <footer style={footerStyles}>
        <div className="col-lg-12">
          <nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <form className="navbar-form navbar-right" role="search">
                <div className="col-lg-12">
                  <LoginState status={this.state.cmts_status} />
                </div>
              </form>
              <form className="navbar-form navbar-left" role="search">
                <p>Copyright &copy; {"Moshe Reubinoff"}</p>
              </form>
            </div>
          </nav>

        </div>
      </footer>
      */