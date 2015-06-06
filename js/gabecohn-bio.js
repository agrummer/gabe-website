/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(function () {
    "use strict";

    // render page from JSON
    if (window['bioJSON']) {
        renderBio(bioJSON);
    }

    // if plain-text version of bio, remove all links
    $('.bio-plain a').each(function() {
        var text = $(this).text();
        $(this).replaceWith(text);
    });

});

var renderBio = function(jsonData) {
    var $parent = $(".bio-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        console.log("renderBio: parent not found");
        return;
    }

    // Render the HTML for the page
    var htmlTemplate = '                    <p class="bio">{{{ bio-affiliation }}}{{{ bio }}}</p>';
    var renderedHTML = Mustache.render(htmlTemplate, jsonData);
    $parent.append(renderedHTML);
};
