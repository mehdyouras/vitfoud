/* hepl-dw/vitfoud-client
 *
 * /src/js/components/header.js - Header component
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default class Header extends Component {
    handleBackClick( oEvent ) {
        oEvent.preventDefault();

        this.props.onBack();
    }

    renderNav() {
        let $prevLink, $aboutLink;

        if ( this.props.currentPath !== "/" ) {
            $prevLink = (
                <a href="#" onClick={ this.handleBackClick.bind( this ) }>{ "retour" }</a>
            );
        }

        $aboutLink = (
            <Link to="/about">{ "à propos" }</Link>
        );

        return (
            <nav>
                { $prevLink }
                { $aboutLink }
            </nav>
        );
    }

    render() {
        console.log( "Header.render( props: )", this.props );

        return (
            <header>
                <h1>{ "Vitfoud" }</h1>
                { this.renderNav() }
            </header>
        );
    }
}

Header.propTypes = {
    "currentPath": PropTypes.string.isRequired,
    "onBack": PropTypes.func.isRequired,
};
