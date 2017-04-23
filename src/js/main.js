/* hepl-dw/vitfoud-client
 *
 * /src/js/main.js - Entry point for vitfoud-client
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import RootContainer from "./containers/root";

ReactDOM.render(
    (
        <Router>
            <Route component={ RootContainer } />
        </Router>
    ),
    document.querySelector( "#app" )
);
