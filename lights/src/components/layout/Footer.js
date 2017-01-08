import React from "react";
import LoginState from '../cmts/login_state'
import CmtsStatus from '../../stores/cmtsStatusStore'


export default class Footer extends React.Component {

  constructor() {

    super();
    this.state = {
      cmts_status: 1
    }
    this.OnUpdateState = this.OnUpdateState.bind(this);

  }

  componentWillMount() {
    CmtsStatus.on("change", this.OnUpdateState);
  }

  componentWillUnmount() {
    CmtsStatus.removeListener("change", this.OnUpdateState);
  }
  OnUpdateState() {
    this.setState({
      cmts_status: CmtsStatus.GetStatus(),
    });
  }


  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (

      <footer style={footerStyles}>
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
    );
  }
}