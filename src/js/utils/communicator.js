/* hepl-dw/vitfoud-client
 *
 * /src/js/utils/communicator.js - API/Network Communicator (wrapper for Axios)
 *
 * coded by leny@flatLand!
 * started at 22/04/2017
 */

import Promise from "bluebird";
import axios from "axios";

const API_ROOT = "http://vitfoud.leny.me";

let fRequest, fGet, fPost;

fRequest = function( sMethod, sPath, oData = {} ) {
    let oRequest = {
        "url": `${ API_ROOT }${ sPath }`,
        "method": sMethod,
    };

    if ( sMethod === "get" ) {
        oRequest.params = oData;
    } else {
        oRequest.data = oData;
    }

    return axios( oRequest )
        .then( ( { "data": oResponse } ) => {
            if ( oResponse.error ) {
                return Promise.reject( new Error( oResponse.error ) );
            }

            return Promise.resolve( oResponse.data );
        } )
        .catch( ( oError ) => {
            if ( oError.response && oError.response.data ) {
                return Promise.reject( new Error( oResponse.response.data.error ) );
            }

            return Promise.reject( oError );
        } );
};

fGet = ( ...aParams ) => fRequest( "get", ...aParams );
fPost = ( ...aParams ) => fRequest( "post", ...aParams );

export {
    fGet as get,
    fPost as post,
};
