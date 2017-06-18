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
        let sURL = `https://maps.googleapis.com/maps/api/staticmap?center=${ this.props.position.latitude },${ this.props.position.longitude }&zoom=14&size=250x150&maptype=roadmap&markers=color:red|label:default|${ this.props.position.latitude },${ this.props.position.longitude }&key=AIzaSyBGlWS0FnY1r6NzWxC41N8mhIKiALG5qmQ`;
        return (
            <div className="map">
                <img className="map__image" src={sURL} alt="Carte des alentours du Quick"/>
            </div>
        );
    }
}

PlaceMap.propTypes = {
    "position": PropTypes.shape( {
        "latitude": PropTypes.number,
        "longitude": PropTypes.number,
    } ),
};
