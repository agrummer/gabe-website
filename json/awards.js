/* Awards JSON structure
 *  Each award object contains the following:
 *      shortName - string, short name of award to display in publications/talks section
 *      longName - string, long name/description of award to display in projects section
 *      sortDate - string in the form YYYY-MM-DD. Used to sort awards by date
 *      displayDate - string, date to be displayed
 *      relatedProjects - an array of project id (proj_id) strings. This allows the projects section of the page to list awards for each project.
 *      relatedPublications - an array of publication id (pub_id) strings. This allows the publications section of the page to list awards for each publication.
 *      relatedTalks - an array of talk id (talk_id) strings. This allows the talks section of the page to list awards for each talk.
 */
var awardsJSON = [
    {
        "shortName": "Best Paper Award",
        "longName": "Best Paper Award at Ubicomp 2012",
        "sortDate": "2012-09-05",
        "displayDate": "Sept. 2012",
        "relatedProjects": [ "proj_sefs" ],
        "relatedPublications": [ "pub_C8" ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Honorable Mention Award",
        "longName": "Honorable Mention Award at CHI 2012",
        "sortDate": "2012-05-05",
        "displayDate": "May 2012",
        "relatedProjects": [ "proj_humantenna" ],
        "relatedPublications": [ "pub_C7" ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Top Research Prize",
        "longName": "Top Research Prize from Madrona Venture Group",
        "sortDate": "2011-10-19",
        "displayDate": "Oct. 2011",
        "relatedProjects": [ "proj_humantenna" ],
        "relatedPublications": [ ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Best Paper Award",
        "longName": "Best Paper Award at CHI 2011",
        "sortDate": "2011-05-07",
        "displayDate": "May 2011",
        "relatedProjects": [ "proj_humantenna" ],
        "relatedPublications": [ "pub_C6" ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Best Note Award",
        "longName": "Best Note Award at CHI 2011",
        "sortDate": "2011-05-07",
        "displayDate": "May 2011",
        "relatedProjects": [ "proj_ingen" ],
        "relatedPublications": [ "pub_C5" ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Honorable Mention Award",
        "longName": "Honorable Mention Award at CHI 2011",
        "sortDate": "2011-05-07",
        "displayDate": "May 2011",
        "relatedProjects": [ "proj_heatwave" ],
        "relatedPublications": [ "pub_C4" ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Runner-Up for the Top Research Prize",
        "longName": "Runner-Up for the Top Research Prize from Madrona Venture Group",
        "sortDate": "2010-10-27",
        "displayDate": "Oct. 2010",
        "relatedProjects": [ "proj_snupi" ],
        "relatedPublications": [ ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Best Paper Nomination",
        "longName": "Best Paper Nomination at Ubicomp 2010",
        "sortDate": "2010-09-26",
        "displayDate": "Sept. 2010",
        "relatedProjects": [ "proj_snupi" ],
        "relatedPublications": [ "pub_C2" ],
        "relatedTalks": [ ]
    },
    {
        "shortName": "Top Research Prize",
        "longName": "Top Research Prize from Madrona Venture Group",
        "sortDate": "2009-10-29",
        "displayDate": "Oct. 2009",
        "relatedProjects": [ "proj_gassense" ],
        "relatedPublications": [ ],
        "relatedTalks": [ ]
    }
];
