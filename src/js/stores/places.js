/* hepl-dw/vitfoud-client
 *
 * /src/js/stores/places.js - Stores for places
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import { createActions, Store } from "reflux";

import { actions as geolocationActions } from "./geolocation";
import { get, post } from "../utils/communicator";

import { isOpenWithHours } from "../utils/misc";

export const actions = createActions( [
    "fetch",
    "fetchComments",
    "postComment",
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
        this.listenTo( actions.postComment, this.onPostComment );
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
                // NOTE: this fails silently. bfytw.
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
                aComments.sort( ( a, b ) => b.date - a.date );
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
                // NOTE: this fails silently. bfytw.
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

    onPostComment( sPlaceSlug, oComment ) {
        this.setState( { "fetchingComments": true } );
        post( `/places/${ sPlaceSlug }/comments`, oComment )
            .then( ( oComment ) => {
                this.setState( {
                    "fetchingComments": false,
                    "places": this.state.places.map( ( oPlace ) => {
                        if ( oPlace.slug === sPlaceSlug ) {
                            if ( !oPlace.comments ) {
                                oPlace.comments = [];
                            }
                            oPlace.comments.unshift( oComment );
                        }
                        return oPlace;
                    } ),
                } );
            } )
            .catch( ( oError ) => {
                console.error( "Post comment fails:", oError );
                // NOTE: this fails silently. bfytw.
                this.setState( {
                    "fetchingComments": false,
                    "places": this.state.places.map( ( oPlace ) => {
                        if ( oPlace.slug === sPlaceSlug ) {
                            if ( !oPlace.comments ) {
                                oPlace.comments = [];
                            }
                            oComment.date = Date.now();
                            oPlace.comments.unshift( oComment );
                        }
                        return oPlace;
                    } ),
                } );
            } );
    }
}
