/* Talks JSON structure
 The talks should appear in the order of the objects in the JSON structure.
 Each talk object contains the following:
 id - string, for referencing this talk in other JSON objects and the id of the <div>
 the URL for the thumbnail will be "img/talks/<id>.jpg" where <id> is replaced with the id
 always starts with talk_
 index - string, CV reference index that is displayed on the page
 type - string, determines which category of the talk (not currently used).
 link - string or NULL, jump to this URL if the thumbnail or title is clicked. If NULL, then the thumbnail and title are not clickable.
 year - string, year of talk to display
 sortDate - string in the form YYYY-MM-DD, not currently used, but could be used to sort talks by date
 authors - string (with HTML), list of authors as displayed in citation. <div class="authorHighlight"> should be around my name.
 title - string, title of talk (clickable if link is not NULL)
 publication - string (with HTML), all text in the citation that appears after the title
 links - an array of the following object. Links are to appear in the order listed
 title - string, display text
 type - string, one of the following {doc, slides, video, dl, pub, talk, proj, web}. The type determines the icon to show
 url - string, URL of the link (use #proj_id if a project link)
 relatedProjects - an array of project id (proj_id) strings. This allows the projects section of the page to list talks for each project.
 relatedPublications - an array of publication id (pub_id) strings. This allows the publications section of the page to list talks for each publication.
 */
var talksJSON = [
    {
        "id": "talk_T11",
        "index": "T.11",
        "type": "invited",
        "link": null,
        "year": "2013",
        "sortDate": "2013-11-05",
        "authors": "<div class=\"authorHighlight\">Cohn, G.</div>",
        "title": "The University of Washington Ubicomp Lab: A Research Overview",
        "publication": "<em>Georgia Tech Invited Talk</em>, Atlanta, GA, 5 November 2013.",
        "links": [
        ],
        "relatedProjects": [ ]
    }
];