/* hepl-dw/vitfoud-client
 *
 * /src/js/components/details/map.js - Details Component : map
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PlaceMap extends Component {
    render() {
        return (
            <div>{ "Here will be a static map." }</div>
        );
    }
}

PlaceMap.propTypes = {
    "position": PropTypes.shape( {
        "latitude": PropTypes.number,
        "longitude": PropTypes.number,
    } ),
};
