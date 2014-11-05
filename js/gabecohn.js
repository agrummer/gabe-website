/*jslint browser: true*/
/*global $, jQuery, console, alert*/

var NAVBAR_VERTICAL_OFFSET = 70;

$(function () {
    "use strict";

//    $.getJSON("json/projects.json", function(json) {
//        renderProjects(json);
//    });

    // detect and apply Internet Explorer (IE) class (for IE 9-11)
    var isIE9 = !!navigator.userAgent.match(/MSIE 9\./);
    if (isIE9) {
        $('body').addClass("ie9");
    }
    var isIE10 = !!navigator.userAgent.match(/MSIE 10\./);
    if (isIE10) {
        $('body').addClass("ie10");
    }
    var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
    if (isIE11) {
        $('body').addClass("ie11");
    }
    if (isIE9 || isIE10 || isIE11) {
        $('body').addClass("msie");
    }

    renderProjects(projectsJSON);

    renderPublications(publicationsJSON);

    renderTalks(talksJSON);

    $('body').scrollspy({ target: '#navbar' });
    
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

var renderProjects = function(jsonData) {
    var $parent = $(".projects-parent"),
        projectTemplate,
        projectJSON,
        projectId,
        renderedHTML;

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
        '                        <img class="img-thumbnail" src="{{{ thumbnail }}}">' +
        '                    </div>' +
        '                    <div class="col-md-8">' +
        '                        <div class="projects-date">{{{ date }}}</div>' +
        '                        <div class="projects-title">{{{ title }}}</div>' +
        '                        <div class="projects-summary">{{{ summary }}}</div>' +
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
        '                        <div class="projects-description">{{{ description }}}</div>' +
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
    for(groupId = 0; groupId < jsonData.length; groupId++) {
        publicationGroup = jsonData[groupId];

        publicationGroup["id"] = groupId;

        renderedHTML += Mustache.render(htmlGroupStartTemplate, publicationGroup);

        for(publicationId = 0; publicationId < publicationGroup["publications"].length; publicationId++) {
            publication = publicationGroup["publications"][publicationId];

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

    htmlTemplate = '' +
        '        <div class="talk row">' +
        '            <div class="index col-md-1" id="talk-{{ index }}">{{ index }}</div>' +
        '            <div class="col-md-2"><a href="{{ slidesUrl }}">' +
        '                <img class="img-thumbnail" src="{{ thumbUrl }}" alt=""/></a>' +
        '            </div>' +
        '            <div class="col-md-6">' +
        '                <div class="talks-date">{{{ date }}}</div>' +
        '                {{{ authors }}} {{#slidesUrl}}<a href="{{ slidesUrl }}">{{/slidesUrl}}<strong>{{{ title }}}</strong>{{#slidesUrl}}</a>{{/slidesUrl}}. {{{ context }}}' +
        '            </div>' +
        '            <div class="col-md-3">' +
        '                {{#slidesUrl}}' +
        '                <a href="{{ slidesUrl }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-file"></span> slides</span></div></a>' +
        '                {{/slidesUrl}}' +
        '                {{#videoUrl}}' +
        '                <a href="{{ videoUrl }}"><div class="badge-video"><span class="label label-info"><span class="glyphicon glyphicon-film"></span> talk video</span></div></a>' +
        '                {{/videoUrl}}' +
        '                {{#project}}' +
        '                <a href="#{{ project }}"><div class="badge-publication"><span class="label label-info"><span class="glyphicon glyphicon-tag"></span> project info</span></div></a>' +
        '                {{/project}}' +
        '            </div>' +
        '        </div>';


    if(!$parent || $parent.length === 0) {
        return;
    }

    renderedHTML = '';
    for(talkId = 0; talkId < jsonData.length; talkId++) {
        talk = jsonData[talkId];

        renderedHTML += Mustache.render(htmlTemplate, talk);
    }

    $parent.append(renderedHTML);
};

var projectsJSON = [
    // {
    //     "key": "hydration",
    //     "title": "Continuous, Non-Invasive Hydration Monitoring",
    //     "thumbnail": "img/projects/Hydration.jpg",
    //     "date": "2013-Today",
    //     "org": "<a href=\"http://research.microsoft.com/en-us/labs/redmond/default.aspx\">Microsoft Research Redmond</a>",
    //     "summary": "This project is aimed at developing a non-invasive system to continuously monitor a person's \"hydration level\" throughout the day from a wearable device. The device uses bioimpedance spectroscopy in order to get a continuous measure of hydration.",
    //     "description": "To realize such a device, I hypothesize that bioimpedance spectroscopy can be used. Bioimpedance analysis has been widely used in consumer body composition scales for determining an estimate for a person's fat content. In clinical practice, these measurements have been shown to be accurate <i>assuming constant hydration level</i>. My hypothesis is that on the time-scale of minutes to hours, a person's body composition doesn't change significantly, and therefore variations in bioimpedance are due to changes in hydration. I have built custom analog circuitry to accurately perform bioimpedance spectroscopy, and am currently conducting experiments to test my hypothesis"
    // },
    {
        "key": "snupi",
        "title": "SNUPI: Ultra-Low-Power, General-Purpose Wireless Sensing Platform",
        "thumbnail": "img/projects/SNUPI.jpg",
        "date": "2009-2014",
        "org": "<a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>, <a href=\"http://ubicomp.cc.gatech.edu/\">Georgia Tech UbiComp Group</a>",
        "summary": "SNUPI (<u>S</u>ensor <u>N</u>etwork <u>U</u>tilizing <u>P</u>owerline <u>I</u>nfrastructure) is an ultra-low-power wireless sensor network platform that leverages the power line infrastructure of the building and uses it as part of the communications channel. This technology allows sensor nodes to operate for decades on a single coin cell battery, while still achieving whole-building range!",
        "description": "SNUPI (<u>S</u>ensor <u>N</u>etwork <u>U</u>tilizing <u>P</u>owerline <u>I</u>nfrastructure) is an ultra-low-power wireless sensor network platform that leverages the power line infrastructure of the building and uses it as part of the communications channel. In a traditional wireless sensor network, data is communicated over the air between the sensor nodes and a base station, perhaps after making several hops between the nodes. Using this over-the-air wireless communication, the battery life is typically limited by the high transmit power required for wireless signals to reach the receiver. In contrast, SNUPI uses a <i>powerline-coupled</i> wireless channel rather than an <i>over-the-air</i> channel. In a SNUPI network, the base station receiver is plugged into the power line, and uses the entire power line network as its receiving antenna. Therefore, to communicate data to the base station, sensor nodes can wirelessly transmit at extremely low power in order for their wireless signals to couple in the near-field onto the nearest power line, and then travel through the power line infrastructure like a transmission line to the base station receiver. Since the transmit power is so low, SNUPI nodes can operate for decades on a single coin cell battery! In addition, these networks have whole-building range because the power lines reach to all locations within the building.<br/><br/>Since there are many indoor applications of home monitoring, security, and automation, my collaborators and I co-founded a startup company called <a href=\"http://www.snupi.com\">SNUPI Technologies</a> to commercialize this work. The startup company has grown rapidly, and is now offering its first consumer product: <a href=\"http://www.wally-home.com\">WallyHome</a>. WallyHome consists of many sensors that are distributed around the house to continuously monitor for water leaks and measure temperature and humidity in order to alert customers of leaks and potential mold within their homes. In the future, we will continue to produce more easy-to-install sensor products using the SNUPI platform that are geared toward smart applications including home safety, security, automation, and peace of mind.",
        "publications": [
            "<strong>Cohn, G.</strong>, Stuntebeck, E., Pandey, J., Otis, B., Abowd, G.D., Patel, S.N. <a href=\"pdf/Cohn_SNUPI_ubicomp10.pdf\">SNUPI: Sensor Nodes Utilizing Powerline Infrastructure.</a> In the <em>Proceedings of UbiComp 2010</em> (Sept. 26-29, Copenhagen, Denmark), ACM, New York, 2010, pp. 159-168."
        ],
        "awards": [
            "Runner-Up for the Top Research Prize from Madrona Venture Group (Oct. 2010)",
            "Best Paper Nomination at UbiComp 2010 (Sept. 2010)"
        ],
        "press": [
            "<a href=\"http://seattlebusinessmag.com/article/bright-idea-snupi-technologies-wally\">Seattle Business Magazine</a>",
            "<a href=\"http://www.geekwire.com/2014/review-home-test-wally-water-leak-sensor-network/\">GeekWire</a>",
            "<a href=\"http://www.technologyreview.com/news/523741/nest-competitor-monitors-your-houses-leaks-on-the-cheap/\">MIT Technology Review</a>",
            "<a href=\"http://www.xconomy.com/seattle/2014/01/13/snupi-technologies-raises-7-5m-from-wrf-madrona-to-take-wally-to-market/\">Xconomy</a>",
            "<a href=\"http://www.geekwire.com/2014/snupi-raises-7-5m-series-home-sensor-network-wally/\">GeekWire</a>",
            "<a href=\"http://www.bizjournals.com/seattle/blog/techflash/2014/01/snupi-technologies-gets-75m-for.html?utm_campaign=Feed%3A+bizj_seattle+%28Puget+Sound+Business+Journal%29&s=article_search&utm_medium=feed&ana=RSS&utm_source=feedburner\">Puget Sound Business Journal</a>",
            "<a href=\"http://www.geekwire.com/2013/12-northwest-gifts-geek-love-geekwire-gift-guide-2013/\">GeekWire</a>",
            "<a href=\"http://www.xconomy.com/seattle/2013/11/15/snupi-technologies-home-sensor-network-monitors-water-leaks-babies/?single_page=true\">Xconomy</a>",
            "<a href=\"http://www.geekwire.com/2013/meet-wally-lowpower-wireless-sensor-network-detects-water-leaks-mold/\">GeekWire</a>",
            "<a href=\"http://www.geekwire.com/2013/big-jeremy-jaech-ceo-snupi-technologies/\">GeekWire</a>",
            "<a href=\"http://www.bizjournals.com/seattle/blog/techflash/2013/08/techflash-cup-snupi-technologies.html\">Puget Sound Business Journal</a>",
            "<a href=\"http://www.xconomy.com/seattle/2012/12/11/uw-spinout-funded-by-madrona-to-build-cheap-home-sensor-networks/\">Xconomy</a>",
            "<a href=\"http://www.geekwire.com/2012/jeremy-jaechs-home-sensor-startup-snupi-lands-15m-madrona/\">GeekWire</a>",
            "<a href=\"http://seattlebusinessmag.com/blog/serial-entrepreneur-jeremy-jaech-launches-new-company-uw-professor-shwetak-patel\">Seattle Business Magazine</a>",
            "<a href=\"http://www.bizjournals.com/seattle/blog/techflash/2012/12/snupi-technologies-latest-company-to.html\">Puget Sound Business Journal</a>",
            "<a href=\"http://seattletimes.com/html/technologybrierdudleysblog/2019881582_post_61.html\">The Seattle Times</a>",
            "Popular Mechanics",
            "<a href=\"http://www.technologyreview.com/communications/26319/?p1=A1&amp;a=f\">MIT Technology Review</a>",
            "<a href=\"http://www.techflash.com/seattle/2010/09/new_startup_from_uw_to_use_home_electrical_wiring_as_antenna.html?ana=from_rss&amp;utm_source=feedburner&amp;utm_medium=feed&amp;utm_campaign=Feed%3A+TechFlash+%28TechFlash+-+Seattle%27s+Technology+News+Source%29\">TechFlash</a>",
            "<a href=\"http://www.popsci.com/technology/article/2010-09/snupis-low-power-smart-home-sensors-communicate-copper-wiring-walls\">Popular Science</a>",
            "<a href=\"http://mobile.slashdot.org/story/10/09/16/1722204/Turning-Your-Home-Wiring-Into-a-Giant-Antenna\">Slashdot</a>",
            "<a href=\"http://cacm.acm.org/news/98897-homes-electrical-wiring-acts-as-antenna-to-receive-low-power-sensor-data/fulltext\">Communications of the ACM</a>"
        ]
    },
    {
        "key": "humantenna",
        "title": "Humantenna: Sensing Gestures Using the Body as an Antenna",
        "thumbnail": "img/projects/Humantenna.jpg",
        "date": "2010-2011",
        "org": "<a href=\"http://research.microsoft.com/en-us/labs/redmond/default.aspx\">Microsoft Research Redmond</a>",
        "summary": "Humantenna is an on-body sensing system that recognizes whole-body gestures using the human body as an antenna that receives the existing electromagnetic interference (EMI) or noise from the power lines and electronic devices in a building. This approach to sensing mobile, whole-body interaction requires no instrumentation to the environment, and only minimal instrumentation to the user.",
        "description": "Humantenna is an on-body sensing system that recognizes whole-body gestures using the human body as an antenna that receives the existing electromagnetic interference (EMI) or noise from the power lines and electronic devices in a building. Specifically, Humantenna uses changes that occur in the observed signal as the body moves to different poses. In addition to demonstrating the ability to recognize various whole-body gestures in real-time at 92.7% accuracy, Humantenna can robustly classify a person's location within a building among a small set of trained locations at 99.5% accuracy. This approach to sensing mobile, whole-body interaction requires no instrumentation to the environment, and only minimal instrumentation to the user.",
        "publications": [
            "<strong>Cohn, G.</strong>, Gupta, S., Goel, M., Chen, K., Patel, S.N. Supporting Ubiquitous Interaction Using Hidden Signals. Under Final Review for <em>Communications of the ACM</em>.",
            "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S. <a href=\"pdf/Cohn_Humantenna_chi12.pdf\">Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction</a>. <em>2012 Annual Conference on Human Factors in Computing Systems (CHI 2012)</em>, Austin, TX, 9 May 2012.",
            "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S. <a href=\"pdf/Cohn_NoiseCommand_chi11.pdf\">Your Noise is My Command: Sensing Gestures Using the Body as an Antenna</a>. <em>2011 Annual Conference on Human Factors in Computing Systems (CHI 2011)</em>, Vancouver, Canada, 9 May 2011."
        ],
        "awards": [
            "Honorable Mention Award at CHI 2012 (May 2012)",
            "Top Research Prize from Madrona Venture Group at UW CSE Affiliates Day (Oct. 2011)",
            "Best Paper Award at CHI 2011 (May 2011)"
        ],
        "press": [
            "<a href=\"http://www.newscientist.com/article/mg21428645.500-beyond-kinect-gestural-computer-spells-keyboard-death.html\">New Scientist</a>",
            "<a href=\"http://www.pcmag.com/article2/0,2817,2404093,00.asp\">PC Magazine</a>",
            "<a href=\"http://www.pcworld.com/article/255310/gesture_sensing_alternatives_use_radio_interference_doppler_effect.html\">PCWorld</a>",
            "<a href=\"http://www.youtube.com/watch?v=em-nvzxzC68&amp;feature=BFa&amp;list=UU7iialY1qmmcyFWilHAEVpA\">IDG News Service</a>",
            "<a href=\"http://www.geekwire.com/2011/typing-walking-cool-stuff-uw-students\">GeekWire</a>",
            "<a href=\"http://www.nytimes.com/2011/09/11/business/using-gestures-to-control-electronic-devices.html\">The New York Times</a>",
            "<a href=\"http://www.technologyreview.com/computing/37514/?p1=A1&amp;a=f\">MIT Technology Review</a>",
            "<a href=\"http://news.discovery.com/tech/human-antenna-electromagnetic-interference-110512.html\">Discovery News</a>",
            "<a href=\"http://techland.time.com/2011/05/11/could-microsoft-turn-our-bodies-into-antennas/\">TIME</a>",
            "<a href=\"http://blogs.wsj.com/tech-europe/2011/05/13/making-your-wall-an-input-device/?mod=google_news_blog\">The Wall Street Journal</a>",
            "<a href=\"http://www.newscientist.com/blogs/onepercent/2011/05/jim-giles-contributor-vancouve.html\">New Scientist</a>",
            "<a href=\"http://www.engadget.com/2011/05/11/microsoft-motion-controller-concept-kicks-sand-in-kinects-puny/\">Engadget</a>",
            "<a href=\"http://gizmodo.com/5800596/turn-everyday-objects-into-touch+sensitive-controllers\">Gizmodo</a>"
        ],
        "videos": [
            "Humantenna video (<a href=\"http://www.youtube.com/watch?v=hfAk1Vnj6hM\">youtube</a>, <a href=\"video/Cohn_Humantenna_chi12_video.mp4\">mp4</a> 41MB, <a href=\"video/Cohn_Humantenna_chi12_video.wmv\">wmv</a> 34MB)"
        ]
    },
    {
        "key": "sefs",
        "title": "Static Electric Field Sensing",
        "thumbnail": "img/projects/SEFS.jpg",
        "date": "2011-2012",
        "org": "<a href=\"http://research.microsoft.com/en-us/labs/redmond/default.aspx\">Microsoft Research Redmond</a>, <a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>",
        "summary": "This work explores an ultra-low-power method for passively sensing body motion using static electric fields by measuring the voltage at any single location on the body. Using this sensing is approach it is feasible to infer the amount and type of body motion anywhere on the body while consuming only 3.3 µW.",
        "description": "Wearable sensor systems have been used in the ubiquitous computing community and elsewhere for applications such as activity and gesture recognition, health and wellness monitoring, and elder care. Although the power consumption of accelerometers has already been highly optimized, this work introduces a novel sensing approach which lowers the power requirement for motion sensing by orders of magnitude. We present an ultra-low-power method for passively sensing body motion using static electric fields by measuring the voltage at any single location on the body. We present the feasibility of using this sensing approach to infer the amount and type of body motion anywhere on the body and demonstrate an ultra-low-power motion detector used to wake up more power-hungry sensors. The sensing hardware consumes only 3.3 µW, and wake-up detection is done using an additional 3.3 µW (6.6 µW total).",
        "publications": [
            "<strong>Cohn, G.</strong>, Gupta, S., Goel, M., Chen, K., Patel, S.N. Supporting Ubiquitous Interaction Using Hidden Signals. Under Final Review for <em>Communications of the ACM</em>.",
            "<strong>Cohn, G.</strong>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N. <a href=\"pdf/Cohn_SEFS_ubicomp12.pdf\">An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing</a>. <em>14th ACM International Conference on Ubiquitous Computing (UbiComp 2012)</em> Pittsburgh, PA, 5 September 2012."
        ],
        "awards": [
            "Best Paper Award at UbiComp 2012 (Sept. 2012)"
        ],
        "videos": [
            "Video (<a href=\"http://youtu.be/Q4EzGqmDEJ8\">youtube</a>, <a href=\"video/Cohn_SEFS_ubicomp12_video.mp4\">mp4</a> 19MB)"
        ]
    },
    {
        "key": "gassense",
        "title": "GasSense: Appliance-Level Single-Point Sensing of Gas Activity in the Home",
        "thumbnail": "img/projects/GasSense.jpg",
        "date": "2009-2010",
        "org": "<a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>",
        "summary": "GasSense is a prototype system for both detecting and identifying the activity of individual natural gas appliances using only a single acoustic sensor placed on the gas infrastructure of the home. This system can be used to provide eco-feedback to the home user, which studies have shown to result in significant decreases in energy consumption.",
        "description": "GasSense is a prototype system for both detecting and identifying the activity of individual natural gas appliances using only a single acoustic sensor placed on the gas infrastructure of the home. This system can be used to provide eco-feedback to the home user, which studies have shown to result in significant decreases in energy consumption. I worked with a variety of collaborators focused on human-computer interaction, sustainability, signal processing, machine learning, and mechanical engineering.",
        "publications": [
            "Froehlich, J., Larson, E., Gupta, S., <strong>Cohn, G.</strong>, Reynolds, M.S., Patel, S.N. <a href=\"pdf/Froehlich_DisagEnergy_IEEEpervasive11.pdf\">Disaggregated End-Use Energy for the Smart Grid.</a> <em>IEEE Pervasive Computing, Special Issue on Smart Energy Systems</em>, 10(1), Jan-Mar 2011, pp. 28-39.",
            "<strong>Cohn, G.</strong>, Gupta, S., Froehlich, J., Larson, E., and Patel, S.N. <a href=\"pdf/Cohn_GasSense_pervasive10.pdf\">GasSense: Appliance-Level, Single-Point Sensing of Gas Activity in the Home</a>. <em>8th International Conference on Pervasive Computing (Pervasive 2010)</em>, Helsinki, Finland, 19 May 2010."
        ],
        "awards": [
            "Top Research Prize from Madrona Venture Group at UW CSE Affiliates Day (Oct. 2009)"
        ]
    },
    {
        "key": "utouch",
        "title": "uTouch",
        "thumbnail": "img/projects/uTouch.jpg",
        "date": "2012-2013",
        "org": "<a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>",
        "summary": "uTouch is a system that detects and classifies touches and hovers without any modification to the display, and without adding any sensors to the user. Our approach utilizes existing EMI produced by LCDs and conducted onto the power lines. When a user brings their hand near or touches the LCD?s front panel, the EMI is amplified, which can be detected by a sensor plugged in  elsewhere on the power line infrastructure.",
        "description": "Current solutions for enabling touch interaction on existing non-touch LCD screens require adding additional sensors to the interaction surface. We present uTouch, a system that detects and classifies touches and hovers without any modification to the display, and without adding any sensors to the user. Our approach utilizes existing signals in an LCD that are amplified when a user brings their hand near or touches the LCD?s front panel. These signals are coupled onto the power lines, where they appear as electromagnetic interference (EMI) which can be sensed using a single device connected elsewhere on the power line infrastructure. We validate our approach with an 11 user, 8 LCD study, and demonstrate a real-time system.",
        "publications": [
            "<strong>Cohn, G.</strong>, Gupta, S., Goel, M., Chen, K., Patel, S.N. Supporting Ubiquitous Interaction Using Hidden Signals. Under Final Review for <em>Communications of the ACM</em>.",
            "<strong>Cohn, G.</strong>, Gupta, S., Patel, S.N. <a href=\"pdf/Chen_uTouch_chi13.pdf\">uTouch: Sensing Touch Gestures on Unmodified LCDs.</a> In the <em>Proceedings of CHI 2013</em> (April 27 - May 2, Paris, France), ACM, New York, 2013, pp. 2051-2054."
        ],
        "press": ["<a href=\"http://www.technologyreview.com/news/514061/a-simple-way-to-turn-any-lcd-into-a-touch-screen/\">MIT Technology Review</a>"],
        "videos": ["<a href=\"http://youtu.be/8p9DkwWVmfI\">Video</a> (youtube)"]
    },
    {
        "key": "wattr",
        "title": "WATTR: Self-Powered Wireless Sensing of Water Activity in the Home",
        "thumbnail": "img/projects/WATTR.jpg",
        "date": "2010",
        "org": "<a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>",
        "summary": "WATTR is a novel self-powered sensor that uses changes in a home's water pressure as both a powering and sensing source. WATTR is capable of sampling home water pressure and wirelessly transmitting when any water fixture in the home is opened or closed.",
        "description": "WATTR is a novel self-powered sensor that uses changes in a home's water pressure as both a powering and sensing source. WATTR is capable of sampling home water pressure and wirelessly transmitting when any water fixture in the home is opened or closed. WATTR provides an alternative sensing solution to the power intensive Bluetooth-based sensor used in the HydroSense project for single-point whole-home water usage. Unlike other water-based power harvesters, WATTR does not waste water to power itself because it harvests energy from changes in pressure not flow. Finally, WATTR is a viable self-powered sensor capable of monitoring and transmitting water usage data without the use of a battery.",
        "publications": ["Campbell, T., Larson, E., <strong>Cohn, G.</strong>, Froehlich, J., ALcaide, R., Patel, S.N. <a href=\"pdf/Campbell_WATTR_ubicomp10.pdf\">WATTR: A Method for Self-Powered Wireless Sensing of Water Activity in the Home.</a> In the <em>Proceedings of UbiComp 2010</em> (Sept. 26-29, Copenhagen, Denmark), ACM, New York, 2010, pp. 169-172."]
    },
    {
        "key": "ingen",
        "title": "InGen: Self-Powered Haptic Feedback Device",
        "thumbnail": "img/projects/InGen.jpg",
        "date": "2010-2011",
        "org": "<a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>, <a href=http://research.microsoft.com/en-us/labs/cambridge/\">Microsoft Research Cambridge</a>",
        "summary": "InGen is a self-powered wireless rotary input device capable of generating haptic or force feedback without the need for any external power source. Our approach uses a modified servomotor to perform three functions: (1) generating power for wireless communication and embedded electronics, (2) sensing the direction and speed of rotation, and (3) providing force feedback during rotation.",
        "description": "InGen is a self-powered wireless rotary input device capable of generating haptic or force feedback without the need for any external power source. Our approach uses a modified servomotor to perform three functions: (1) generating power for wireless communication and embedded electronics, (2) sensing the direction and speed of rotation, and (3) providing force feedback during rotation. While InGen is rotating, the device is capable of providing the sensation of detents or bumps, changes in stiffness, and stiff stops entirely through power that is harvested during interaction. To the best of our knowledge, InGen is the first self-powered device, which also provides haptic feedback during operation.",
        "publications": ["Badshah, A., Gupta, S., <strong>Cohn, G.</strong>, Villar, N., Hodges, S., Patel, S.N. <a href=\"pdf/Badshah_InGen_chi11.pdf\">Interactive Generator: A Self-Powered Haptic Feedback Device</a>. In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 2051-2054."],
        "awards": ["Best Note Award at CHI 2011 (May 2011)"]
    },
    {
        "key": "heatwave",
        "title": "HeatWave: Thermal Imaging for Surface User Interaction",
        "thumbnail": "img/projects/HeatWave.jpg",
        "date": "2010-2011",
        "org": "<a href=\"http://ubicomplab.cs.washington.edu/\">UW UbiComp Lab</a>, Intel Research Seattle",
        "summary": "HeatWave is a system that uses digital thermal imaging cameras to detect, track, and support user interaction on arbitrary surfaces. Example interactions include (1) distinguishing hovering above a surface from touch events, (2) shape-based gestures similar to ink strokes, (3) pressure based gestures, and (4) multi-finger gestures.",
        "description": "We present HeatWave, a system that uses digital thermal imaging cameras to detect, track, and support user interaction on arbitrary surfaces. Thermal sensing has had limited examination in the HCI research community and is generally under-explored outside of law enforcement and energy auditing applications. We examine the role of thermal imaging as a new sensing solution for enhancing user surface interaction. In particular, we demonstrate how thermal imaging in combination with existing computer vision techniques can make segmentation and detection of routine interaction techniques possible in real-time, and can be used to complement or simplify algorithms for traditional RGB and depth cameras. Example interactions include (1) distinguishing hovering above a surface from touch events, (2) shape-based gestures similar to ink strokes, (3) pressure based gestures, and (4) multi-finger gestures. We close by discussing the practicality of thermal sensing for naturalistic user interaction and opportunities for future work.",
        "publications": [
            "Larson, E., <strong>Cohn, G.</strong>, Gupta, S., Ren, X., Harrison, B., Fox, D., Patel, S.N. <a href=\"pdf/Larson_HeatWave_chi11.pdf\">HeatWave: Thermal Imaging for Surface User Interaction</a>. In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 2565-2574."
        ],
        "awards": ["Honorable Mention Award at CHI 2011 (May 2011)"]
    },
    {
        "key": "electionfraud",
        "title": "Detecting Voter Fraud from Electronic Voting Data",
        "thumbnail": "img/projects/ElectionFraud.jpg",
        "date": "Spring 2009",
        "org": "<a href=\"http://www.hss.caltech.edu/\">Caltech Political Science</a>",
        "summary": "Implemented new methods for obtaining and processing election data from foreign countries by mining the official election data posted on government websites. The data produced can be used to find anomalies in the official election data that could suggest the presence of election fraud.",
        "description": "This is an interdisciplinary research project that I did with the Caltech political science department. I realized that much of the work being done in the political science group could be performed more efficiently and accurately by applying some basic principles of computer science and engineering. I provided them with new methods of obtaining and processing election data from foreign countries by mining the official election data posted on government websites. This project resulted in a publication that discusses the use of computers in searching for indicators of election fraud based on official election returns.",
        "publications": [
            "Levin, I., <strong>Cohn, G.A.</strong>, Ordeshook, P.C., Alvarez, R.M. (2009), <a href=\"Levin_ElectionFraud_EVTWOTE09.pdf\">Detecting Voter Fraud in an Electronic Voting Context: An Analysis of the Unlimited Reelection Vote in Venezuela.</a> In the <em>Proceedings of 2009 Electronic Voting Technology Workshop/ Workshop on Trustworthy Elections</em> (EVT/WOTE '09) (August 10-11, Montreal, Canada), USENIX, 2009."
        ]
    },
    {
        "key": "antennacad",
        "title": "Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds",
        "thumbnail": "img/projects/WidebandAntenna.jpg",
        "date": "Summer 2007",
        "org": "<a href=\"http://www.its.caltech.edu/~mmic/group.html\">Caltech RF and Microwave Group</a>",
        "summary": "Created computer models of wideband dual-polarized quad-ridge horn antennas using the QuickWave EM analysis software and CST Microwave Studio. These antennas, made by ETS-Lindgren, can be optimized with the aid of my CAD models for use on wideband radio telescopes operating between 0.3 and 18 GHz.",
        "description": "I created computer models of wideband dual-polarized quad-ridge horn antennas using the QuickWave EM analysis software and CST Microwave Studio. These antennas, made by ETS-Lindgren, can be optimized with the aid of my CAD models for use on wideband radio telescopes operating between 0.3 and 18 GHz. The feeds of which I created CAD models are now installed on the Goldstone Apple Valley Radio Telescope (GAVRT) as part of the Lewis Center for Educational Research. GAVRT is a very unique educational telescope that allows schoolchildren to control the 34-meter dish via the Internet, download real data, and process the data in the classroom. The feed design that I worked with is also one of the top candidates for the Square Kilometer Array (SKA), which is an international effort to create the largest radio telescope in the world.",
        "publications": [
            "<strong>Cohn G.A.</strong> <a href=\"pdf/Cohn_CADFeeds_07.pdf\">Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds.</a> <em>Caltech RF and Microwave Group</em>, 2007."
        ]
    },
    {
        "key": "netlab",
        "title": "Network Routing Configuration Routines",
        "thumbnail": "img/projects/NetworkRouting.jpg",
        "date": "2007",
        "org": "<a href=\"http://netlab.caltech.edu/index.php\">Caltech NetLab</a>",
        "summary": "Improved scripts that control the optical switches used to route connections in a WAN test lab. The scripts dramatically improving the algorithms used to make network delays of a given length, and  allow the network hardware to be easily reconfigured to meet any test specification.",
        "description": "I have improved scripts that control the optical switches used to route connections on the <a href=\"http://wil.cs.caltech.edu\">WAN in Lab (WiL) Project</a>. I have converted an existing Perl script to Python, in addition to dramatically improving the algorithms used to make network delays of a given length. These scripts allow the network hardware to be easily reconfigured to meet WiL user specifications. WAN in Lab is a single laboratory containing over 2400 km of fiber optic cable. This allows detailed control and measurement from both ends of the WAN. The lab is used to aid FAST TCP research, and can be used as a TCP benchmarking facility.",
    },
    {
        "key": "rrsl06",
        "title": "Meteor Rader Interferometry using CAD Antenna Simulations",
        "thumbnail": "img/projects/RadarInterferometry.jpg",
        "date": "Summer 2006",
        "org": "<a href=\"http://rrsl.ee.washington.edu/\">UW Radar Remote Sensing Lab (RRSL)<\/a>",
        "summary": "Setup discone and log periodic dipole array (LPDA) antenna arrays at two locations for a passive radar interferometer. Created a full computer model of the new antenna arrays using the Numerical Electromagnetic Code (NEC) modeling software, and generated a spatial likelihood map of a scatter event using the computer simulation.",
        "description": "I setup new hardware systems at two locations for the Radar Remote Sensing Laboratory's passive radar system. Discone and Log Periodic Dipole Array (LPDA) antenna arrays were constructed and made operational. I conducted error calibration tests and created a full computer model of the new antenna array using the Numerical Electromagnetic Code (NEC) modeling software. Phase errors due to transmission line effects were studied, as well as a detailed exploration of the effect of mutual coupling between antennas in the array. The computer model of the array was used to produce an interferometer that can give the likelihood of a scatter event at every position in the sky. Graphical representations of these data were created using MATLAB code that I wrote specifically for this purpose. This new method of interferometry can be considered a vast improvement over traditional interferometry, because it gives not only the position of maximum likelihood of a scatter event such as a meteor, but also a map of likelihood of the meteor location across the whole sky.",
        "publications": [
            "<strong>Cohn, G.A.</strong>, Sahr, J.D. <a href=\"pdf/Cohn_MeteorInterferometry_06.pdf\">Meteor radar interferometry using NEC antenna array simulations.</a> <em>University of Washington Radar Remote Sensing Laboratory</em>, 2006.",
            "Lind F., Berkowitz, Z., Morabito, A., Vertatschitsch, L., <strong>Cohn, G.</strong>, Nguyen, K., Sahr, J. <a href=\"pdf/Lind_ISISFirstLight_06.pdf\">RRSL Milestone: First E Region Irregularities on ISIS.</a> <em>University of Washington Radar Remote Sensing Laboratory</em>, 2006."]
    },
    {
        "key": "rrsl05",
        "title": "Non-Linear Least Squares Curve Fitting for Radar Remote Sensing",
        "thumbnail": "img/projects/LMA.jpg",
        "date": "Summer 2005",
        "org": "<a href=\"http://rrsl.ee.washington.edu/\">UW Radar Remote Sensing Lab (RRSL)</a>",
        "summary": "Implemented a complex nonlinear least squares curve fitting algorithm based on the Levenberg-Marquardt Algorithm to process cross-correlation data from a passive radar interferometry system.",
        "description": "Using the Python programming language, I wrote software to process cross-correlation data from a passive radar interferometry system. The software included noise and signal splitting algorithms and a complex nonlinear least squares fitting algorithm based on the Levenberg-Marquardt Algorithm (LMA). I incorporated a curve fitter that used several different fitting models, including the Gaussian, Lorentzian, bi-modal, and composite models. The program selected the model with the best fit for each data set, and then output the processed data in a multitude of output formats."
    }
];

var publicationsJSON = [
    {
        "title": "Conference Publications",
        "publications": [
            {
                "index": "C.9",
                "date": "2013",
                "authors": "Chen, K., <strong>Cohn, G.</strong>, Gupta, S., Patel, S.N.",
                "title": "uTouch: Sensing Touch Gestures on Unmodified LCDs",
                "context": "In the <em>Proceedings of CHI 2013</em> (April 27 - May 2, Paris, France), ACM, New York, 2013, pp. 2051-2054.",
                "acceptanceRate": "20% (392/1963)",
                "awards": [

                ],
                "thumbUrl": "img/publications/Chen_uTouch_chi13.jpg",
                "paperUrl": "df/Chen_uTouch_chi13.pdf",
                "videoUrl": "http://youtu.be/8p9DkwWVmfI",
                "dlUrl": "http://dl.acm.org/citation.cfm?id=2481356",
                "project": "utouch"
            },
            {
                "index": "C.8",
                "date": "2012",
                "authors": "<strong>Cohn, G.</strong>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
                "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
                "context": "In the <em>Proceedings of Ubicomp 2012</em> (Sept. 5-8, Pittsburgh, PA), ACM, New York, 2012, pp. 99-102.",
                "acceptanceRate": "19% (58/301)",
                "awards": [
                    "Best Paper Award"
                ],
                "thumbUrl": "img/publications/Cohn_SEFS_ubicomp12.jpg",
                "paperUrl": "pdf/Cohn_SEFS_ubicomp12.pdf",
                "videoUrl": "http://youtu.be/Q4EzGqmDEJ8",
                "dlUrl": "http://dl.acm.org/citation.cfm?id=2370216.2370233",
                "project": "sefs"
            },
            {
                "index": "C.7",
                "date": "2012",
                "authors": "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S.",
                "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction",
                "context": "In the <em>Proceedings of CHI 2012</em> (May 5-10, Austin, TX), ACM, New York, 2012, pp. 1901-1910.",
                "acceptanceRate": "23% (370/1577)",
                "awards": [
                    "HONORABLE MENTION AWARD"
                ],
                "thumbUrl": "img/publications/Cohn_Humantenna_chi12.jpg",
                "paperUrl": "pdf/Cohn_Humantenna_chi12.pdf",
                "videoUrl": "http://www.youtube.com/watch?v=hfAk1Vnj6hM",
                "talkVideoUrl": "video/Cohn_Humantenna_chi12_talk.mp4",
                "dlUrl": "http://dl.acm.org/citation.cfm?id=2207676.2208330",
                "project": "humantenna"
            },
            {
                "index": "C.6",
                "date": "2011",
                "authors": "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S.",
                "title": "Your Noise is My Command: Sensing Gestures Using the Body as an Antenna",
                "context": "In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 791-800.",
                "acceptanceRate": "26% (400/1540)",
                "awards": [
                    "Best Paper Award"
                ],
                "thumbUrl": "img/publications/Cohn_NoiseCommand_chi11.jpg",
                "paperUrl": "pdf/Cohn_NoiseCommand_chi11.pdf",
                "talkVideoUrl": "video/Cohn_NoiseCommand_chi11_talk.mp4",
                "dlUrl": "http://portal.acm.org/citation.cfm?id=1979058",
                "project": "humantenna"
            },
            {
                "index": "C.5",
                "date": "2011",
                "authors": "Badshah, A., Gupta, S., <strong>Cohn, G.</strong>, Villar, N., Hodges, S., Patel, S.N.",
                "title": "Interactive Generator: A Self-Powered Haptic Feedback Device",
                "context": "In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 2051-2054.",
                "acceptanceRate": "26% (400/1540)",
                "awards": [
                    "Best Note Award"
                ],
                "thumbUrl": "img/publications/Badshah_InGen_chi11.jpg",
                "paperUrl": "pdf/Badshah_InGen_chi11.pdf",
                "dlUrl": "http://portal.acm.org/citation.cfm?id=1979240",
                "project": "ingen"
            },
            {
                "index": "C.4",
                "date": "2011",
                "authors": "Larson, E., <strong>Cohn, G.</strong>, Gupta, S., Ren, X., Harrison, B., Fox, D., Patel, S.N.",
                "title": "HeatWave: Thermal Imaging for Surface User Interaction",
                "context": "In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 2565-2574.",
                "acceptanceRate": "26% (400/1540)",
                "awards": [
                    "Honorable Mention Award"
                ],
                "thumbUrl": "img/publications/Larson_HeatWave_chi11.jpg",
                "paperUrl": "pdf/Larson_HeatWave_chi11.pdf",
                "dlUrl": "http://portal.acm.org/citation.cfm?id=1979317",
                "project": "heatwave"
            },
            {
                "index": "C.3",
                "date": "2010",
                "authors": "Campbell, T., Larson, E., <strong>Cohn, G.</strong>, Froehlich, J., ALcaide, R., Patel, S.N.",
                "title": "WATTR: A Method for Self-Powered Wireless Sensing of Water Activity in the Home",
                "context": "In the <em>Proceedings of UbiComp 2010</em> (Sept. 26-29, Copenhagen, Denmark), ACM, New York, 2010, pp. 169-172.",
                "acceptanceRate": "19% (39/202)",
                "awards": [

                ],
                "thumbUrl": "img/publications/Campbell_WATTR_ubicomp10.jpg",
                "paperUrl": "pdf/Campbell_WATTR_ubicomp10.pdf",
                "dlUrl": "http://portal.acm.org/citation.cfm?id=1864378",
                "project": "wattr"
            },
            {
                "index": "C.2",
                "date": "2010",
                "authors": "<strong>Cohn, G.</strong>, Stuntebeck, E., Pandey, J., Otis, B., Abowd, G.D., Patel, S.N.",
                "title": "SNUPI: Sensor Nodes Utilizing Powerline Infrastructure",
                "context": "In the <em>Proceedings of UbiComp 2010</em> (Sept. 26-29, Copenhagen, Denmark), ACM, New York, 2010, pp. 159-168.",
                "acceptanceRate": "19% (39/202)",
                "awards": [
                    "Best Paper Nominee"
                ],
                "thumbUrl": "img/publications/Cohn_SNUPI_ubicomp10.jpg",
                "paperUrl": "pdf/Cohn_SNUPI_ubicomp10.pdf",
                "dlUrl": "http://portal.acm.org/citation.cfm?id=1864349.1864377",
                "project": "snupi"
            },
            {
                "index": "C.1",
                "date": "2010",
                "authors": "<strong>Cohn, G.</strong>, Gupta, S., Froehlich, J., Larson, E., and Patel, S.N.",
                "title": "GasSense: Appliance-Level, Single-Point Sensing of Gas Activity in the Home",
                "context": "In the <em>Proceedings of Pervasive 2010</em> (May 17-20, Helsinki, Finland), Springer-Verlag, Heidelberg, 2010, pp. 265-282.",
                "acceptanceRate": "16% (26/161)",
                "awards": [

                ],
                "thumbUrl": "img/publications/Cohn_GasSense_pervasive10.jpg",
                "paperUrl": "http://gabeacohn.com/pdf/Cohn_GasSense_pervasive10.pdf",
                "project": "gassense"
            }
        ]
    },
    {
        "title": "Journal and Magazine Publications",
        "publications": [
            {
                "index": "J.2",
                "date": "2014",
                "authors": "<strong>Cohn, G.</strong>, Gupta, S., Goel, M., Chen, K., Patel, S.N.",
                "title": "Supporting Ubiquitous Interaction Using Hidden Signals",
                "context": "Under Final Review for <em>Communications of the ACM</em>.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Cohn_UbiInterfaces_CACM14.jpg",
                "paperUrl": "",
                "videoUrl": "",
                "dlUrl": "",
                "project": ""
            },
            {
                "index": "J.1",
                "date": "2011",
                "authors": "Froehlich, J., Larson, E., Gupta, S., <strong>Cohn, G.</strong>, Reynolds, M.S., Patel, S.N.",
                "title": "Disaggregated End-Use Energy for the Smart Grid",
                "context": "<em>IEEE Pervasive Computing, Special Issue on Smart Energy Systems</em>, 10(1), Jan-Mar 2011, pp. 28-39.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Froehlich_DisagEnergy_IEEEpervasive11.jpg",
                "paperUrl": "pdf/Froehlich_DisagEnergy_IEEEpervasive11.pdf",
                "videoUrl": "",
                "dlUrl": "http://www.computer.org/portal/web/csdl/doi/10.1109/MPRV.2010.74",
                "project": ""
            }
        ]
    },
    {
        "title": "Workshop Publications",
        "publications": [
            {
                "index": "W.1",
                "date": "2009",
                "authors": "Levin, I., <strong>Cohn, G.A.</strong>, Ordeshook, P.C., Alvarez, R.M. (2009),",
                "title": "Detecting Voter Fraud in an Electronic Voting Context: An Analysis of the Unlimited Reelection Vote in Venezuela",
                "context": "In the <em>Proceedings of 2009 Electronic Voting Technology Workshop/ Workshop on Trustworthy Elections (EVT/WOTE '09)</em> (August 10-11, Montreal, Canada), USENIX, 2009.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Levin_ElectionFraud_EVTWOTE09.jpg",
                "paperUrl": "pdf/Levin_ElectionFraud_EVTWOTE09.pdf",
                "videoUrl": "",
                "dlUrl": "",
                "project": "electionfraud"
            }
        ]
    },
    {
        "title": "Other Articles",
        "publications": [
            {
                "index": "O.1",
                "date": "2012",
                "authors": "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S.",
                "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole- Body Interaction",
                "context": "<em>University of Washington Electrical Engineering Kaleidoscope (EEK) Magazine</em>, 2012, p. 7.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Levin_ElectionFraud_EVTWOTE09.jpg",
                "paperUrl": "pdf/Cohn_Humantenna_EEK12.pdf",
                "videoUrl": "",
                "dlUrl": "",
                "project": "humantenna"
            }
        ]
    },
    {
        "title": "Technical Reports",
        "publications": [
            {
                "index": "R.3",
                "date": "2007",
                "authors": "<strong>Cohn G.A.</strong>",
                "title": "Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds",
                "context": "<em>Caltech RF and Microwave Group</em>, 2007.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Cohn_CADFeeds_07.jpg",
                "paperUrl": "pdf/Cohn_CADFeeds_07.pdf",
                "videoUrl": "",
                "dlUrl": "",
                "project": "antennacad"
            },
            {
                "index": "R.2",
                "date": "2006",
                "authors": "<strong>Cohn, G.A.</strong>, Sahr, J.D.",
                "title": "Meteor radar interferometry using NEC antenna array simulations",
                "context": "<em>University of Washington Radar Remote Sensing Laboratory</em>, 2006.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Cohn_MeteorInterferometry_06.jpg",
                "paperUrl": "pdf/Cohn_MeteorInterferometry_06.pdf",
                "videoUrl": "",
                "dlUrl": "",
                "project": "rrsl06"
            },
            {
                "index": "R.1",
                "date": "2006",
                "authors": "Lind F., Berkowitz, Z., Morabito, A., Vertatschitsch, L., <strong>Cohn, G.</strong>, Nguyen, K., Sahr, J.",
                "title": "RRSL Milestone: First E Region Irregularities on ISIS",
                "context": "<em>University of Washington Radar Remote Sensing Laboratory</em>, 2006.",
                "acceptanceRate": "",
                "awards": [

                ],
                "thumbUrl": "img/publications/Lind_ISISFirstLight_06.jpg",
                "paperUrl": "pdf/Lind_ISISFirstLight_06.pdf",
                "videoUrl": "",
                "dlUrl": "",
                "project": "rrsl06"
            }
        ]
    }
];

var talksJSON = [
    {
        "index": "T.12",
        "date": "2013",
        "authors": "<strong>Cohn, G.</strong>",
        "title": "SNUPI: Sensor Network Utilizing Powerline Infrastructure",
        "context": "<em>2013 ACEEE Hot Water Forum</em>, Atlanta, GA, 5 November 2013.",
        "thumbUrl": "img/talks/t12.jpg",
        "slidesUrl": "pdf/Cohn_SNUPI_HotWater13_talk.pdf",
        "videoUrl": "",
        "project": "snupi"
    },
    {
        "index": "T.11",
        "date": "2013",
        "authors": "<strong>Cohn, G.</strong>",
        "title": "The University of Washington Ubicomp Lab: A Research Overview",
        "context": "<em>Georgia Tech Invited Talk</em>, Atlanta, GA, 5 November 2013.",
        "thumbUrl": "img/talks/t11.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": ""
    },
    {
        "index": "T.10",
        "date": "2013",
        "authors": "<strong>Cohn, G.</strong> and Gupta, S.",
        "title": "Hacks for Innovation: Our Approach to Technology Innovations by Hacking Our Surroundings",
        "context": "<em>Hack Things Meetup</em>, Seattle, WA, 2 August 2013.",
        "thumbUrl": "img/talks/t10.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": ""
    },
    {
        "index": "T.9",
        "date": "2013",
        "authors": "<strong>Cohn, G.</strong> and Gupta, S.",
        "title": "Ubiquitous Computing: Sensing Systems for Human Activity, Context, and Everywhere Interactions",
        "context": "<em>University of Washington Arch 498D: Creating Responsive Environments</em>, Guest Lecture, Seattle, WA, 22 January 2013.",
        "thumbUrl": "img/talks/t9.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": ""
    },
    {
        "index": "T.8",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "context": "<em>University of Washington Computer Science & Engineering Affiliates 2012</em>, Seattle, WA, 24 October 2012.",
        "thumbUrl": "img/talks/t8.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": "sefs"
    },
    {
        "index": "T.7",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong>, Gupta, S., Goel, M.",
        "title": "An Overview of the Research in UW Ubicomp Lab",
        "context": "<em>Disney Research Pittsburgh</em>, Pittsburgh, PA, 7 September 2012.",
        "thumbUrl": "img/talks/t7.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": ""
    },
    {
        "index": "C.8",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "context": "<em>14th ACM International Conference on Ubiquitous Computing (UbiComp 2012)</em>, Pittsburgh, PA, 5 September 2012.",
        "thumbUrl": "img/talks/c8.jpg",
        "slidesUrl": "pdf/Cohn_SEFS_ubicomp12_talk.pdf",
        "videoUrl": "",
        "project": "sefs"
    },
    {
        "index": "T.6",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction",
        "context": "<em>2012 Microsoft Research Faculty Summit</em>, Redmond, WA, 16 July 2012.",
        "thumbUrl": "img/talks/t6.jpg",
        "slidesUrl": "pdf/Cohn_Humantenna_MSRFacultySummit12_talk.pdf",
        "videoUrl": "",
        "project": "humantenna"
    },
    {
        "index": "T.5",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong> and Gupta, S.",
        "title": "Sensor Based Interactions",
        "context": "<em>University of Washington INFO 463: Input and Interaction</em>, Guest Lecture, Seattle, WA, 23 May 2012.",
        "thumbUrl": "img/talks/t5.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": ""
    },
    {
        "index": "T.4",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "context": "<em>Microsoft Research Recently Written Series</em>, Redmond, WA, 17 May 2012.",
        "thumbUrl": "img/talks/t4.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": "sefs"
    },
    {
        "index": "C.7",
        "date": "2012",
        "authors": "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction",
        "context": "<em>2012 Annual Conference on Human Factors in Computing Systems (CHI 2012)</em>, Austin, TX, 9 May 2012.",
        "thumbUrl": "img/talks/c7.jpg",
        "slidesUrl": "pdf/Cohn_Humantenna_chi12_talk.pdf",
        "videoUrl": "video/Cohn_Humantenna_chi12_talk.mp4",
        "project": "humantenna"
    },
    {
        "index": "C.6",
        "date": "2011",
        "authors": "<strong>Cohn, G.</strong>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Your Noise is My Command: Sensing Gestures Using the Body as an Antenna",
        "context": "<em>2011 Annual Conference on Human Factors in Computing Systems (CHI 2011)</em>, Vancouver, Canada, 9 May 2011.",
        "thumbUrl": "img/talks/c6.jpg",
        "slidesUrl": "pdf/Cohn_NoiseCommand_chi11_talk.pdf",
        "videoUrl": "video/Cohn_NoiseCommand_chi11_talk.mp4",
        "project": "humantenna"
    },
    {
        "index": "T.3",
        "date": "2011",
        "authors": "<strong>Cohn, G.</strong>",
        "title": "Repurposing the Home Powerlines",
        "context": "<em>University of Washington EE 592 Seminar</em>, Seattle, WA, 18 February 2011.",
        "thumbUrl": "img/talks/t3.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": ""
    },
    {
        "index": "T.2",
        "date": "2010",
        "authors": "<strong>Cohn, G.</strong>, Patel, S.",
        "title": "SNUPI: Sensor Nodes Utilizing Powerline Infrastructure, Ultra-Low-Power, General-Purpose, Wireless Sensing Platform",
        "context": "<em>University of Washington Computer Science & Engineering Affiliates 2010</em>, Seattle, WA, 27 October 2010.",
        "thumbUrl": "img/talks/t2.jpg",
        "slidesUrl": "pdf/Cohn_SNUPI_affiliates10_talk.pdf",
        "videoUrl": "",
        "project": "snupi"
    },
    {
        "index": "C.2",
        "date": "2010",
        "authors": "<strong>Cohn, G.</strong>, Stuntebeck, E., Pandey, J., Otis, B., Abowd, G.D., Patel, S.N.",
        "title": "SNUPI: Sensor Nodes Utilizing Powerline Infrastructure",
        "context": "<em>12th ACM International Conference on Ubiquitous Computing (UbiComp 2010)</em>, Copenhagen, Denmark, 28 September 2010.",
        "thumbUrl": "img/talks/c2.jpg",
        "slidesUrl": "pdf/Cohn_SNUPI_ubicomp10_talk.pdf",
        "videoUrl": "",
        "project": "snupi"
    },
    {
        "index": "C.1",
        "date": "2010",
        "authors": "<strong>Cohn, G.</strong>, Gupta, S., Froehlich, J., Larson, E., and Patel, S.N.",
        "title": "GasSense: Appliance-Level, Single-Point Sensing of Gas Activity in the Home",
        "context": "<em>8th International Conference on Pervasive Computing (Pervasive 2010)</em>, Helsinki, Finland, 19 May 2010.",
        "thumbUrl": "img/talks/c1.jpg",
        "slidesUrl": "",
        "videoUrl": "",
        "project": "gassense"
    },
    {
        "index": "T.1",
        "date": "2007",
        "authors": "<strong>Cohn G.A.</strong>",
        "title": "Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds",
        "context": "<em>Caltech Internal Microwave Seminar</em>, Pasadena, CA, 19 September 2007.",
        "thumbUrl": "img/talks/t1.jpg",
        "slidesUrl": "pdf/Cohn_CADFeeds_talk07.pdf",
        "videoUrl": "",
        "project": "antennacad"
    }
];
