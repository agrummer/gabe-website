/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(function () {
    "use strict";

    // pre-sort press JSON struct
    if (window['pressJSON']) {
        pressJSON = sortListByDate(pressJSON);
    }

    // render page from JSON
    if (window['pressJSON']) {
        renderAllPress(pressJSON);
    }

});

// assumes that jsonData has been previously sorted in reverse chronological order
var renderAllPress = function(jsonData) {
    var $parent = $(".press-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        console.log("renderAllPress: parent not found");
        return;
    }

    var htmlTemplate = '' +
        '<div class="subnav well">' +
        '    <ul class="subnav">' +
        '        {{#years}}' +
        '        <li><a href="#press-{{ year }}">{{ year }}</a></li>' +
        '        {{/years}}' +
        '    </ul>' +
        '</div>' +
        '{{#years}}' +
        '<div id="press-{{ year }}" class="panel panel-default">' +
        '    <a name="press-{{ year }}"></a>' +
        '    <div class="panel-heading">' +
        '        <h2 class="panel-title">{{ year }}</h2>' +
        '    </div>' +
        '    <div class="panel-body">' +
        '        {{#press}}' +
        '        <div class="press-article">' +
        '            <div class="row-item-date">{{ displayDate }}</div>' +
        '            <div class="press-title">' +
        '                {{#url}}<a href="{{{ . }}}">{{/url}}{{ title }}{{#url}}</a>{{/url}}' +
        '            </div> ' +
        '            <div class="press-author">{{ author }}{{#author}}, {{/author}}</div><div class="press-publication">{{ publication }}</div>' +
        '        </div>' +
        '        {{/press}}' +
        '    </div>' +
        '</div>' +
        '{{/years}}';

    // Group press by year
    var pressGroupedByYear = [];
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].sortDate && jsonData[i].sortDate.length > 4) {
            var year = jsonData[i].sortDate.substr(0,4);
            var yearGroup = getArrayElementWithAttribute(pressGroupedByYear, {"name":"year", "value":year});
            if (yearGroup) {
                yearGroup.press.push(jsonData[i]);
            } else { // create new year group in list
                yearGroup = {
                    "year": year,
                    "press": [ jsonData[i] ]
                };
                pressGroupedByYear.push(yearGroup);
            }
        }
    }

    // Render the HTML for the page
    var renderedHTML = Mustache.render(htmlTemplate, { "years": pressGroupedByYear });
    $parent.append(renderedHTML);
};
