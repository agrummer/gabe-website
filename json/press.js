/* Press JSON structure
 Each press object contains the following:
 title - string, title of the press article to display
 url - string, URL to press article. If NULL, then there should be no link
 author - string, author of the press article to display
 publication - string, publication of the press article to display
 sortDate - string in the form YYYY-MM-DD. Used to sort awards by date
 displayDate - string, date to be displayed
 subject - string, subject of the article to display as a heading in the "Featured Press" section
 featured - boolean, if True include this press article in the "Featured Press" section
 relatedProjects - an array of project id (proj_id) strings. This allows the projects section of the page to list press for each project.
 */
var pressJSON = [
    {
        "title": "Bright Idea: SNUPI Technologies & Wally",
        "url": "http://seattlebusinessmag.com/article/bright-idea-snupi-technologies-wally",
        "author": "John Levesque",
        "publication": "Seattle Business Magazine",
        "sortDate": "2014-03-00",
        "displayDate": "March 2014",
        "subject": "SNUPI Technologies",
        "featured": true,
        "relatedProjects": [ "proj_snupi" ]
    }
];