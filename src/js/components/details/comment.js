/* hepl-dw/vitfoud-client
 *
 * /src/js/components/details/comment.js - Details Components : comment detail
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PlaceComment extends Component {
    render() {
        let dDate = new Date( this.props.date ),
            sISODate = dDate.toISOString(),
            sReadableDate = `${ dDate.toLocaleDateString() } à ${ dDate.toLocaleTimeString() }`;

        return (
            <li>
                <strong>{ this.props.name }</strong>
                <time dateTime={ sISODate }>{ sReadableDate }</time>
                <div>
                    <em>{ "Appréciation : " }</em>
                    <span>{ `${ this.props.rating }/5` }</span>
                </div>
                <div>{ this.props.comment }</div>
            </li>
        );
    }
}

PlaceComment.propTypes = {
    "comment": PropTypes.string,
    "date": PropTypes.number,
    "name": PropTypes.string,
    "rating": PropTypes.number,
};
