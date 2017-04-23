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

import Header from "../../components/commons/header";
import Loading from "../../components/commons/loading";
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
        console.log( "ListPageContainer.render( state: )", this.state );

        let $content, sPageTitle;

        if ( this.state.fetching ) {
            sPageTitle = "chargement…";
            $content = ( <Loading /> );
        } else if ( this.state.places.length ) {
            sPageTitle = `${ this.state.places.length } endroits trouvés`;
            $content = ( <List places={ this.state.places } /> );
        } else {
            sPageTitle = "pas de chance !";
            $content = ( <EmptyList /> );
        }

        return (
            <div className={ "page" }>
                <Header pageTitle={ sPageTitle } />
                <main className={ "content" }>
                    { $content }
                </main>
            </div>
        );
    }
}
