/* hepl-dw/vitfoud-client
 *
 * /src/js/stores/places.js - Stores for places
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import { createActions, Store } from "reflux";

import { actions as geolocationActions } from "./geolocation";
import { get } from "../utils/communicator";

export const actions = createActions( [
    "fetch",
] );

export default class PlacesStore extends Store {
    constructor() {
        super();

        this.state = {
            "fetching": false,
            "places": [],
        };
        this.listenTo( actions.fetch, this.onFetch );
    }

    onFetch() {
        this.setState( { "fetching": true } );
        this.listenTo( geolocationActions.success, this.onGeolocationSuccess );
        geolocationActions.locate();
    }

    onGeolocationSuccess( { latitude, longitude } ) {
        this.stopListeningTo( geolocationActions.success );

        this.setState( { "pending": true } );
        get( "/places", { latitude, longitude } )
            .then( ( aPlaces ) => {
                this.setState( {
                    "fetching": false,
                    "places": aPlaces,
                } );
            } )
            .catch( ( oError ) => {
                console.error( "Fetch fails:", oError );
                // NOTE: this fails silently
                this.setState( {
                    "fetching": false,
                    "places": [],
                } );
            } );
    }
}
