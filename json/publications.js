/* Publication Type JSON structure
 *  Defines the different types of publications, the name to be displayed, and the order that they should be shown.
 *  The publication types will be shown in the same order that they are listed in this array.
 *  Each type object contains the following:
 *      name - the name of the type used in the "type" field of the projects JSON structure
 *      displayName - name of group displayed on the page
 */
var publicationTypesJSON = [
    {
        "name": "conference",
        "displayName": "Conference Publications"
    },
    {
        "name": "journal",
        "displayName": "Journal and Magazine Publications"
    },
    {
        "name": "workshop",
        "displayName": "Workshop Publications"
    },
    {
        "name": "thesis",
        "displayName": "Thesis"
    },
    {
        "name": "other",
        "displayName": "Other Articles"
    },
    {
        "name": "report",
        "displayName": "Technical Reports"
    }
];

/* Publications JSON structure
 *  The publication should be grouped by the "type" tag, with the display name and order defined by the publicationTypesJSON structure
 *  Within each group, the publications should appear in the order of the objects in the JSON structure.
 *  Each publication object contains the following:
 *      id - string, for referencing this pub in other JSON objects and the id of the <div>
 *           the URL for the thumbnail will be "img/publications/<id>.jpg" where <id> is replaced with the id
 *           always starts with pub_
 *      index - string, CV reference index that is displayed on the page
 *      type - string, determines which category the publication is displayed in, must be from the list of types described in publicationTypesJSON
 *      link - string or NULL, jump to this URL if the thumbnail or title is clicked. If NULL, then the thumbnail and title are not clickable.
 *      year - string, year of publication to display
 *      authors - string (with HTML), list of authors as displayed in citation. <span class="authorHighlight"> should be around my name.
 *      title - string, title of paper (clickable if link is not NULL)
 *      publication - string (with HTML), all text in the citation that appears after the title
 *      acceptance - string or NULL, acceptance rate message to display. If NULL, no acceptance rate is displayed.
 *      links - an array of the following object. Links are to appear in the order listed
 *          title - string, display text
 *          type - string, one of the following {doc, slides, video, recording, dl, pub, talk, proj, web}. The type determines the icon to show
 *          url - string, URL of the link (use #proj_id if a project link)
 *      relatedProjects - an array of project id (proj_id) strings. This allows the projects section of the page to list publication for each project.
 */
var publicationsJSON = [
    {
        "id": "pub_C9",
        "index": "C.9",
        "type": "conference",
        "link": "pdf/Chen_uTouch_chi13.pdf",
        "year": "2013",
        "authors": "Chen, K., <span class=\"authorHighlight\">Cohn, G.</span>, Gupta, S., Patel, S.N.",
        "title": "uTouch: Sensing Touch Gestures on Unmodified LCDs",
        "publication": "In the <em>Proceedings of CHI 2013</em> (April 27 - May 2, Paris, France), ACM, New York, 2013, pp. 2051-2054.",
        "acceptance": "20% (392/1963)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Chen_uTouch_chi13.pdf"
            },
            {
                "title": "Video",
                "type": "video",
                "url": "http://youtu.be/8p9DkwWVmfI"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://dl.acm.org/citation.cfm?id=2481356"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_utouch"
            }
        ],
        "relatedProjects": [ "proj_utouch" ]
    },
    {
        "id": "pub_C8",
        "index": "C.8",
        "type": "conference",
        "link": "pdf/Cohn_SEFS_ubicomp12.pdf",
        "year": "2012",
        "authors": "<span class=\"authorHighlight\">Cohn, G.</span>, Gupta, S., Lee, T., Morris, D., Smith, J.R., Reynolds, M.S., Tan, D.S., Patel, S.N.",
        "title": "An Ultra-Low-Power Human Body Motion Sensor Using Static Electric Field Sensing",
        "publication": "In the <em>Proceedings of Ubicomp 2012</em> (Sept. 5-8, Pittsburgh, PA), ACM, New York, 2012, pp. 99-102.",
        "acceptance": "19% (58/301)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_SEFS_ubicomp12.pdf"
            },
            {
                "title": "Video",
                "type": "video",
                "url": "http://youtu.be/Q4EzGqmDEJ8"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://dl.acm.org/citation.cfm?id=2370216.2370233"
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
        "id": "pub_C7",
        "index": "C.7",
        "type": "conference",
        "link": "pdf/Cohn_Humantenna_chi12.pdf",
        "year": "2012",
        "authors": "<span class=\"authorHighlight\">Cohn, G.</span>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole-Body Interaction",
        "publication": "In the <em>Proceedings of CHI 2012</em> (May 5-10, Austin, TX), ACM, New York, 2012, pp. 1901-1910.",
        "acceptance": "23% (370/1577)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_Humantenna_chi12.pdf"
            },
            {
                "title": "Video",
                "type": "video",
                "url": "http://www.youtube.com/watch?v=hfAk1Vnj6hM"
            },
            {
                "title": "Talk Recoding",
                "type": "recording",
                "url": "https://youtu.be/IkaYsGrgdbU"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://dl.acm.org/citation.cfm?id=2207676.2208330"
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
        "id": "pub_C6",
        "index": "C.6",
        "type": "conference",
        "link": "pdf/Cohn_NoiseCommand_chi11.pdf",
        "year": "2011",
        "authors": "<span class=\"authorHighlight\">Cohn, G.</span>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Your Noise is My Command: Sensing Gestures Using the Body as an Antenna",
        "publication": "In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 791-800.",
        "acceptance": "26% (400/1540)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_NoiseCommand_chi11.pdf"
            },
            {
                "title": "Talk Recording",
                "type": "recording",
                "url": "https://youtu.be/x0GvoYdAy6U"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://portal.acm.org/citation.cfm?id=1979058"
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
        "id": "pub_C5",
        "index": "C.5",
        "type": "conference",
        "link": "pdf/Badshah_InGen_chi11.pdf",
        "year": "2011",
        "authors": "Badshah, A., Gupta, S., <span class=\"authorHighlight\">Cohn, G.</span>, Villar, N., Hodges, S., Patel, S.N.",
        "title": "Interactive Generator: A Self-Powered Haptic Feedback Device",
        "publication": "In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 2051-2054.",
        "acceptance": "26% (400/1540)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Badshah_InGen_chi11.pdf"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://portal.acm.org/citation.cfm?id=1979240"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_ingen"
            }
        ],
        "relatedProjects": [ "proj_ingen" ]
    },
    {
        "id": "pub_C4",
        "index": "C.4",
        "type": "conference",
        "link": "pdf/Larson_HeatWave_chi11.pdf",
        "year": "2011",
        "authors": "Larson, E., <span class=\"authorHighlight\">Cohn, G.</span>, Gupta, S., Ren, X., Harrison, B., Fox, D., Patel, S.N.",
        "title": "HeatWave: Thermal Imaging for Surface User Interaction",
        "publication": "In the <em>Proceedings of CHI 2011</em> (May 7-12, Vancouver, Canada), ACM, New York, 2011, pp. 2565-2574.",
        "acceptance": "26% (400/1540)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Larson_HeatWave_chi11.pdf"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://portal.acm.org/citation.cfm?id=1979317"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_heatwave"
            }
        ],
        "relatedProjects": [ "proj_heatwave" ]
    },
    {
        "id": "pub_C3",
        "index": "C.3",
        "type": "conference",
        "link": "pdf/Campbell_WATTR_ubicomp10.pdf",
        "year": "2010",
        "authors": "Campbell, T., Larson, E., <span class=\"authorHighlight\">Cohn, G.</span>, Froehlich, J., ALcaide, R., Patel, S.N.",
        "title": "WATTR: A Method for Self-Powered Wireless Sensing of Water Activity in the Home",
        "publication": "In the <em>Proceedings of UbiComp 2010</em> (Sept. 26-29, Copenhagen, Denmark), ACM, New York, 2010, pp. 169-172.",
        "acceptance": "19% (39/202)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Campbell_WATTR_ubicomp10.pdf"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://portal.acm.org/citation.cfm?id=1864378"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_wattr"
            }
        ],
        "relatedProjects": [ "proj_wattr" ]
    },
    {
        "id": "pub_C2",
        "index": "C.2",
        "type": "conference",
        "link": "pdf/Cohn_SNUPI_ubicomp10.pdf",
        "year": "2010",
        "authors": "<span class=\"authorHighlight\">Cohn, G.</span>, Stuntebeck, E., Pandey, J., Otis, B., Abowd, G.D., Patel, S.N.",
        "title": "SNUPI: Sensor Nodes Utilizing Powerline Infrastructure",
        "publication": "In the <em>Proceedings of UbiComp 2010</em> (Sept. 26-29, Copenhagen, Denmark), ACM, New York, 2010, pp. 159-168.",
        "acceptance": "19% (39/202)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_SNUPI_ubicomp10.pdf"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://portal.acm.org/citation.cfm?id=1864349.1864377"
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
        "id": "pub_C1",
        "index": "C.1",
        "type": "conference",
        "link": "pdf/Cohn_GasSense_pervasive10.pdf",
        "year": "2010",
        "authors": "<span class=\"authorHighlight\">Cohn, G.</span>, Gupta, S., Froehlich, J., Larson, E., and Patel, S.N.",
        "title": "GasSense: Appliance-Level, Single-Point Sensing of Gas Activity in the Home",
        "publication": "In the <em>Proceedings of Pervasive 2010</em> (May 17-20, Helsinki, Finland), Springer-Verlag, Heidelberg, 2010, pp. 265-282.",
        "acceptance": "16% (26/161)",
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_GasSense_pervasive10.pdf"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://link.springer.com/chapter/10.1007/978-3-642-12654-3_16"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_gassense"
            }
        ],
        "relatedProjects": [ "proj_gassense" ]
    },
    {
        "id": "pub_J1",
        "index": "J.1",
        "type": "journal",
        "link": "pdf/Froehlich_DisagEnergy_IEEEpervasive11.pdf",
        "year": "2011",
        "authors": "Froehlich, J., Larson, E., Gupta, S., <span class=\"authorHighlight\">Cohn, G.</span>, Reynolds, M.S., Patel, S.N.",
        "title": "Disaggregated End-Use Energy for the Smart Grid",
        "publication": "<em>IEEE Pervasive Computing, Special Issue on Smart Energy Systems</em>, 10(1), Jan-Mar 2011, pp. 28-39.",
        "acceptance": null,
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Froehlich_DisagEnergy_IEEEpervasive11.pdf"
            },
            {
                "title": "Digital Library",
                "type": "dl",
                "url": "http://www.computer.org/portal/web/csdl/doi/10.1109/MPRV.2010.74"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_gassense"
            }
        ],
        "relatedProjects": [ "proj_gassense" ]
    },
    {
        "id": "pub_W1",
        "index": "W.1",
        "type": "workshop",
        "link": "pdf/Levin_ElectionFraud_EVTWOTE09.pdf",
        "year": "2009",
        "authors": "Levin, I., <span class=\"authorHighlight\">Cohn, G.A.</span>, Ordeshook, P.C., Alvarez, R.M.",
        "title": "Detecting Voter Fraud in an Electronic Voting Context: An Analysis of the Unlimited Reelection Vote in Venezuela",
        "publication": "In the <em>Proceedings of 2009 Electronic Voting Technology Workshop/Workshop on Trustworthy Elections (EVT/WOTE '09)</em> (Aug. 10-11, Montreal, Canada), USENIX, 2009.",
        "acceptance": null,
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Levin_ElectionFraud_EVTWOTE09.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_electionfraud"
            }
        ],
        "relatedProjects": [ "proj_electionfraud" ]
    },
    {
        "id": "pub_D1",
        "index": "D.1",
        "type": "thesis",
        "link": null,
        "year": "2014",
        "authors": "<span class=\"authorHighlight\">Cohn, G.A.</span>",
        "title": "SNUPI: Sensor Network Utilizing Powerline Infrastructure",
        "publication": "<em>University of Washington Doctoral Dissertation</em>, 2014.",
        "acceptance": null,
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
        "id": "pub_O1",
        "index": "O.1",
        "type": "other",
        "link": "pdf/Cohn_Humantenna_EEK12.pdf",
        "year": "2012",
        "authors": "<span class=\"authorHighlight\">Cohn, G.</span>, Morris, D., Patel, S.N., Tan, D.S.",
        "title": "Humantenna: Using the Body as an Antenna for Real-Time Whole- Body Interaction",
        "publication": "<em>University of Washington Electrical Engineering Kaleidoscope (EEK) Magazine</em>, 2012, p. 7.",
        "acceptance": null,
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_Humantenna_EEK12.pdf"
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
        "id": "pub_R3",
        "index": "R.3",
        "type": "report",
        "link": "pdf/Cohn_CADFeeds_07.pdf",
        "year": "2007",
        "authors": "<span class=\"authorHighlight\">Cohn, G.A.</span>",
        "title": "Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds",
        "publication": "<em>Caltech RF and Microwave Group</em>, 2007.",
        "acceptance": null,
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_CADFeeds_07.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_antennacad"
            }
        ],
        "relatedProjects": [ "proj_antennacad" ]
    },
    {
        "id": "pub_R2",
        "index": "R.2",
        "type": "report",
        "link": "pdf/Cohn_MeteorInterferometry_06.pdf",
        "year": "2006",
        "authors": "<span class=\"authorHighlight\">Cohn, G.A.</span>, Sahr, J.D.",
        "title": "Meteor radar interferometry using NEC antenna array simulations",
        "publication": "<em>University of Washington Radar Remote Sensing Laboratory</em>, 2006.",
        "acceptance": null,
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Cohn_MeteorInterferometry_06.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_rrsl06"
            }
        ],
        "relatedProjects": [ "proj_rrsl06" ]
    },
    {
        "id": "pub_R1",
        "index": "R.1",
        "type": "report",
        "link": "pdf/Lind_ISISFirstLight_06.pdf",
        "year": "2006",
        "authors": "Lind F., Berkowitz, Z., Morabito, A., Vertatschitsch, L., <span class=\"authorHighlight\">Cohn, G.</span>, Nguyen, K., Sahr, J.",
        "title": "RRSL Milestone: First E Region Irregularities on ISIS",
        "publication": "<em>University of Washington Radar Remote Sensing Laboratory</em>, 2006.",
        "acceptance": null,
        "links": [
            {
                "title": "Paper",
                "type": "doc",
                "url": "pdf/Lind_ISISFirstLight_06.pdf"
            },
            {
                "title": "Project Info",
                "type": "proj",
                "url": "#proj_rrsl06"
            }
        ],
        "relatedProjects": [ "proj_rrsl06" ]
    }
];
