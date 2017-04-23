/* hepl-dw/vitfoud-client
 *
 * /src/js/components/list/element.js - List Component : element component
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import Place from "../commons/place";
import { Link } from "react-router-dom";

export default class ListElement extends Component {
    render() {
        return (
            <li>
                <Link to={ `/details/${ this.props.slug }` }>
                    <Place { ...this.props } />
                </Link>
            </li>
        );
    }
}

ListElement.propTypes = {
    "address": PropTypes.string,
    "distance": PropTypes.number,
    "name": PropTypes.string.isRequired,
    "open": PropTypes.bool,
    "slug": PropTypes.string.isRequired,
};
