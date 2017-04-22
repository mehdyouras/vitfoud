/* hepl-dw/vitfoud-client
 *
 * /src/js/main.js - Entry point for vitfoud-client
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header";

import ListPageContainer from "./containers/list";

ReactDOM.render(
    (
        <Router>
            <main>
                <Header />
                <Route path={ "/" } component={ ListPageContainer } />
            </main>
        </Router>
    ),
    document.querySelector( "#app" )
);
