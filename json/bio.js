/* Bio JSON structure
 *  Homepage will display the following:
 *      'homepage-name'
 *      'homepage-lead'
 *      'homepage-affiliation' 'bio'
 *
 *  Bio page will display the following:
 *      'bio-affiliation' 'bio'
 *
 *  Hyperlinks will not be shown in the plain-text version of the bio.
 *  Anything within "plain-only" spans will only be displayed in the plain-text version of the bio.
 */
var bioJSON = {
    "homepage-name": "Gabe A. Cohn",
    "homepage-lead": "is a Researcher at <span class=\"emphasis\">Microsoft Research</span>",
    "homepage-affiliation": "in the <span class=\"emphasis\">Medical Devices Group</span> in Redmond, Washingtion. ",
    "bio-affiliation": "<a href=\"http://www.gabeacohn.com/\">Gabe A. Cohn</a>, Ph.D. is a Researcher in the <span class=\"emphasis\">Medical Devices Group</span> at <a href=\"http://research.microsoft.com\">Microsoft Research</a><span class=\"plain-only\"> (research.microsoft.com)</span> in Redmond, WA. ",
    "bio": "Dr. Cohn's research focuses on (1) designing and implementing <span class=\"emphasis\">ultra-low-power embedded sensing systems</span>, (2) leveraging physical phenomena to enable <span class=\"emphasis\">new sensing modalities for human-computer interaction</span>, and (3) developing sensor systems targeted at <span class=\"emphasis\">realizing immediate change in high-impact application domains</span>. He received his Ph.D. in Electrical Engineering in 2014 from the University of Washington, where he was advised by Shwetak Patel. He was awarded the Microsoft Research Ph.D. Fellowship in 2012, the National Science Foundation Graduate Research Fellowship in 2010, and 6 Best Paper awards and nominations. He is a co-founder of <a href=\"http://www.wallyhome.com/\">SNUPI Technologies</a><span class=\"plain-only\"> (www.wallyhome.com)</span>, a sensor and services company built around his thesis work on the SNUPI ultra-low-power wireless sensor network. He received his B.S. with honors in Electrical Engineering from the California Institute of Technology in 2009, where he specialized in embedded systems, computer architectures, and digital VLSI.<span class=\"plain-only\"> More information is available at www.gabeacohn.com.</span>"
};
