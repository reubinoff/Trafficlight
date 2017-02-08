
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import ReactDOM from 'react-dom';
import Layout from './pages/Layout';
import CoreSummary from './pages/CoreSummary'
import CoreSettings from './pages/CoreSettings'
import About from './pages/About'
import AddCore from './pages/AddCore'
import CoreList from './pages/CoreList'
import './index.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout} >
            <IndexRoute component={CoreSummary}></IndexRoute>
            <Route path="coresettings" name="CoreSettings" component={CoreSettings}></Route>
            <Route path="AddCore" name="AddCore" component={AddCore}></Route>
            <Route path="About" name="About" component={About}></Route>
            <Route path="cores" name="CoreList" component={CoreList}></Route>
        </Route>

    </Router >
    , document.getElementById('root')
);


