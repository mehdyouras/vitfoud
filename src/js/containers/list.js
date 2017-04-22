/* hepl-dw/vitfoud-client
 *
 * /src/js/containers/list.js - Container for list page
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import React from "react";
import { Component } from "reflux";

import PlacesStore, { actions as placesActions } from "../stores/places";
import GeolocationStore from "../stores/geolocation";

export default class ListPageContainer extends Component {
    constructor( oProps ) {
        super( oProps );

        this.stores = [ GeolocationStore, PlacesStore ];
        this.storeKeys = [ "fetching", "places" ];
    }

    componentWillMount() {
        super.componentWillMount();

        console.log( "ListPageContainer.componentWillMount()" );
        placesActions.fetch();
    }

    render() {
        console.log( "ListPageContainer.render( state: )", this.state );
        return (
            <div className={ [ "page", "list" ] }>
                <h1>{ "List page!" }</h1>
            </div>
        );
    }
}
