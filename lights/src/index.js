
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import ReactDOM from 'react-dom';
import Layout from './pages/Layout';
import CmtsSummary from './pages/CmtsSummary'
import Temp from './pages/temp'
import About from './pages/About'
import Settings from './pages/Settings'
import './index.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout} >
            <IndexRoute component={CmtsSummary}></IndexRoute>
            <Route path="Temp" name="Temp" component={Temp}></Route>
            <Route path="Settings" name="Settings" component={Settings}></Route>
            <Route path="About" name="About" component={About}></Route>
        </Route>

    </Router >
    , document.getElementById('root')
);

