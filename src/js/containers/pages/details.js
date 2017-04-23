/* hepl-dw/vitfoud-client
 *
 * /src/js/containers/pages/details.js - Container for details page
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React from "react";
import { Component as Container } from "reflux";

import PlacesStore, { actions as placesActions } from "../../stores/places";
import GeolocationStore from "../../stores/geolocation";

import Header from "../../components/commons/header";
import Loading from "../../components/commons/loading";
import UnknownPlace from "../../components/details/unknown";
import PlaceInfo from "../../components/details/info";
import PlaceHours from "../../components/details/hours";
import PlaceMap from "../../components/details/map";
import PlaceComments from "../../components/details/comments";

export default class DetailsPageContainer extends Container {
    constructor( oProps ) {
        super( oProps );

        this.state = {
            "currentPlace": null,
            "places": [],
            "fetching": false,
            "fetchingComments": false,
        };
        this.stores = [ GeolocationStore, PlacesStore ];
        this.storeKeys = [ "fetching", "places" ];
    }

    componentWillMount() {
        super.componentWillMount();

        if ( !this.state.places.length ) {
            placesActions.fetch();
        }
    }

    componentDidMount() {
        if ( !this.state.currentPlace ) {
            this.findCurrentPlace( this.state.fetching, this.state.places );
        }
    }

    componentWillUpdate( _, { places, fetching } ) {
        if ( !this.state.currentPlace ) {
            this.findCurrentPlace( fetching, places );
        }
    }

    findCurrentPlace( bFetching, aPlaces ) {
        if ( !bFetching && aPlaces.length ) {
            this.setState( {
                "currentPlace": aPlaces.find( ( { slug } ) => slug === this.props.match.params.slug ),
            } );
        }
    }

    renderPlace() {
        if ( !this.state.currentPlace.comments ) {
            placesActions.fetchComments( this.state.currentPlace.slug );
        }

        return (
            <div>
                <PlaceInfo { ...this.state.currentPlace } />
                <PlaceHours { ...this.state.currentPlace } />
                <PlaceMap { ...this.state.currentPlace } />
                <PlaceComments fetching={ this.state.fetchingComments } { ...this.state.currentPlace } />
            </div>
        );
    }

    render() {
        console.log( "DetailsPageContainer.render( state: )", this.state );

        let $content, sPageTitle;

        if ( this.state.fetching ) {
            sPageTitle = "chargement…";
            $content = ( <Loading /> );
        } else if ( this.state.currentPlace ) {
            sPageTitle = this.state.currentPlace.name;
            $content = this.renderPlace();
        } else {
            sPageTitle = "Oups!";
            $content = ( <UnknownPlace slug={ this.props.match.params.slug } /> );
        }

        return (
            <div className={ "page" }>
                <Header pageTitle={ sPageTitle } backLink={ "/" } />
                <main className={ "content" }>
                    { $content }
                </main>
            </div>
        );
    }
}
