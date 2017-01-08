import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: true,
        };
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        const featuredClass = location.pathname === "/" ? "active" : "";
        const TempClass = location.pathname.match(/^\/Temp/) ? "active" : "";
        const AboutClass = location.pathname.match(/^\/About/) ? "active" : "";
        const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={featuredClass}>
                                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Todos</IndexLink>
                            </li>
                            <li className={TempClass}>
                                <IndexLink to="Temp" onClick={this.toggleCollapse.bind(this)}>TempClass</IndexLink>
                            </li>
                            <li className={settingsClass}>
                                <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
                            </li>
                                   <li className={AboutClass}>
                                <IndexLink to="About" onClick={this.toggleCollapse.bind(this)}>About</IndexLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}