/* hepl-dw/vitfoud-client
 *
 * /src/js/components/commons/place.js - Commons Component : place infos
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Place extends Component {
    renderOpenState() {
        if ( this.props.open ) {
            return ( <span>{ "Ouvert" }</span> );
        }

        return ( <span>{ "Fermé" }</span> );
    }

    renderOpen() {
        if(this.props.open) {
            return "place_open";
        }
        return "place_close";
    }

    renderAddress() {
        return ( <address>{ this.props.address }</address> );
    }

    renderDistance() {
        return ( <em>{ `${ this.props.distance }m` }</em> );
    }

    render() {
        return (
            <div className={"place " + this.renderOpen()}>
                <div className="place__address">
                    <strong className="place__name">{ this.props.name }</strong>
                    { this.renderAddress() }
                </div>
                <div className="place__details">
                    { this.renderDistance() }
                    { this.renderOpenState() }
                </div>

            </div>
        );
    }
}

Place.propTypes = {
    "address": PropTypes.string,
    "distance": PropTypes.number,
    "name": PropTypes.string.isRequired,
    "open": PropTypes.bool,
};

Place.defaultProps = {
    "open": false,
    "address": "Adresse inconnue",
};
