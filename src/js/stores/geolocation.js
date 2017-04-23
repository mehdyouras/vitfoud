/* hepl-dw/vitfoud-client
 *
 * /src/js/stores/geolocation.js - Stores for geolocation
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import { createActions, Store } from "reflux";

const CACHE_TTL = 300000;

const DEFAULT_LOCATION = { // Liège, Belgium
    "latitude": 50.633,
    "longitude": 5.567,
};

export const actions = createActions( [
    "locate",
    "success",
] );

export default class GeolocationStore extends Store {
    constructor() {
        super();

        this.state = {
            "pending": false,
            "coordinates": null,
            "timestamp": 0,
        };
        this.listenTo( actions.locate, this.onLocate );
    }

    onLocate() {
        if ( this.state.coordinates && ( Date.now() - this.state.timestamp ) < CACHE_TTL ) {
            return actions.success( this.state.coordinates );
        }

        let fForcedSuccess = () => {
            this.setState( {
                "coordinates": DEFAULT_LOCATION,
                "pending": false,
                "timestamp": Date.now(),
            } );
            actions.success( DEFAULT_LOCATION );
        };

        if ( !navigator.geolocation ) {
            fForcedSuccess();
        }

        this.setState( { "pending": true } );
        navigator.geolocation.getCurrentPosition( ( { coords, timestamp } ) => {
            if ( this.state.pending ) {
                this.setState( {
                    "coordinates": coords,
                    "pending": false,
                    "timestamp": timestamp,
                } );
                actions.success( coords );
            }
        }, () => {
            fForcedSuccess();
        }, {
            "enableHighAccuracy": true,
        } );
        setTimeout( () => {
            if ( this.state.pending ) {
                fForcedSuccess();
            }
        }, 5000 );
    }
}
