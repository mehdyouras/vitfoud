/* hepl-dw/vitfoud-client
 *
 * /src/js/containers/list.js - Container for list page
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import React from "react";
import { Component as Container } from "reflux";

import PlacesStore, { actions as placesActions } from "../../stores/places";
import GeolocationStore from "../../stores/geolocation";

import Loading from "../../components/list/loading";
import List from "../../components/list/list";
import EmptyList from "../../components/list/empty";

export default class ListPageContainer extends Container {
    constructor( oProps ) {
        super( oProps );

        this.stores = [ GeolocationStore, PlacesStore ];
        this.storeKeys = [ "fetching", "places" ];
    }

    componentWillMount() {
        super.componentWillMount();

        placesActions.fetch();
    }

    render() {
        let $content;

        if ( this.state.fetching ) {
            $content = ( <Loading /> );
        }

        if ( this.state.places.length ) {
            $content = ( <List places={ this.state.places } /> );
        } else {
            $content = ( <EmptyList /> );
        }

        return (
            <div className={ [ "page", "list" ] }>
                { $content }
            </div>
        );
    }
}
