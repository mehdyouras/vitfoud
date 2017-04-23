/* hepl-dw/vifoud-client
 *
 * /src/js/containers/pages/comment.js - Container for commenting page
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
import { Redirect } from "react-router-dom";
import UnknownPlace from "../../components/details/unknown";
import Place from "../../components/commons/place";
import CommentForm from "../../components/comment/form";

export default class CommentPageContainer extends Container {
    constructor( oProps ) {
        super( oProps );

        this.state = {
            "currentPlace": null,
            "places": [],
            "fetching": false,
            "fetchingComments": false,
            "needsRedirection": false,
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

    handleCommentSubmit( oCommentData ) {
        console.log( "CommentPageContainer.handleCommentSubmit( data: )", oCommentData );
        placesActions.postComment( this.props.match.params.slug, oCommentData );
        this.setState( { "needsRedirection": true } );
        // NOTE: this is sloppy. I know.
    }

    findCurrentPlace( bFetching, aPlaces ) {
        if ( !bFetching && aPlaces.length ) {
            this.setState( {
                "currentPlace": aPlaces.find( ( { slug } ) => slug === this.props.match.params.slug ),
            } );
        }
    }

    render() {
        console.log( "CommentPageContainer.render( state: )", this.state );

        let $content, $form, sPageTitle;

        if ( this.state.needsRedirection ) {
            return ( <Redirect to={ `/details/${ this.props.match.params.slug }` } /> );
        }

        if ( this.state.fetching ) {
            sPageTitle = "chargement…";
            $content = ( <Loading /> );
        } else if ( this.state.currentPlace ) {
            sPageTitle = `Ajouter un commentaire sur ${ this.state.currentPlace.name }`;
            $content = ( <Place { ...this.state.currentPlace } /> );
            $form = ( <CommentForm onSubmit={ this.handleCommentSubmit.bind( this ) } /> );
        } else {
            sPageTitle = "Oups!";
            $content = ( <UnknownPlace slug={ this.props.match.params.slug } /> );
        }

        return (
            <div className={ "page" }>
                <Header pageTitle={ sPageTitle } backLink={ `/details/${ this.props.match.params.slug }` } />
                <main className={ "content" }>
                    { $content }
                    { $form }
                </main>
            </div>
        );
    }
}
