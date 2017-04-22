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

export const isOpenWithHours = function( aHours ) {
    let dNow = new Date(),
        iNow = hoursAsDecimal( dNow.getHours(), dNow.getMinutes() ),
        [ iTodayOpening, iTodayClosing ] = aHours[ dNow.getDay() ];

    return iTodayOpening < iNow && iNow < iTodayClosing;
};
