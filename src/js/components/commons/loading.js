/* hepl-dw/vitfoud-client
 *
 * /src/js/components/commons/loading.js - List Component : Loading indicator
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React, { Component } from "react";

export default class Loading extends Component {
    render() {
        return (
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <span className="u-hidden-visually">{ "chargement…" }</span>
            </div>
        );
    }
}
