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
var projectsJSON = [
    {
        "id": "proj_snupi",
        "title": "SNUPI: Ultra-Low-Power, General-Purpose Wireless Sensing Platform",
        "date": "2009-2014",
        "shortDesc": "SNUPI (<u>S</u>ensor <u>N</u>etwork <u>U</u>tilizing <u>P</u>owerline <u>I</u>nfrastructure) is an ultra-low-power wireless sensor network platform that leverages the power line infrastructure of the building and uses it as part of the communications channel. This technology allows sensor nodes to operate for decades on a single coin cell battery, while still achieving whole-building range!",
        "longDesc": "SNUPI (<u>S</u>ensor <u>N</u>etwork <u>U</u>tilizing <u>P</u>owerline <u>I</u>nfrastructure) is an ultra-low-power wireless sensor network platform that leverages the power line infrastructure of the building and uses it as part of the communications channel. In a traditional wireless sensor network, data is communicated over the air between the sensor nodes and a base station, perhaps after making several hops between the nodes. Using this over-the-air wireless communication, the battery life is typically limited by the high transmit power required for wireless signals to reach the receiver. In contrast, SNUPI uses a <i>powerline-coupled</i> wireless channel rather than an <i>over-the-air</i> channel. In a SNUPI network, the base station receiver is plugged into the power line, and uses the entire power line network as its receiving antenna. Therefore, to communicate data to the base station, sensor nodes can wirelessly transmit at extremely low power in order for their wireless signals to couple in the near-field onto the nearest power line, and then travel through the power line infrastructure like a transmission line to the base station receiver. Since the transmit power is so low, SNUPI nodes can operate for decades on a single coin cell battery! In addition, these networks have whole-building range because the power lines reach to all locations within the building.<br/><br/>Since there are many indoor applications of home monitoring, security, and automation, my collaborators and I co-founded a startup company called <a href=\"http://www.snupi.com\">SNUPI Technologies</a> to commercialize this work. The startup company has grown rapidly, and is now offering its first consumer product: <a href=\"http://www.wally-home.com\">WallyHome</a>. WallyHome consists of many sensors that are distributed around the house to continuously monitor for water leaks and measure temperature and humidity in order to alert customers of leaks and potential mold within their homes. In the future, we will continue to produce more easy-to-install sensor products using the SNUPI platform that are geared toward smart applications including home safety, security, automation, and peace of mind."
    }
];