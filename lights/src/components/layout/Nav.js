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
        const CoreSettingsClass = location.pathname.match(/^\/CoreSettings/) ? "active" : "";
        const AboutClass = location.pathname.match(/^\/About/) ? "active" : "";
        const AddCoreClass = location.pathname.match(/^\/AddCore/) ? "active" : "";
        const coresClass = location.pathname.match(/^\/cores/) ? "active" : "";
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
                        </button>
                    </div>
                    <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className={featuredClass}>
                                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Todos</IndexLink>
                            </li>
                        
                            <li className={AddCoreClass}>
                                <Link to="addcore" onClick={this.toggleCollapse.bind(this)}>Add Core</Link>
                            </li>
                            <li className={coresClass}>
                                <Link to="cores" onClick={this.toggleCollapse.bind(this)}>Cores</Link>
                            </li>
                                <li className={CoreSettingsClass}>
                                <Link to="CoreSettings" onClick={this.toggleCollapse.bind(this)}>Core Settings</Link>
                            </li>
                            <li className={AboutClass}>
                                <Link to="About" onClick={this.toggleCollapse.bind(this)}>About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}