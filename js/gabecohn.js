/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(function () {
    "use strict";

    // detect and apply Internet Explorer (IE) class (for IE 9-11)
    var $body = $('body'),
        isIE9 = !!navigator.userAgent.match(/MSIE 9\./),
        isIE10 = !!navigator.userAgent.match(/MSIE 10\./),
        isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
    if (isIE9) {
        $body.addClass("ie9");
    } else if (isIE10) {
        $body.addClass("ie10");
    } else if (isIE11) {
        $body.addClass("ie11");
    }
    if (isIE9 || isIE10 || isIE11) {
        $body.addClass("msie");
    }

    // pre-sort press and awards JSON structs
    if (window['pressJSON']) {
        pressJSON = sortListByDate(pressJSON);
    }
    if (window['awardsJSON']) {
        awardsJSON = sortListByDate(awardsJSON);
    }

    // render page from JSON
    if (window['eventsJSON']) {
        renderEvents(eventsJSON);
    }

    if (window['projectsJSON']) {
        renderProjects(projectsJSON);
    }

    if (window['publicationTypesJSON'] && window['publicationsJSON']) {
        renderPublications(publicationTypesJSON, publicationsJSON);
    }

    if (window['talksJSON']) {
        renderTalks(talksJSON);
    }

    if (window['teachingJSON']) {
        renderTeaching(teachingJSON);
    }

    if (window['pressJSON']) {
        renderFeaturedPress(pressJSON);
        renderAllPress(pressJSON);
    }


    $body.scrollspy({ target: '#navbar' });

    $('div[data-type="background"]').each(function () {
        var $bgobj = $(this);
     
        $(window).scroll(function () {
            var yPos,
                coords,
                minY;
            
            yPos = -($(window).scrollTop() / $bgobj.data('speed'));
            
            if ($bgobj.data('image-height')) {
                minY = -($bgobj.data('image-height') - $bgobj.height());
                if (yPos < minY) {
                    yPos = minY;
                }
            }
            
            coords = '50% ' + yPos + 'px';
 
            $bgobj.css({ backgroundPosition: coords });
        });
    });
    
    $('div[data-type="moving"]').each(function () {
        var $bgobj = $(this);
     
        $(window).scroll(function () {
            var yPos,
                coords,
                minY,
                divY = $bgobj.offset().top,
                windowHeight = $(window).height(),
                divHeight = $bgobj.height(),
                imgHeight = $bgobj.data('image-height');
            
            if (!imgHeight) {
                imgHeight = divHeight;
            }
                
            yPos = -(1 - ((divY + windowHeight) - ($(window).scrollTop() + windowHeight)) / (windowHeight)) * (imgHeight - divHeight);
            
            if (yPos > 0) {
                yPos = 0;
            }
            
            minY = -($bgobj.data('image-height') - divHeight);
            if (yPos < minY) {
                yPos = minY;
            }
            
            coords = '50% ' + yPos + 'px';
 
            $bgobj.css({ backgroundPosition: coords });
        });
    });

    $(window).load(function(){
        handleAnchor();

        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh');
        });
    });

    // handle anchors on clicks
    window.addEventListener("hashchange", handleAnchor);

});

var handleAnchor = function() {
    var hash = window.location.hash;
    hash = typeof(hash) == "string" ? hash : $(this).attr("hash");

    if(!hash) {
        return;
    }

    var anchor = hash.substring(1); // remove hash sign (#)
    var $target = $("a[name=" + anchor + "]");
    if (!$target) {
        $target = $(hash);
    }

    // Compute navbar height
    var navbarHeight = parseFloat($("nav#navbar").css("height"));
    var navbarVeriticalOffset = navbarHeight + 15; // use an additional 15 pixels of padding
    
    // Older browsers without pushState might flicker here, as they momentarily
    // jump to the wrong position (IE < 10)
    if($target.length) {
        $('html, body').animate({
            scrollTop: $target.offset().top - navbarVeriticalOffset
        }, 500);
        if(history && "pushState" in history) {
            history.pushState({}, document.title, window.location.pathname + hash);
        }
    }

    // expand project if target is a project
    var $project_anchor = $("#project-" + anchor);    
    if($project_anchor) {
        $project_anchor.find(".collapse").collapse("show");
    }  
}

var addIconsToLinks = function(links) {
    if (links && links.length && links.length > 0) {
        for (var i = 0; i < links.length; i += 1) {
            if (links[i].type) {
                switch(links[i].type) {
                    case "dl": links[i].icon = "book"; break;
                    case "doc": links[i].icon = "file"; break;
                    case "link": links[i].icon = "link"; break;
                    case "proj": links[i].icon = "tag"; break;
                    case "pub": links[i].icon = "file"; break;
                    case "slides": links[i].icon = "file"; break;
                    case "star": links[i].icon = "star-empty"; break;
                    case "talk": links[i].icon = "film"; break;
                    case "video": links[i].icon = "film"; break;
                    case "web": links[i].icon = "globe"; break;
                    default: links[i].icon = "file";
                }
            }
        }
    }
    return links;
}

// Helper function to sort a list in reverse chronological order using 'sortDate' attribute
var sortListByDate = function(list) {
    list.sort(function(a,b) {
        if (a.sortDate < b.sortDate) return 1;
        if (a.sortDate > b.sortDate) return -1;
        return 0;
    });
    return list;
};

// Helper method to find an element within an array which has an attribute of a specified name and value
var getArrayElementWithAttribute = function(array, nameValue) {
    if (array && nameValue) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] && array[i][nameValue.name] && array[i][nameValue.name] === nameValue.value) {
                return array[i];
            }
        }
    } else {
        console.log("ERROR: Must provide valid array and name-value pair to lookup element in array. array = " + array + ", nameValue = " + nameValue);
    }
    return undefined;
};

// returns an array which is a subset of the passed array containing only those elements in which <attributeValue> is contained within <attributeName>, which is an array
var getArrayElementsContainingAttributeInList = function(array, attributeName, attributeValue) {
    var results = [];

    if (array && attributeName && attributeValue) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] && array[i][attributeName]) {
                for (var k = 0; k < array[i][attributeName].length; k += 1) {
                    if (array[i][attributeName][k] === attributeValue) {
                        results.push(array[i]);
                    }
                }
            }
        }
    } else {
        console.log("ERROR: Must provide valid array, attributeName, and attributeValue to perform lookup. {array = " + array + ", attributeName = " + attributeName + ", attributeValue = " + attributeValue + "}");
    }

    return results;
};

var renderEvents = function(jsonData) {
    var $parent = $(".timeline-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    var htmlTemplate = '' +
        '                            {{#events}}' +
        '                            <dl class="dl-horizontal {{ pastClass }}">' +
        '                                <dt>{{ displayDate }}</dt>' +
        '                                <dd>{{ title }} {{#location}}({{ . }}){{/location}}</dd>' +
        '                            </dl>' +
        '                            {{/events}}';

    // Get today's date (remove everything other than the date itself)
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    // Add 'past' class if the event ended in the past
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].endDate) {
            var endDate = new Date(jsonData[i].endDate); // get the end date of the event
            if (today > endDate) { // event ended in the past
                jsonData[i].pastClass = "past";
            }
        }
    }

    // Render the HTML for the page
    var renderedHTML = Mustache.render(htmlTemplate, { "events": jsonData });
    $parent.append(renderedHTML);

    // Modify the spacing between the events in the list so that they fit perfectly in the same height as the 'contact' column
    var contactHeight = parseFloat($("#home .contact").css("height"));
    var timelinePaddingTop = parseFloat($("#home .timeline").css("padding-top"));
    var timelinePaddingBot = parseFloat($("#home .timeline").css("padding-bottom"));
    var timelineHeight = parseFloat($("#home .timeline-parent").css("height"));
    var heightToFill = contactHeight - timelinePaddingTop - timelinePaddingBot - timelineHeight;
    if (heightToFill > 0) {
        var numEvents = $("#home .timeline-parent dl").length;
        var paddingBetweenEvents = heightToFill / (numEvents - 1);

        $("#home .timeline-parent dl:not(:last-child)").each(function() { // set bottom margin on all events except for the last one
            $(this).css("margin-bottom", paddingBetweenEvents + "px");
        });
    }
};

var renderProjects = function(jsonData) {
    var $parent = $(".projects-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    var projectTemplate = '' +
        '<div id="project-{{ id }}" class="projects-project panel-group">' +
        '<a name="{{ id }}"></a>' +
        '<div class="panel panel-default">' +
        '    <a data-toggle="collapse" data-parent="#project-{{ id }}" href="#project-{{ id }}-body">' +
        '        <div class="panel-heading">' +
        '            <div class="container">' +
        '                <div class="row">' +
        '                    <div class="projects-thumbnail col-md-2">' +
        '                        <img class="img-thumbnail" src="img/projects/{{ id }}.jpg" alt="{{ id }}">' +
        '                    </div>' +
        '                    <div class="col-md-8">' +
        '                        <div class="row-item-date">{{{ date }}}</div>' +
        '                        <div class="projects-title">{{{ title }}}</div>' +
        '                        <div class="projects-summary">{{{ shortDesc }}}</div>' +
        '                    </div>' +
        '                    <div class="col-md-2">' +
        '                        {{#awardCount}}' +
        '                        <div class="badge-info projects-award-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-star-empty"></span> {{ awardCount }}</span>' +
        '                        </div>' +
        '                        {{/awardCount}}' +
        '                        {{#publicationCount}}' +
        '                        <div class="badge-info projects-publication-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-file"></span> {{ publicationCount }}</span>' +
        '                        </div>' +
        '                        {{/publicationCount}}' +
        '                        {{#videoCount}}' +
        '                        <div class="badge-info projects-video-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-film"></span> {{ videoCount }}</span>' +
        '                        </div>' +
        '                        {{/videoCount}}' +
        '                        {{#pressCount}}' +
        '                        <div class="badge-info projects-press-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-globe"></span> {{ pressCount }}</span>' +
        '                        </div>' +
        '                        {{/pressCount}}' +
        '                        <div class="projects-action-link">' +
        '                            Click for details' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </a>' +
        '    <div id="project-{{ id }}-body" class="panel-collapse collapse">' +
        '        <div class="panel-body">' +
        '            <div class="container">' +
        '                <div class="row">' +
        '                    <div class="col-md-8">' +
        '                        <div class="projects-description">{{{ longDesc }}}</div>' +
        '                        {{#publications}}' +
        '                            <div class="projects-publication-item"><div class="glyphicon glyphicon-file"></div><div class="projects-publication-body">{{{ authors }}} <a href="{{ link }}"><strong>{{{ title }}}</strong></a>. {{{ publication }}}</div></div>' +
        '                        {{/publications}}' +
        '                        {{#links}}' +
        '                            <div><a href="{{ url }}"><span class="glyphicon glyphicon-{{ icon }}"></span> {{ title }}</a></div>' +
        '                        {{/links}}' +
        '                    </div>' +
        '                    <div class="col-md-4">' +
        '                        {{#awards}}' +
        '                            <div class="badge-award" title="{{ longName }}"><span class="glyphicon glyphicon-star-empty"></span> {{ shortName }} <span class="text-muted"> - {{ displayDate }}</span></div>' +
        '                        {{/awards}}' +
        '                        {{#hasFeaturedPress}}' +
        '                            <div class="projects-press-heading"><h5>Featured Press In:</h5></div>' +
        '                            <div class="projects-press">' +
        '                                {{#press}}' +
        '                                    <div class="projects-press-item" title="{{ title }} ({{ displayDate }})">{{#url}}<a href="{{{ . }}}">{{/url}}{{ publication }}{{#url}}</a>{{/url}} <span class="text-muted"> - {{ displayDate }}</span></div>' +
        '                                {{/press}}' +
        '                            </div>' +
        '                        {{/hasFeaturedPress}}' +
        '                        {{#permalink}}' +
        '                            <div class="projects-permalink" title="{{ permalink }}"> ' +
        '                                <a href="{{ permalink }}"><span class="glyphicon glyphicon-link"></span> Permalink</a>' +
        '                            </div>' +
        '                        {{/permalink}}' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>';

    var renderedHTML = '';
    for(var p = 0; p < jsonData.length; p++) {
        var projectJSON = jsonData[p];
        var projectId = projectJSON["id"];

        // Create permalink
        if(projectId) {
            projectJSON["permalink"] = "http://www.gabeacohn.com/#" + projectId;
        }

        // Add related awards
        var awards = getArrayElementsContainingAttributeInList(awardsJSON, "relatedProjects", projectId);
        if(awards.length > 0) {
            projectJSON["awards"] = awards;
            projectJSON["awardCount"] = awards.length + " award";
            if(awards.length > 1){
                projectJSON["awardCount"] += "s";
            }
        }

        // Add related publications
        var publications = getArrayElementsContainingAttributeInList(publicationsJSON, "relatedProjects", projectId);
        if(publications.length > 0) {
            projectJSON["publications"] = publications;
            projectJSON["publicationCount"] = publications.length + " publication";
            if(publications.length > 1){
                projectJSON["publicationCount"] += "s";
            }
        }

        // Add related press
        var press = getArrayElementsContainingAttributeInList(pressJSON, "relatedProjects", projectId);
        if(press.length > 0) { // there is some related press
            // get list of featured press
            var featuredPress = [];
            for (var i = 0; i < press.length; i += 1) {
                if (press[i].featured) {
                    featuredPress.push(press[i]);
                }
            }
            if (featuredPress.length > 0) {
                projectJSON["press"] = featuredPress;
                projectJSON["hasFeaturedPress"] = true;
                projectJSON["pressCount"] = featuredPress.length + " featured press";
            } else { // no featured press, but there is related press
                projectJSON["pressCount"] = "in the press";
            }
        }

        // Add appropriate icons to links
        if (projectJSON.links) {
            projectJSON.links = addIconsToLinks(projectJSON.links);
        }

        renderedHTML += Mustache.render(projectTemplate, projectJSON);
    }

    $parent.append(renderedHTML);
};

var renderPublications = function(typesJsonData, jsonData) {
    var $parent = $(".publications-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    var htmlTemplate = '' +
        '<div class="subnav well">' +
        '    <ul class="subnav">' +
        '        {{#pubGroups}}' +
        '        <li><a href="#publications-{{ type }}">{{ title }}</a></li>' +
        '        {{/pubGroups}}' +
        '    </ul>' +
        '</div>' +
        '{{#pubGroups}}' +
        '<div class="panel panel-default">' +
        '    <a name="publications-{{ type }}"></a>' +
        '    <div class="panel-heading">' +
        '        <h2 class="panel-title">{{ title }}</h2>' +
        '    </div>' +
        '    <div class="panel-body">' +
        '        <div class="container">' +
        '        {{#rows}}' +
        '        <div class="row pub-item publication">' +
        '            <a name="{{ id }}"></a>' +
        '            <div class="index col-md-1">{{ index }}</div>' +
        '            <div class="col-md-2">' +
        '                {{#link}}<a href="{{ . }}">{{/link}}<img class="img-thumbnail" src="img/publications/{{ id }}.jpg" alt="{{ id }}"/>{{#link}}</a>{{/link}}' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="row-item-date">{{{ year }}}</div>' +
        '                {{{ authors }}} {{#link}}<a href="{{ . }}">{{/link}}<strong>{{{ title }}}</strong>{{#link}}</a>{{/link}}. {{{ publication }}}' +
        '                {{#acceptance}}' +
        '                <div class="pub-item-acceptance">' +
        '                    [Acceptance Rate: {{ . }}]' +
        '                </div>' +
        '                {{/acceptance}}' +
        '                {{#awards}}' +
        '                <div class="pub-item-award"><span class="glyphicon glyphicon-star-empty"></span> {{ shortName }}</div>' +
        '                {{/awards}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#links}}' +
        '                    <a href="{{ url }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-{{ icon }}"></span> {{ title }}</span></div></a>' +
        '                {{/links}}' +
        '            </div>' +
        '        </div>' +
        '        {{/rows}}' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '{{/pubGroups}}';

    // Create a container to hold all publications, grouped by type
    var publicationGroups = new Array(typesJsonData.length);
    for (var i = 0; i < typesJsonData.length; i++) {
        publicationGroups[i] = {"type": typesJsonData[i].name, "title": typesJsonData[i].displayName, "rows": []};
    }

    // Add linked data and Group publications by type
    for (var i = 0; i < jsonData.length; i++) {
        // *** First, add linked data ***

        // add related awards
        var awards = getArrayElementsContainingAttributeInList(awardsJSON, "relatedPublications", jsonData[i].id);
        if(awards.length > 0) {
            jsonData[i]["awards"] = awards;
        }

        // add icons to links
        if (jsonData[i].links) {
            jsonData[i].links = addIconsToLinks(jsonData[i].links);
        }


        // *** Then, add publication to the correct group ***
        var publicationGroup = getArrayElementWithAttribute(publicationGroups, {"name":"type", "value":jsonData[i].type});
        if (publicationGroup) {
            publicationGroup["rows"].push(jsonData[i]);
        } else {
            console.log("Unexpected publication type '" + jsonData[i].type + "' for publication id: " + jsonData[i].id);
        }
    }

    // Render the HTML for the page
    var renderedHTML = Mustache.render(htmlTemplate, { "pubGroups": publicationGroups });
    $parent.append(renderedHTML);
};

var renderTalks = function(jsonData) {
    var $parent = $(".talks-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    var htmlTemplate = '' +
        '<div class="panel panel-default">' +
        '    <div class="panel-body">' +
        '        <div class="container">' +
        '        {{#talks}}' +
        '        <div class="row pub-item talk">' +
        '            <a name="{{ id }}"></a>' +
        '            <div class="index col-md-1">{{ index }}</div>' +
        '            <div class="col-md-2">' +
        '                {{#link}}<a href="{{ . }}">{{/link}}<img class="img-thumbnail" src="img/talks/{{ id }}.jpg" alt="{{ id }}"/>{{#link}}</a>{{/link}}' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="row-item-date">{{{ year }}}</div>' +
        '                {{{ authors }}} {{#link}}<a href="{{ . }}">{{/link}}<strong>{{{ title }}}</strong>{{#link}}</a>{{/link}}. {{{ publication }}}' +
        '                {{#awards}}' +
        '                <div class="pub-item-award"><span class="glyphicon glyphicon-star-empty"></span> {{ shortName }}</div>' +
        '                {{/awards}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#links}}' +
        '                    <a href="{{ url }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-{{ icon }}"></span> {{ title }}</span></div></a>' +
        '                {{/links}}' +
        '            </div>' +
        '        </div>' +
        '        {{/talks}}' +
        '        </div>' +
        '    </div>' +
        '</div>';

    // Add linked data
    for (var i = 0; i < jsonData.length; i++) {
        // add related awards
        var awards = getArrayElementsContainingAttributeInList(awardsJSON, "relatedTalks", jsonData[i].id);
        if(awards.length > 0) {
            jsonData[i]["awards"] = awards;
        }

        // add icons to links
        if (jsonData[i].links) {
            jsonData[i].links = addIconsToLinks(jsonData[i].links);
        }
    }

    // Render the HTML for the page
    var renderedHTML = Mustache.render(htmlTemplate, { "talks": jsonData });
    $parent.append(renderedHTML);
};

var renderTeaching = function(jsonData) {
    var $parent = $(".teaching-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    var htmlTemplate = '' +
        '<div class="subnav well">' +
        '    <ul class="subnav">' +
        '        {{#groups}}' +
        '        <li><a href="#teaching-{{ id }}">{{ sectionTitle }}</a></li>' +
        '        {{/groups}}' +
        '    </ul>' +
        '</div>' +
        '{{#groups}}' +
        '<div id="teaching-{{ id }}" class="panel panel-default">' +
        '    <a name="teaching-{{ id }}"></a>' +
        '    <div class="panel-heading">' +
        '        <h2 class="panel-title">{{ sectionTitle }}</h2>' +
        '    </div>' +
        '    <div class="panel-body">' +
        '        {{#courses}}' +
        '        <div class="panel panel-default course">' +
        '            <a name="{{ id }}" href="{{ link }}">' +
        '            <div class="panel-body">' +
        '                <div class="course-title">{{ title }}</div>' +
        '                {{#instances}}' +
        '                <div class="course-instance"><span class="course-name">{{ course }}:</span> <span class="course-term">{{ terms }}</span></div>' +
        '                {{/instances}}' +
        '                <div class="course-desc">{{ desc }}</div>' +
        '            </div>' +
        '            </a>' +
        '        </div>' +
        '        {{/courses}}' +
        '    </div>' +
        '</div>' +
        '{{/groups}}';

    // add id values to each group
    for (var i = 0; i < jsonData.length; i++) {
        jsonData[i]["id"] = i; // just use index in list
    }

    // Render the HTML for the page
    var renderedHTML = Mustache.render(htmlTemplate, { "groups": jsonData });
    $parent.append(renderedHTML);
};

// assumes that jsonData has been previously sorted in reverse chronological order
var renderFeaturedPress = function(jsonData) {
    var $parent = $(".press-featured-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    var htmlTemplate = '' +
        '<div class="subnav well">' +
        '    <ul class="subnav">' +
        '        {{#projects}}' +
        '         <li><a href="#press-{{ id }}">{{ subject }}</a></li>' +
        '        {{/projects}}' +
        '    </ul>' +
        '</div>' +
        '{{#projects}}' +
        '<div class="panel panel-default">' +
        '    <a name="press-{{ id }}"></a>' +
        '    <div class="panel-heading"><h2 class="panel-title">{{ subject }}</h2></div>' +
        '    <div class="panel-body"><div class="row press-featured-subject">' +
        '        {{#sources}}' + 
        '        <div class="press-featured-source">' +
        '            <div class="press-featured-logo">{{#url}}<a href="{{ . }}">{{/url}}<img class="press-featured-logo-img" src="img/press/{{ logo }}" alt="{{ name }}" title="{{ title }} ({{ date }})">{{#url}}</a>{{/url}}</div>' +
        '            <div class="press-featured-dates">' + 
        '                {{#rows}}' + 
        '                <div class="press-featured-date" title="{{ title }} ({{ date }})">' +
        '                    {{#url}}<a href="{{ . }}">{{/url}}<span class="label label-info">{{ displayDate }}</span>{{#url}}</a>{{/url}}' +
        '                </div>' +
        '                {{/rows}}' +
        '            </div>' +
        '        </div>' +
        '        {{/sources}}' +
        '    </div></div>' +
        '</div>' +
        '{{/projects}}';

    // Group press by project and source
    var pressProjectGroups = [];
    var pressProjectGroup;
    var pressSourceGroup;
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].featured) {
            pressProjectGroup = getArrayElementWithAttribute(pressProjectGroups, {"name":"subject", "value":jsonData[i].featured});
            if (pressProjectGroup) {
                if (pressProjectGroup.sources) {
                    pressSourceGroup = getArrayElementWithAttribute(pressProjectGroup.sources, {"name":"logo", "value":jsonData[i].pressLogo});
                    if (pressSourceGroup) { // source already exists in list
                        pressSourceGroup.rows.push(jsonData[i]);
                        if (!pressSourceGroup.url) { // there's no link for the newest row, so add this row as the one that is linked if the logo is clicked
                            pressSourceGroup.url = jsonData[i].url;
                            pressSourceGroup.title = jsonData[i].title;
                            pressSourceGroup.date = jsonData[i].displayDate;
                        }
                    } else {
                        pressSourceGroup = {
                            "logo": jsonData[i].pressLogo,
                            "name": jsonData[i].publication,
                            "url": jsonData[i].url, // url of newest pub (will goto if link is clicked)
                            "title": jsonData[i].title, // title of newest pub
                            "date": jsonData[i].displayDate, // date of newest pub
                            "rows": [jsonData[i]]
                        };
                        pressProjectGroup.sources.push(pressSourceGroup);
                    }
                }
            } else {
                pressProjectGroup = {
                    "subject": jsonData[i].featured,
                    "sources":[
                        {
                            "logo": jsonData[i].pressLogo,
                            "name": jsonData[i].publication,
                            "url": jsonData[i].url, // url of newest pub (will goto if link is clicked)
                            "title": jsonData[i].title, // title of newest pub
                            "date": jsonData[i].displayDate, // date of newest pub
                            "rows": [jsonData[i]]
                        }
                    ]
                };
                pressProjectGroups.push(pressProjectGroup);
            }
        }
    }

    // add id values to each group
    for (var i = 0; i < pressProjectGroups.length; i++) {
        pressProjectGroups[i]["id"] = i; // just use index in list
    }

    // Render the HTML for the page
    var renderedHTML = Mustache.render(htmlTemplate, { "projects": pressProjectGroups });
    $parent.append(renderedHTML);
};

// assumes that jsonData has been previously sorted in reverse chronological order
var renderAllPress = function(jsonData) {
    var $parent = $(".press-parent");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
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
