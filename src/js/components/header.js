/* hepl-dw/vitfoud-client
 *
 * /src/js/components/header.js - Header component
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>{ "Vitfoud, in React Header!" }</h1>
            </header>
        );
    }
}
