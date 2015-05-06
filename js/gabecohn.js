/*jslint browser: true*/
/*global $, jQuery, console, alert*/

var NAVBAR_VERTICAL_OFFSET = 70;

$(function () {
    "use strict";

//    $.getJSON("json/projects.json", function(json) {
//        renderProjects(json);
//    });

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
        if(window.location.href.indexOf("#") >= 0) {
            handleAnchor(window.location.href.substring(window.location.href.indexOf("#")+1));
        }

        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this).scrollspy('refresh');
        });
    });


});

var handleAnchor = function(anchor) {
    var $target = $("a[name=" + anchor + "]"),
        $project = $("#project-" + anchor);

    if(!$target) {
        $target = $("#" + anchor);
    }

    // adjust for page offset when jumping to page anchors
    if ($target && $target.length > 0) {
        $('html, body').animate({
            scrollTop: ($target.offset().top - NAVBAR_VERTICAL_OFFSET)
        }, 500);
    }

    // expand any collapsed elements
    if($project) {
        $project.find(".collapse").collapse("show");
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
    var $parent = $(".timeline-parent"),
        htmlTemplate,
        eventObj,
        eventId,
        renderedHTML;

    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    htmlTemplate = '' +
        '                            <dl class="dl-horizontal {{ pastClass }}">' +
        '                                <dt>{{ displayDate }}</dt>' +
        '                                <dd>{{ title }} {{#location}}({{ . }}){{/location}}</dd>' +
        '                            </dl>';


    // get today's date (remove everything other than the date itself)
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    renderedHTML = '';
    for (eventId = 0; eventId < jsonData.length; eventId++) {
        eventObj = jsonData[eventId];

        // if the event ended in the past, add 'past' class
        var endDate;
        if (eventObj.endDate) {
            var endDate = new Date(eventObj.endDate); // get the end date of the event
            if (today > endDate) { // event ended in the past
                eventObj.pastClass = "past";
            }
        }

        renderedHTML += Mustache.render(htmlTemplate, eventObj);
    }

    $parent.append(renderedHTML);


    // modify the spacing between the events in the list so that they fit perfectly in the same height as the 'contact' column
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
    var $parent = $(".projects-parent"),
        projectTemplate,
        projectJSON,
        p,
        projectId,
        renderedHTML;

    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    projectTemplate = '' +
        '<div class="projects-anchor">' +
        '    <a name="{{ id }}"></a>' +
        '</div>' +
        '<div id="project-{{ id }}" class="projects-project panel-group">' +
        '<div class="panel panel-default">' +
        '    <a data-toggle="collapse" data-parent="#project-{{ id }}" href="#project-{{ id }}-body">' +
        '        <div class="panel-heading">' +
        '            <div class="container">' +
        '                <div class="row">' +
        '                    <div class="projects-thumbnail col-md-2">' +
        '                        <img class="img-thumbnail" src="img/projects/{{ id }}.jpg" alt="{{ id }}">' +
        '                    </div>' +
        '                    <div class="col-md-8">' +
        '                        <div class="projects-date">{{{ date }}}</div>' +
        '                        <div class="projects-title">{{{ title }}}</div>' +
        '                        <div class="projects-summary">{{{ shortDesc }}}</div>' +
        '                    </div>' +
        '                    <div class="col-md-2">' +
        '                        {{#awardCount}}' +
        '                        <div class="projects-award-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-star-empty"></span> {{ awardCount }}</span>' +
        '                        </div>' +
        '                        {{/awardCount}}' +
        '                        {{#publicationCount}}' +
        '                        <div class="projects-publication-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-file"></span> {{ publicationCount }}</span>' +
        '                        </div>' +
        '                        {{/publicationCount}}' +
        '                        {{#videoCount}}' +
        '                        <div class="projects-video-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-film"></span> {{ videoCount }}</span>' +
        '                        </div>' +
        '                        {{/videoCount}}' +
        '                        {{#pressCount}}' +
        '                        <div class="projects-press-count">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-globe"></span> {{ pressCount }}</span>' +
        '                        </div>' +
        '                        {{/pressCount}}' +
        '                        <div class="projects-action-link">' +
        '                            Click to for details' +
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

    renderedHTML = '';
    for(p = 0; p < jsonData.length; p++) {
        projectJSON = jsonData[p];
        projectId = projectJSON["id"];

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
    var $parent = $(".publications-parent"),
        htmlTemplate,
        htmlNavTemplate,
        htmlGroupStartTemplate,
        htmlGroupEndTemplate,
        publication,
        publicationType,
        publicationGroup,
        publicationId,
        renderedHTML;

    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    htmlNavTemplate  = '<div class="subnav well">';
    htmlNavTemplate += '    <ul class="subnav">';
    htmlNavTemplate += '        {{#types}}';
    htmlNavTemplate += '            <li><a href="#publications-{{ name }}">{{ displayName }}</a></li>';
    htmlNavTemplate += '        {{/types}}';
    htmlNavTemplate += '    </ul>';
    htmlNavTemplate += '</div>';

    htmlGroupStartTemplate = '' +
        '<div class="publications-anchor">' +
        '    <a name="publications-{{ type }}"></a>' +
        '</div>' +
        '<div class="panel panel-default">' +
        '    <div class="panel-heading">' +
        '        <h2 class="panel-title">{{ title }}</h2>' +
        '    </div>' +
        '    <div class="panel-body">' +
        '        <div class="container">';

    htmlGroupEndTemplate = '' +
        '        </div>' +
        '    </div>' +
        '</div>';

    htmlTemplate = '' +
        '        <div class="publications-anchor">' +
        '            <a name="{{ id }}"></a>' +
        '        </div>' +
        '        <div class="publication row">' +
        '            <div class="index col-md-1">{{ index }}</div>' +
        '            <div class="col-md-2">' +
        '                {{#link}}<a href="{{ . }}">{{/link}}<img class="img-thumbnail" src="img/publications/{{ id }}.jpg" alt="{{ id }}"/>{{#link}}</a>{{/link}}' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="publications-date">{{{ year }}}</div>' +
        '                {{{ authors }}} {{#link}}<a href="{{ . }}">{{/link}}<strong>{{{ title }}}</strong>{{#link}}</a>{{/link}}. {{{ publication }}}' +
        '                {{#acceptance}}' +
        '                <div class="publications-acceptance">' +
        '                    [Acceptance Rate: {{ . }}]' +
        '                </div>' +
        '                {{/acceptance}}' +
        '                {{#awards}}' +
        '                <div class="publications-award"><span class="glyphicon glyphicon-star-empty"></span> {{ shortName }}</div>' +
        '                {{/awards}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#links}}' +
        '                    <a href="{{ url }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-{{ icon }}"></span> {{ title }}</span></div></a>' +
        '                {{/links}}' +
        '            </div>' +
        '        </div>';


    // create a container to hold all publications, grouped by type
    var publicationGroups = new Array(typesJsonData.length);
    for (var i = 0; i < typesJsonData.length; i += 1) {
        publicationGroups[i] = {"type": typesJsonData[i].name, "title": typesJsonData[i].displayName, "rows": []};
    }

    // Group publications by type
    for (var i = 0; i < jsonData.length; i += 1) {
        publicationGroup = getArrayElementWithAttribute(publicationGroups, {"name":"type", "value":jsonData[i].type});
        if (publicationGroup) {
            publicationGroup["rows"].push(jsonData[i]);
        } else {
            console.log("Unexpected publication type '" + jsonData[i].type + "' for publication id: " + jsonData[i].id);
        }
    }

    // Render HTML from templates
    renderedHTML = '';

    renderedHTML += Mustache.render(htmlNavTemplate, {"types":typesJsonData});

    for(var groupId = 0; groupId < publicationGroups.length; groupId += 1) {
        publicationGroup = publicationGroups[groupId];

        renderedHTML += Mustache.render(htmlGroupStartTemplate, publicationGroup);

        for(publicationId = 0; publicationId < publicationGroup["rows"].length; publicationId++) {
            publication = publicationGroup["rows"][publicationId];

            // Add related awards
            var awards = getArrayElementsContainingAttributeInList(awardsJSON, "relatedPublications", publication.id);
            if(awards.length > 0) {
                publication["awards"] = awards;
            }

            if (publication.links) {
                publication.links = addIconsToLinks(publication.links);
            }

            renderedHTML += Mustache.render(htmlTemplate, publication);
        }

        renderedHTML += Mustache.render(htmlGroupEndTemplate, publicationGroup);
    }

    $parent.append(renderedHTML);
};

var renderTalks = function(jsonData) {
    var $parent = $(".talks-parent"),
        htmlTemplate,
        talk,
        talkId,
        renderedHTML;

    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    htmlTemplate = '' +
        '        <div class="talks-anchor">' +
        '            <a name="{{ id }}"></a>' +
        '        </div>' +
        '        <div class="talk row">' +
        '            <div class="index col-md-1">{{ index }}</div>' +
        '            <div class="col-md-2">' +
        '                {{#link}}<a href="{{ . }}">{{/link}}<img class="img-thumbnail" src="img/talks/{{ id }}.jpg" alt="{{ id }}"/>{{#link}}</a>{{/link}}' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="talks-date">{{{ year }}}</div>' +
        '                {{{ authors }}} {{#link}}<a href="{{ . }}">{{/link}}<strong>{{{ title }}}</strong>{{#link}}</a>{{/link}}. {{{ publication }}}' +
        '                {{#awards}}' +
        '                <div class="talks-award"><span class="glyphicon glyphicon-star-empty"></span> {{ shortName }}</div>' +
        '                {{/awards}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#links}}' +
        '                    <a href="{{ url }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-{{ icon }}"></span> {{ title }}</span></div></a>' +
        '                {{/links}}' +
        '            </div>' +
        '        </div>';


    renderedHTML = '';
    for (talkId = 0; talkId < jsonData.length; talkId++) {
        talk = jsonData[talkId];

        // Add related awards
        var awards = getArrayElementsContainingAttributeInList(awardsJSON, "relatedTalks", talk.id);
        if(awards.length > 0) {
            talk["awards"] = awards;
        }

        if (talk.links) {
            talk.links = addIconsToLinks(talk.links);
        }

        renderedHTML += Mustache.render(htmlTemplate, talk);
    }

    $parent.append(renderedHTML);
};

// assumes that jsonData has been previously sorted in reverse chronological order
var renderFeaturedPress = function(jsonData) {
    var i, $parent = $(".press-featured-parent"),
        htmlTemplate,
        pressProjectGroup,
        pressProjectGroups = [],
        pressSourceGroup,
        renderedHTML;

    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    htmlTemplate = '' +
        '<div class="panel panel-default">' +
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
        '</div>';

    // Group press by project and source
    for (i = 0; i < jsonData.length; i++) {
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

    // Render the HTML for the page
    renderedHTML = '';

    for (var k = 0; k < pressProjectGroups.length; k++) {
        renderedHTML += Mustache.render(htmlTemplate, pressProjectGroups[k]);
    }

    $parent.append(renderedHTML);
};

// assumes that jsonData has been previously sorted in reverse chronological order
var renderAllPress = function(jsonData) {
    var i, j,
        $parent = $(".press-parent"),
        htmlNavTemplate,
        htmlTemplate,
        htmlGroupStartTemplate,
        htmlGroupEndTemplate,
        years,
        pressGroup,
        pressGroups = [],
        renderedHTML;

    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        return;
    }

    htmlNavTemplate =  '<div class="subnav well">';
    htmlNavTemplate += '    <ul class="subnav">';
    htmlNavTemplate += '        {{#years}}';
    htmlNavTemplate += '            <li><a href="#press-{{ . }}">{{ . }}</a></li>';
    htmlNavTemplate += '        {{/years}}';
    htmlNavTemplate += '    </ul>';
    htmlNavTemplate += '</div>';

    htmlGroupStartTemplate =  '<div id="press-{{ year }}" class="panel panel-default">';
    htmlGroupStartTemplate += '    <div class="panel-heading">';
    htmlGroupStartTemplate += '        <h2 class="panel-title">{{ year }}</h2>';
    htmlGroupStartTemplate += '    </div>';
    htmlGroupStartTemplate += '    <div class="panel-body">';

    htmlTemplate =  '<div class="press-article">';
    htmlTemplate += '    <div class="press-date">{{ displayDate }}</div>';
    htmlTemplate += '    <div class="press-title">';
    htmlTemplate += '        {{#url}}<a href="{{{ . }}}">{{/url}}{{ title }}{{#url}}</a>{{/url}}';
    htmlTemplate += '    </div> ';
    htmlTemplate += '    <div class="press-author">{{ author }}{{#author}}, {{/author}}</div><div class="press-publication">{{ publication }}</div>';
    htmlTemplate += '</div>';

    htmlGroupEndTemplate =  '    </div>';
    htmlGroupEndTemplate += '</div>';

    years = parseDistinctYears(jsonData, "sortDate");

    renderedHTML = Mustache.render(htmlNavTemplate, {"years":years});

    for (i = 0; i < years.length; i++) {
        renderedHTML += Mustache.render(htmlGroupStartTemplate, {"year":years[i]});

        for (j = 0; j < jsonData.length; j++) {
            var year = parseYear(jsonData[j].sortDate);
            if (year != null && year === years[i]) {
                renderedHTML += Mustache.render(htmlTemplate, jsonData[j]);
            }
        }

        renderedHTML += Mustache.render(htmlGroupEndTemplate, {"year":years[i]});
    }

    $parent.append(renderedHTML);

};

var parseDistinctYears = function(objects, attributeName){
    var years = [];

    for (var i = 0; i < objects.length; i ++) {
        if (objects[i][attributeName]) {
            var year = parseYear(objects[i][attributeName]);

            if (year != null) {
                if (years.indexOf(year) === -1) {
                    years.push(year);
                }
            }

        }
    }

    return years;
};

var parseYear = function (sortDateString) {
    if (sortDateString && sortDateString.length > 4) {
        return sortDateString.substr(0, 4);
    }
    return null;
};