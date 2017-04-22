/* hepl-dw/vitfoud-client
 *
 * /src/js/components/list/list.js - List Component : list component
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import ListElement from "./element";

export default class List extends Component {
    render() {
        return (
            <ul>
                { this.props.places.map( ( oPlace ) => (
                    <ListElement key={ oPlace.slug } { ...oPlace } />
                ) ) }
            </ul>
        );
    }
}

List.propTypes = {
    "places": PropTypes.arrayOf( PropTypes.shape( {
        "slug": PropTypes.string.isRequired,
        "name": PropTypes.string.isRequired,
        "distance": PropTypes.number,
        "address": PropTypes.string,
        "open": PropTypes.bool,
    } ) ).isRequired,
};
