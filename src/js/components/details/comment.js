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
            <li className="comments__item">
                <div className="comments__header">
                    <strong className="comments__author">{ this.props.name }</strong>
                    <time dateTime={ sISODate }>{ sReadableDate }</time>
                </div>
                <div className={"comments__rating " + "comments__rating_" + `${ this.props.rating }`}>
                    <em><span className="u-hidden-visually">{ "Appréciation : " }</span></em>
                    <span><span className="u-hidden-visually">{ `${ this.props.rating }/5` }</span></span>
                </div>
                <div className="comments__content">{ this.props.comment }</div>
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
