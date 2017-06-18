/* hepl-dw/vitfoud-client
 *
 * /src/js/components/commons/header.js - Header component
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

        if ( this.props.backLink ) {
            $prevLink = (
                <Link className={"nav__item" + " nav__item_return"} to={ this.props.backLink }><span className="u-hidden-visually">{ "retour" }</span></Link>
            );
        }

        $aboutLink = (
            <Link className={"nav__item" + " nav__item_about"}  to="/about"><span className="u-hidden-visually">{ "à propos" }</span></Link>
        );

        return (
            <nav className="nav">
                { $prevLink }
                { $aboutLink }
            </nav>
        );
    }

    render() {
        console.log( "Header.render( props: )", this.props );

        return (
            <header className="header">
                <div className="fixedWrapper">
                    <h1 className="header__title">
                        <span className="u-hidden-visually">{ "Vitfoud" }</span>
                        <img className="header__logo" src="assets/img/logo.svg" alt="Logo de Quick"/>
                    </h1>
                    { this.renderNav() }
                </div>
                <h2 className="header__subtitle">{ this.props.pageTitle }</h2>
            </header>
        );
    }
}

Header.propTypes = {
    "pageTitle": PropTypes.string.isRequired,
    "backLink": PropTypes.string,
};
