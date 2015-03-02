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

    renderProjects(projectsJSON);

    renderPublications(publicationsJSON);

    renderTalks(talksJSON);

    $body.scrollspy({ target: '#navbar' });
    
    // automatically color timeline events based on current date
    // get today's date (but remove everything other than the date)
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    // set 'past' class for timeline events in the past
    $('.timeline').children('dl').each(function() {
        var endDate = new Date($(this).children('dt').attr('data-end-date'));
        if (today > endDate) {
            $(this).addClass('past');
        }
    });

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
    $('html, body').animate({
        scrollTop: ($target.offset().top - NAVBAR_VERTICAL_OFFSET)
    }, 500);

    // expand any collapsed elements
    if($project) {
        $project.find(".collapse").collapse("show");
    }
}

var addIconsToLinks = function(links) {
    if (links && links.length && links.length > 0) {
        for (var l = 0; l < links.length; l += 1) {
            if (links[l].type) {
                switch(links[l].type) {
                    case "dl": links[l].icon = "book"; break;
                    case "doc": links[l].icon = "file"; break;
                    case "link": links[l].icon = "link"; break;
                    case "proj": links[l].icon = "tag"; break;
                    case "pub": links[l].icon = "file"; break;
                    case "slides": links[l].icon = "file"; break;
                    case "star": links[l].icon = "star-empty"; break;
                    case "talk": links[l].icon = "film"; break;
                    case "video": links[l].icon = "film"; break;
                    case "web": links[l].icon = "globe"; break;
                    default: links[l].icon = "file";
                }
            }
        }
    }
    return links;
}

var renderProjects = function(jsonData) {
    var $parent = $(".projects-parent"),
        projectTemplate,
        projectJSON,
        projectId,
        renderedHTML;

    /* Projects JSON structure
     The projects should appear in the order of the objects in the JSON structure.
     Each project object contains the following:
     id - string, for referencing this project in other JSON objects and the id of the <div>
     the URL for the thumbnail will be "img/projects/<id>.jpg" where <id> is replaced with the id
     always starts with proj_
     title - string, title of Project to display
     date - string, as it should appear on the page (not used for sorting)
     shortDesc - string (with HTML), short description that is shown when the project is collapsed
     longDesc - string (with HTML), long description that is shown when the project is expanded
     */

    projectTemplate = '' +
        '<div class="projects-anchor">' +
        '    <a name="{{ key }}"></a>' +
        '</div>' +
        '<div id="project-{{ key }}" class="projects-project panel-group">' +
        '<div class="panel panel-default">' +
        '    <a data-toggle="collapse" data-parent="#project-{{ key }}" href="#project-{{ key }}-body">' +
        '        <div class="panel-heading">' +
        '            <div class="container">' +
        '                <div class="row">' +
        '                    <div class="projects-thumbnail col-md-2">' +
        '                        <img class="img-thumbnail" src="img/projects/{{ id }}.jpg">' +
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
        '                        {{#hasPress}}' +
        '                        <div class="projects-has-press">' +
        '                            <span class="label label-info"><span class="glyphicon glyphicon-globe"></span> In the news</span>' +
        '                        </div>' +
        '                        {{/hasPress}}' +
        '                        <div class="projects-action-link">' +
        '                            Click to for details' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </a>' +
        '    <div id="project-{{ key }}-body" class="panel-collapse collapse">' +
        '        <div class="panel-body">' +
        '            <div class="container">' +
        '                <div class="row">' +
        '                    <div class="col-md-8">' +
        '                        <div class="projects-description">{{{ longDesc }}}</div>' +
        '                        {{#publications}}' +
        '                        <div class="badge-publication"><span class="glyphicon glyphicon-file"></span> {{{ . }}}</div>' +
        '                        {{/publications}}' +
        '                        {{#videos}}' +
        '                        <div class="badge-video"><span class="glyphicon glyphicon-film"></span> {{{ . }}}</div>' +
        '                        {{/videos}}' +
        '                    </div>' +
        '                    <div class="col-md-4">' +
        '                        {{#awards}}' +
        '                        <div class="badge-award"><span class="glyphicon glyphicon-star-empty"></span> {{{ . }}}</div>' +
        '                        {{/awards}}' +
        '                        {{#hasPress}}' +
        '                        <div class="projects-press-heading"><h5>Featured in</h5></div>' +
        '                        <div class="projects-press">' +
        '                            {{#press}}' +
        '                            <div class="projects-press-item">{{{ . }}}</div>' +
        '                            {{/press}}' +
        '                        </div>' +
        '                        {{/hasPress}}' +
        '                        {{#permalink}}' +
        '                        <div class="projects-permalink" title="{{ permalink }}"> ' +
        '                            <a href="{{ permalink }}"><span class="glyphicon glyphicon-link"></span> Permalink</a>' +
        '                        </div>' +
        '                        {{/permalink}}' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '</div>';

    if(!$parent || $parent.length === 0) {
        return;
    }

    renderedHTML = '';
    for(projectId = 0; projectId < jsonData.length; projectId++) {
        projectJSON = jsonData[projectId];

        if(projectJSON["key"]) {
            projectJSON["permalink"] = "http://www.gabeacohn.com/#" + projectJSON["key"];
        }
        if(projectJSON["awards"]) {
            projectJSON["awardCount"] = projectJSON["awards"].length + " award";
            if(projectJSON["awards"].length > 1){
                projectJSON["awardCount"] += "s";
            }
        }
        if(projectJSON["publications"]) {
            projectJSON["publicationCount"] = projectJSON["publications"].length + " publication";
            if(projectJSON["publications"].length > 1){
                projectJSON["publicationCount"] += "s";
            }
        }
        if(projectJSON["videos"]) {
            projectJSON["videoCount"] = projectJSON["videos"].length + " video";
            if(projectJSON["videos"].length > 1){
                projectJSON["videoCount"] += "s";
            }
        }
        if(projectJSON["press"]) {
            projectJSON["hasPress"] = projectJSON["press"].length;
        }

        if (projectJSON.links) {
            projectJSON.links = addIconsToLinks(projectJSON.links);
        }

        renderedHTML += Mustache.render(projectTemplate, projectJSON);
    }

    $parent.append(renderedHTML);
};

var renderPublications = function(jsonData) {
    var $parent = $(".publications-parent"),
        htmlTemplate,
        htmlGroupStartTemplate,
        htmlGroupEndTemplate,
        publication,
        publicationGroup,
        groupId,
        publicationId,
        renderedHTML;

    htmlGroupStartTemplate = '' +
        '<div class="publications-anchor">' +
        '    <a name="publications-{{ id }}"></a>' +
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
        '        <div class="publication row">' +
        '            <div class="index col-md-1" id="publication-{{ index }}">{{ index }}</div>' +
        '            <div class="col-md-2"><a href="{{ paperUrl }}">' +
        '                <img class="img-thumbnail" src="{{ thumbUrl }}" alt=""/></a>' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="publications-date">{{{ date }}}</div>' +
        '                {{{ authors }}} <a href="{{ paperUrl }}"><strong>{{{ title }}}</strong></a>. {{{ context }}}' +
        '                {{#acceptanceRate}}' +
        '                <div class="publications-acceptance">' +
        '                    [Acceptance Rate: {{ acceptanceRate }}]' +
        '                </div>' +
        '                {{/acceptanceRate}}' +
        '                {{#awards}}' +
        '                <div class="publications-award"><span class="glyphicon glyphicon-star-empty"></span> {{{ . }}}</div>' +
        '                {{/awards}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#paperUrl}}' +
        '                <a href="{{ paperUrl }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-file"></span> paper</span></div></a>' +
        '                {{/paperUrl}}' +
        '                {{#videoUrl}}' +
        '                <a href="{{ videoUrl }}"><div class="badge-video"><span class="label label-info"><span class="glyphicon glyphicon-film"></span> video</span></div></a>' +
        '                {{/videoUrl}}' +
        '                {{#talkVideoUrl}}' +
        '                <a href="{{ talkVideoUrl }}"><div class="badge-video"><span class="label label-info"><span class="glyphicon glyphicon-film"></span> talk video</span></div></a>' +
        '                {{/talkVideoUrl}}' +
        '                {{#dlUrl}}' +
        '                <a href="{{ dlUrl }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-book"></span> Digital Library</span></div></a>' +
        '                {{/dlUrl}}' +
        '                {{#project}}' +
        '                <a href="#{{ project }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-tag"></span> project info</span></div></a>' +
        '                {{/project}}' +
        '            </div>' +
        '        </div>';


    if(!$parent || $parent.length === 0) {
        return;
    }

    renderedHTML = '';
//    for(groupId = 0; groupId < jsonData.length; groupId++) { // TODO: GRUMMER - Group publications by publication.type
//        publicationGroup = jsonData[groupId];
//
//        publicationGroup["id"] = groupId;
//
//        renderedHTML += Mustache.render(htmlGroupStartTemplate, publicationGroup);
//
//        for(publicationId = 0; publicationId < publicationGroup["publications"].length; publicationId++) {
//            publication = publicationGroup["publications"][publicationId];
//
//            if (publication.links) {
//                publication.links = addIconsToLinks(publication.links);
//            }
//
//            renderedHTML += Mustache.render(htmlTemplate, publication);
//        }
//
//        renderedHTML += Mustache.render(htmlGroupEndTemplate, publicationGroup);
//    }
//
//    $parent.append(renderedHTML);
};

var renderTalks = function(jsonData) {
    var $parent = $(".talks-parent"),
        htmlTemplate,
        talk,
        talkId,
        renderedHTML;

    htmlTemplate = '' +
        '        <div id="{{ id }}" class="talk row">' +
        '            <div class="index col-md-1">{{ index }}</div>' +
        '            <div class="col-md-2">' +
        '                <a href="{{ link }}">' +
        '                    <img class="img-thumbnail" src="img/talks/{{ id }}.jpg" alt=""/>' +
        '                </a>' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="talks-date">{{{ year }}}</div>' +
        '                {{{ authors }}} {{#link}}<a href="{{ link }}">{{/link}}<strong>{{{ title }}}</strong>{{#link}}</a>{{/link}}. {{{ publication }}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#links}}' +
        '                    <a href="{{ url }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-{{ icon }}"></span> {{ title }}</span></div></a>' +
        '                {{/links}}' +
        '            </div>' +
        '        </div>';


    if(!$parent || $parent.length === 0) {
        return;
    }

    renderedHTML = '';
    for(talkId = 0; talkId < jsonData.length; talkId++) {
        talk = jsonData[talkId];

        if (talk.links) {
            talk.links = addIconsToLinks(talk.links);
        }

        renderedHTML += Mustache.render(htmlTemplate, talk);
    }

    $parent.append(renderedHTML);
};
