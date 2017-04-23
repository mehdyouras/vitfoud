/* hepl-dw/vitfoud-client
 *
 * /src/js/components/details/unknown.js - Details Component : Unknown Place
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class UnknownPlace extends Component {
    render() {
        return (
            <p>{ `Endroit inconnu: ${ this.props.slug }` }</p>
        );
    }
}

UnknownPlace.propTypes = {
    "slug": PropTypes.string.isRequired,
};
