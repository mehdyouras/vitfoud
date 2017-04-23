/* hepl-dw/vitfoud-client
 *
 * /src/js/containers/pages/about.js - Container for about page
 *
 * coded by leny@flatLand!
 * started at 23/04/2017
 */

import React from "react";
import { Component as Container } from "reflux";

import AboutProject from "../../components/about/project";
import AboutMe from "../../components/about/me";

export default class AboutPageContainer extends Container {
    render() {
        return (
            <div className={ "page" }>
                <AboutProject />
                <AboutMe />
            </div>
        );
    }
}
