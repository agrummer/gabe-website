/* Talks JSON structure
 *  The talks should appear in the order of the objects in the JSON structure.
 *  Each talk object contains the following:
 *      id - string, for referencing this talk in other JSON objects and the id of the <div>
 *           the URL for the thumbnail will be "img/talks/<id>.jpg" where <id> is replaced with the id
 *           always starts with talk_
 *      index - string, CV reference index that is displayed on the page
 *      type - string, determines which category of the talk (not currently used).
 *      link - string or NULL, jump to this URL if the thumbnail or title is clicked. If NULL, then the thumbnail and title are not clickable.
 *      year - string, year of talk to display
 *      sortDate - string in the form YYYY-MM-DD, not currently used, but could be used to sort talks by date
 *      authors - string (with HTML), list of authors as displayed in citation. <div class="authorHighlight"> should be around my name.
 *      title - string, title of talk (clickable if link is not NULL)
 *      publication - string (with HTML), all text in the citation that appears after the title
 *      links - an array of the following object. Links are to appear in the order listed
 *          title - string, display text
 *          type - string, one of the following {doc, slides, video, dl, pub, talk, proj, web}. The type determines the icon to show
 *          url - string, URL of the link (use #proj_id if a project link)
 *      relatedProjects - an array of project id (proj_id) strings. This allows the projects section of the page to list talks for each project.
 *      relatedPublications - an array of publication id (pub_id) strings. This allows the publications section of the page to list talks for each publication.
 */
var talksJSON = [
    {
        "id": "talk_T14",
        "index": "T.14",
        "type": "defense",
        "link": null,
        "year": "2014",
        "sortDate": "2014-06-09",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>",
        "title": "SNUPI: Sensor Network Utilizing Powerline Infrastructure",
        "publication": "<em>University of Washington Doctoral Defense</em>, June 9, 2014.",
        "links": [
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_snupi"
            }
        ],
        "relatedProjects": [ "proj_snupi" ]
    },
    {
        "id": "talk_T13",
        "index": "T.13",
        "type": "invited",
        "link": null,
        "year": "2014",
        "sortDate": "2014-02-13",
        "authors": "<div class=\"authorHighlight\">Cohn, G.A.</div>",
        "title": "Building Embedded Sensor Systems to Bring Ubicomp to Life",
        "publication": "<em>Cornell University</em> (Feb. 13), <em>Stanford University</em> (Feb. 18), <em>University of California Berkeley</em> (Feb. 20), <em>University of Wisconsin Madison</em> (Mar. 3), <em>University of Illinois Urbana-Champaign</em> (Mar. 5), <em>Microsoft Research</em> (Mar. 12), <em>University of Wisconsin Madison</em> (Mar. 17), <em>Princeton University</em> (Mar. 25), <em>Harvard University</em> (Mar. 27), <em>Massachusetts Institute of Technology</em> (Mar. 31), <em>University of California Los Angeles</em> (April 3), <em>Columbia University</em> (April 7), 2014.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_T12",
        "index": "T.12",
        "type": "conference",
        "link": "pdf/Cohn_SNUPI_HotWater13_talk.pdf",
        "year": "2013",
        "sortDate": "2013-11-05",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>",
        "title": "SNUPI: Sensor Network Utilizing Powerline Infrastructure",
        "publication": "<em>2013 ACEEE Hot Water Forum</em>, Atlanta, GA, Nov. 5, 2013.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_SNUPI_HotWater13_talk.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_snupi"
            }
        ],
        "relatedProjects": [ "proj_snupi" ]
    },
    {
        "id": "talk_T11",
        "index": "T.11",
        "type": "invited",
        "link": null,
        "year": "2013",
        "sortDate": "2013-11-05",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>",
        "title": "The University of Washington Ubicomp Lab: A Research Overview",
        "publication": "<em>Georgia Tech Invited Talk</em>, Atlanta, GA, Nov. 5, 2013.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_T10",
        "index": "T.10",
        "type": "invited",
        "link": null,
        "year": "2013",
        "sortDate": "2013-08-02",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div> and Gupta, S.",
        "title": "Hacks for Innovation: Our Approach to Technology Innovations by Hacking Our Surroundings",
        "publication": "<em>Hack Things Meetup</em>, Seattle, WA, Aug. 2, 2013.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_T9",
        "index": "T.9",
        "type": "guestLect",
        "link": null,
        "year": "2013",
        "sortDate": "2013-01-22",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div> and Gupta, S.",
        "title": "Ubiquitous Computing: Sensing Systems for Human Activity, Context, and Everywhere Interactions",
        "publication": "<em>University of Washington Arch 498D: Creating Responsive Environments</em>, Guest Lecture, Seattle, WA, Jan. 22, 2013.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_T8",
        "index": "T.8",
        "type": "invited",
        "link": null,
        "year": "2012",
        "sortDate": "2012-10-24",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "publication": "<em>University of Washington Computer Science & Engineering Affiliates 2012</em>, Seattle, WA, Oct. 24, 2012.",
        "links": [
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_sefs"
            }
        ],
        "relatedProjects": [ "proj_sefs" ]
    },
    {
        "id": "talk_T7",
        "index": "T.7",
        "type": "invited",
        "link": null,
        "year": "2012",
        "sortDate": "2012-09-07",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Gupta, S., Goel, M.",
        "title": "An Overview of the Research in UW Ubicomp Lab",
        "publication": "<em>Disney Research Pittsburgh</em>, Pittsburgh, PA, Sept. 7, 2012.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_C8",
        "index": "C.8",
        "type": "conference",
        "link": "pdf/Cohn_SEFS_ubicomp12_talk.pdf",
        "year": "2012",
        "sortDate": "2012-09-05",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "publication": "<em>14th ACM International Conference on Ubiquitous Computing (UbiComp 2012)</em>, Pittsburgh, PA, Sept. 5, 2012.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_SEFS_ubicomp12_talk.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_sefs"
            }
        ],
        "relatedProjects": [ "proj_sefs" ]
    },
    {
        "id": "talk_T6",
        "index": "T.6",
        "type": "invited",
        "link": "pdf/Cohn_Humantenna_MSRFacultySummit12_talk.pdf",
        "year": "2012",
        "sortDate": "2012-07-16",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction",
        "publication": "<em>2012 Microsoft Research Faculty Summit</em>, Redmond, WA, July 16, 2012.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_Humantenna_MSRFacultySummit12_talk.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_humantenna"
            }
        ],
        "relatedProjects": [ "proj_humantenna" ]
    },
    {
        "id": "talk_T5",
        "index": "T.5",
        "type": "guestLect",
        "link": null,
        "year": "2012",
        "sortDate": "2012-05-23",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div> and Gupta, S.",
        "title": "Sensor Based Interactions",
        "publication": "<em>University of Washington INFO 463: Input and Interaction</em>, Guest Lecture, Seattle, WA, May 23, 2012.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_T4",
        "index": "T.4",
        "type": "internal",
        "link": null,
        "year": "2012",
        "sortDate": "2012-05-17",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "publication": "<em>Microsoft Research Recently Written Series</em>, Redmond, WA, May 17, 2012.",
        "links": [
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_sefs"
            }
        ],
        "relatedProjects": [ "proj_sefs" ]
    },
    {
        "id": "talk_C7",
        "index": "C.7",
        "type": "conference",
        "link": "pdf/Cohn_Humantenna_chi12_talk.pdf",
        "year": "2012",
        "sortDate": "2012-05-09",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction",
        "publication": "<em>2012 Annual Conference on Human Factors in Computing Systems (CHI 2012)</em>, Austin, TX, May 9, 2012.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_Humantenna_chi12_talk.pdf"
            },
            {
                "title": "Talk Video",
                "type": "video",
                "url": "video/Cohn_Humantenna_chi12_talk.mp4"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_humantenna"
            }
        ],
        "relatedProjects": [ "proj_humantenna" ]
    },
    {
        "id": "talk_C6",
        "index": "C.6",
        "type": "conference",
        "link": "pdf/Cohn_NoiseCommand_chi11_talk.pdf",
        "year": "2011",
        "sortDate": "2011-05-09",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Your Noise is My Command: Sensing Gestures Using the Body as an Antenna",
        "publication": "<em>2011 Annual Conference on Human Factors in Computing Systems (CHI 2011)</em>, Vancouver, Canada, May 9, 2011.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_NoiseCommand_chi11_talk.pdf"
            },
            {
                "title": "Talk Video",
                "type": "video",
                "url": "video/Cohn_NoiseCommand_chi11_talk.mp4"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_humantenna"
            }
        ],
        "relatedProjects": [ "proj_humantenna" ]
    },
    {
        "id": "talk_T3",
        "index": "T.3",
        "type": "guestLect",
        "link": null,
        "year": "2011",
        "sortDate": "2011-02-18",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>",
        "title": "Repurposing the Home Powerlines",
        "publication": "<em>University of Washington EE 592 Seminar</em>, Seattle, WA, Feb. 18, 2011.",
        "links": [
        ],
        "relatedProjects": [ ]
    },
    {
        "id": "talk_T2",
        "index": "T.2",
        "type": "invited",
        "link": "pdf/Cohn_SNUPI_affiliates10_talk.pdf",
        "year": "2010",
        "sortDate": "2010-10-27",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Patel, S.",
        "title": "SNUPI: Sensor Nodes Utilizing Powerline Infrastructure, Ultra-Low-Power, General-Purpose, Wireless Sensing Platform",
        "publication": "<em>University of Washington Computer Science & Engineering Affiliates 2010</em>, Seattle, WA, Oct. 27, 2010.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_SNUPI_affiliates10_talk.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_snupi"
            }
        ],
        "relatedProjects": [ "proj_snupi" ]
    },
    {
        "id": "talk_C2",
        "index": "C.2",
        "type": "conference",
        "link": "pdf/Cohn_SNUPI_ubicomp10_talk.pdf",
        "year": "2010",
        "sortDate": "2010-09-28",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Stuntebeck, E., Pandey, J., Otis, B., Abowd, G.D., Patel, S.N.",
        "title": "SNUPI: Sensor Nodes Utilizing Powerline Infrastructure",
        "publication": "<em>12th ACM International Conference on Ubiquitous Computing (UbiComp 2010)</em>, Copenhagen, Denmark, Sept. 28, 2010.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_SNUPI_ubicomp10_talk.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_snupi"
            }
        ],
        "relatedProjects": [ "proj_snupi" ]
    },
    {
        "id": "talk_C1",
        "index": "C.1",
        "type": "conference",
        "link": null,
        "year": "2010",
        "sortDate": "2010-05-19",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>, Gupta, S., Froehlich, J., Larson, E., and Patel, S.N.",
        "title": "GasSense: Appliance-Level, Single-Point Sensing of Gas Activity in the Home",
        "publication": "<em>8th International Conference on Pervasive Computing (Pervasive 2010)</em>, Helsinki, Finland, May 19, 2010.",
        "links": [
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_gassense"
            }
        ],
        "relatedProjects": [ "proj_gassense" ]
    },
    {
        "id": "talk_T1",
        "index": "T.1",
        "type": "internal",
        "link": "pdf/Cohn_CADFeeds_talk07.pdf",
        "year": "2007",
        "sortDate": "2007-09-19",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>",
        "title": "Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds",
        "publication": "<em>Caltech Internal Microwave Seminar</em>, Pasadena, CA, Sept. 19, 2007.",
        "links": [
            {
                "title": "Slides",
                "type": "slides",
                "url": "pdf/Cohn_CADFeeds_talk07.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_antennacad"
            }
        ],
        "relatedProjects": [ "proj_antennacad" ]
    }
];
