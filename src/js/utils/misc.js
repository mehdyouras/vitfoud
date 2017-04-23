/* hepl-dw/vitfoud-client
 *
 * /src/js/utils/misc.js - Misc utilities
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

export const hoursAsDecimal = function( iHours, iMinutes ) {
    return iHours + ( iMinutes / 60 );
};

export const hoursAsString = function( iDecimalHours ) {
    let sHours = Math.round( iDecimalHours ),
        sMinutes = ( iDecimalHours % 1 ) * 60;

    ( sHours === 24 ) && ( sHours = 0 );
    ( sHours < 10 ) && ( sHours = `0${ sHours }` );
    ( sMinutes < 10 ) && ( sMinutes = `0${ sMinutes }` );

    return `${ sHours }:${ sMinutes }`;
};

export const isOpenWithHours = function( aHours ) {
    let dNow = new Date(),
        iNow = hoursAsDecimal( dNow.getHours(), dNow.getMinutes() ),
        [ iTodayOpening, iTodayClosing ] = aHours[ dNow.getDay() ];

    return iTodayOpening < iNow && iNow < iTodayClosing;
};
