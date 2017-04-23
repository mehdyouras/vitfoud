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

import Header from "../components/header";
import ListPageContainer from "./pages/list";
import AboutPageContainer from "./pages/about";

export default class RootContainer extends Container {
    handleBack() {
        this.props.history.goBack();
    }

    render() {
        console.log( "RootContainer.render( props: )", this.props );

        return (
            <main>
                <Header currentPath={ this.props.location.pathname } onBack={ this.handleBack.bind( this ) } />
                <Route path="/" exact component={ ListPageContainer } />
                <Route path="/about" exact component={ AboutPageContainer } />
            </main>
        );
    }
}
