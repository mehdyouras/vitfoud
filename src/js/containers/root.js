/* hepl-dw/vitfoud-client
 *
 * /src/js/containers/root.js - Root container
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React from "react";
import { Component as Container } from "reflux";
import { Route } from "react-router-dom";

import ListPageContainer from "./pages/list";
import AboutPageContainer from "./pages/about";
import DetailsPageContainer from "./pages/details";

export default class RootContainer extends Container {
    render() {
        console.log( "RootContainer.render( props: )", this.props );

        return (
            <div className="wrapper">
                <Route path="/" exact component={ ListPageContainer } />
                <Route path="/about" exact component={ AboutPageContainer } />
                <Route path="/details/:slug" exact component={ DetailsPageContainer } />
            </div>
        );
    }
}
