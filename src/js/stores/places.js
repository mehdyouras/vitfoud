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

import { isOpenWithHours } from "../utils/misc";

export const actions = createActions( [
    "fetch",
    "fetchComments",
] );

export default class PlacesStore extends Store {
    constructor() {
        super();

        this.state = {
            "fetching": false,
            "fetchingComments": false,
            "places": [],
        };
        this.listenTo( actions.fetch, this.onFetch );
        this.listenTo( actions.fetchComments, this.onFetchComments );
    }

    onFetch() {
        if ( !this.state.fetching && this.state.places.length === 0 ) {
            this.setState( { "fetching": true } );
            this.listenTo( geolocationActions.success, this.onGeolocationSuccess );
            geolocationActions.locate();
        }
    }

    onGeolocationSuccess( { latitude, longitude } ) {
        this.stopListeningTo( geolocationActions.success );

        this.setState( { "fetching": true } );
        get( "/places", { latitude, longitude } )
            .then( ( aPlaces ) => {
                this.setState( {
                    "fetching": false,
                    "places": aPlaces.map( ( oPlace ) => {
                        oPlace.open = isOpenWithHours( oPlace.hours );
                        return oPlace;
                    } ),
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

    onFetchComments( sPlaceSlug ) {
        this.setState( { "fetchingComments": true } );
        get( `/places/${ sPlaceSlug }/comments` )
            .then( ( aComments ) => {
                this.setState( {
                    "fetchingComments": false,
                    "places": this.state.places.map( ( oPlace ) => {
                        if ( oPlace.slug === sPlaceSlug ) {
                            oPlace.comments = aComments;
                        }
                        return oPlace;
                    } ),
                } );
            } )
            .catch( ( oError ) => {
                console.error( "Fetch comments fails:", oError );
                // NOTE: this fails silently
                this.setState( {
                    "fetchingComments": false,
                    "places": this.state.places.map( ( oPlace ) => {
                        if ( oPlace.slug === sPlaceSlug ) {
                            oPlace.comments = [];
                        }
                        return oPlace;
                    } ),
                } );
            } )
    }
}
