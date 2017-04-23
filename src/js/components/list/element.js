/* hepl-dw/vitfoud-client
 *
 * /src/js/components/list/element.js - List Component : element component
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default class ListElement extends Component {
    renderOpenState() {
        if ( this.props.open ) {
            return ( <span>{ "Ouvert" }</span> );
        }

        return ( <span>{ "Fermé" }</span> );
    }

    renderAddress() {
        return ( <address>{ this.props.address }</address> );
    }

    renderDistance() {
        return ( <em>{ `${ this.props.distance }m` }</em> );
    }

    render() {
        return (
            <li>
                <Link to={ `/details/${ this.props.slug }` }>
                    <strong>{ this.props.name }</strong>
                    { this.renderAddress() }
                    { this.renderDistance() }
                    { this.renderOpenState() }
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

ListElement.defaultProps = {
    "address": "Address inconnue",
    "open": false,
};
