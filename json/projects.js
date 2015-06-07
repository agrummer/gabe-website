/* Projects JSON structure
 *  The projects should appear in the order of the objects in the JSON structure.
 *  Each project object contains the following:
 *      id - string, for referencing this project in other JSON objects and the id of the <div>
 *           the URL for the thumbnail will be "img/projects/<id>.jpg" where <id> is replaced with the id
 *           always starts with proj_
 *      title - string, title of Project to display
 *      date - string, as it should appear on the page (not used for sorting)
 *      shortDesc - string (with HTML), short description that is shown when the project is collapsed
 *      longDesc - string (with HTML), long description that is shown when the project is expanded
 *      links - an array of the following object. Links are to appear in the order listed
 *          title - string, display text
 *          type - string, one of the following {doc, slides, video, recoding, dl, pub, talk, proj, web}. The type determines the icon to show
 *          url - string, URL of the link
 */
var projectsJSON = [
    // {
    //     "id": "proj_hydration",
    //     "title": "Continuous, Non-Invasive Hydration Monitoring",
    //     "date": "2013-Today",
    //     "shortDesc": "This project is aimed at developing a non-invasive system to continuously monitor a person's \"hydration level\" throughout the day from a wearable device. The device uses bioimpedance spectroscopy in order to get a continuous measure of hydration.",
    //     "longDesc": "To realize such a device, I hypothesize that bioimpedance spectroscopy can be used. Bioimpedance analysis has been widely used in consumer body composition scales for determining an estimate for a person's fat content. In clinical practice, these measurements have been shown to be accurate <i>assuming constant hydration level</i>. My hypothesis is that on the time-scale of minutes to hours, a person's body composition doesn't change significantly, and therefore variations in bioimpedance are due to changes in hydration. I have built custom analog circuitry to accurately perform bioimpedance spectroscopy, and am currently conducting experiments to test my hypothesis.",
    //      "links": []
    // },
    {
        "id": "proj_snupi",
        "title": "SNUPI: Ultra-Low-Power, General-Purpose Wireless Sensing Platform",
        "date": "2009-2014",
        "shortDesc": "SNUPI (<u>S</u>ensor <u>N</u>etwork <u>U</u>tilizing <u>P</u>owerline <u>I</u>nfrastructure) is an ultra-low-power wireless sensor network platform that leverages the power line infrastructure of the building and uses it as part of the communications channel. This technology allows sensor nodes to operate for decades on a single coin cell battery, while still achieving whole-building range!",
        "longDesc": "SNUPI (<u>S</u>ensor <u>N</u>etwork <u>U</u>tilizing <u>P</u>owerline <u>I</u>nfrastructure) is an ultra-low-power wireless sensor network platform that leverages the power line infrastructure of the building and uses it as part of the communications channel. In a traditional wireless sensor network, data is communicated over the air between the sensor nodes and a base station, perhaps after making several hops between the nodes. Using this over-the-air wireless communication, the battery life is typically limited by the high transmit power required for wireless signals to reach the receiver. In contrast, SNUPI uses a <i>powerline-coupled</i> wireless channel rather than an <i>over-the-air</i> channel. In a SNUPI network, the base station receiver is plugged into the power line, and uses the entire power line network as its receiving antenna. Therefore, to communicate data to the base station, sensor nodes can wirelessly transmit at extremely low power in order for their wireless signals to couple in the near-field onto the nearest power line, and then travel through the power line infrastructure like a transmission line to the base station receiver. Since the transmit power is so low, SNUPI nodes can operate for decades on a single coin cell battery! In addition, these networks have whole-building range because the power lines reach to all locations within the building.<br/><br/>Since there are many indoor applications of home monitoring, security, and automation, my collaborators and I co-founded a startup company called <a href=\"http://www.snupi.com\">SNUPI Technologies</a> to commercialize this work. The startup company has grown rapidly, and is now offering its first consumer product: <a href=\"http://www.wally-home.com\">WallyHome</a>. WallyHome consists of many sensors that are distributed around the house to continuously monitor for water leaks and measure temperature and humidity in order to alert customers of leaks and potential mold within their homes. In the future, we will continue to produce more easy-to-install sensor products using the SNUPI platform that are geared toward smart applications including home safety, security, automation, and peace of mind.",
        "links": []
    },
    {
        "id": "proj_humantenna",
        "title": "Humantenna: Sensing Gestures Using the Body as an Antenna",
        "date": "2010-2011",
        "shortDesc": "Humantenna is an on-body sensing system that recognizes whole-body gestures using the human body as an antenna that receives the existing electromagnetic interference (EMI) or noise from the power lines and electronic devices in a building. This approach to sensing mobile, whole-body interaction requires no instrumentation to the environment, and only minimal instrumentation to the user.",
        "longDesc": "Humantenna is an on-body sensing system that recognizes whole-body gestures using the human body as an antenna that receives the existing electromagnetic interference (EMI) or noise from the power lines and electronic devices in a building. Specifically, Humantenna uses changes that occur in the observed signal as the body moves to different poses. In addition to demonstrating the ability to recognize various whole-body gestures in real-time at 92.7% accuracy, Humantenna can robustly classify a person's location within a building among a small set of trained locations at 99.5% accuracy. This approach to sensing mobile, whole-body interaction requires no instrumentation to the environment, and only minimal instrumentation to the user.",
        "links": [
            {
                "title": "Video",
                "type": "video",
                "url": "http://www.youtube.com/watch?v=hfAk1Vnj6hM"
            }
        ]
    },
    {
        "id": "proj_sefs",
        "title": "Static Electric Field Sensing",
        "date": "2011-2012",
        "shortDesc": "This work explores an ultra-low-power method for passively sensing body motion using static electric fields by measuring the voltage at any single location on the body. Using this sensing is approach it is feasible to infer the amount and type of body motion anywhere on the body while consuming only 3.3 µW.",
        "longDesc": "Wearable sensor systems have been used in the ubiquitous computing community and elsewhere for applications such as activity and gesture recognition, health and wellness monitoring, and elder care. Although the power consumption of accelerometers has already been highly optimized, this work introduces a novel sensing approach which lowers the power requirement for motion sensing by orders of magnitude. We present an ultra-low-power method for passively sensing body motion using static electric fields by measuring the voltage at any single location on the body. We present the feasibility of using this sensing approach to infer the amount and type of body motion anywhere on the body and demonstrate an ultra-low-power motion detector used to wake up more power-hungry sensors. The sensing hardware consumes only 3.3 µW, and wake-up detection is done using an additional 3.3 µW (6.6 µW total).",
        "links": [
            {
                "title": "Video",
                "type": "video",
                "url": "http://youtu.be/Q4EzGqmDEJ8"
            }
        ]
    },
    {
        "id": "proj_gassense",
        "title": "GasSense: Appliance-Level Single-Point Sensing of Gas Activity in the Home",
        "date": "2009-2010",
        "shortDesc": "GasSense is a prototype system for both detecting and identifying the activity of individual natural gas appliances using only a single acoustic sensor placed on the gas infrastructure of the home. This system can be used to provide eco-feedback to the home user, which studies have shown to result in significant decreases in energy consumption.",
        "longDesc": "GasSense is a prototype system for both detecting and identifying the activity of individual natural gas appliances using only a single acoustic sensor placed on the gas infrastructure of the home. This system can be used to provide eco-feedback to the home user, which studies have shown to result in significant decreases in energy consumption. I worked with a variety of collaborators focused on human-computer interaction, sustainability, signal processing, machine learning, and mechanical engineering.",
        "links": []
    },
    {
        "id": "proj_utouch",
        "title": "uTouch",
        "date": "2012-2013",
        "shortDesc": "uTouch is a system that detects and classifies touches and hovers without any modification to the display, and without adding any sensors to the user. Our approach utilizes existing EMI produced by LCDs and conducted onto the power lines. When a user brings their hand near or touches the LCD?s front panel, the EMI is amplified, which can be detected by a sensor plugged in  elsewhere on the power line infrastructure.",
        "longDesc": "Current solutions for enabling touch interaction on existing non-touch LCD screens require adding additional sensors to the interaction surface. We present uTouch, a system that detects and classifies touches and hovers without any modification to the display, and without adding any sensors to the user. Our approach utilizes existing signals in an LCD that are amplified when a user brings their hand near or touches the LCD?s front panel. These signals are coupled onto the power lines, where they appear as electromagnetic interference (EMI) which can be sensed using a single device connected elsewhere on the power line infrastructure. We validate our approach with an 11 user, 8 LCD study, and demonstrate a real-time system.",
        "links": [
            {
                "title": "Video",
                "type": "video",
                "url": "http://youtu.be/8p9DkwWVmfI"
            }
        ]
    },
    {
        "id": "proj_wattr",
        "title": "WATTR: Self-Powered Wireless Sensing of Water Activity in the Home",
        "date": "2010",
        "shortDesc": "WATTR is a novel self-powered sensor that uses changes in a home's water pressure as both a powering and sensing source. WATTR is capable of sampling home water pressure and wirelessly transmitting when any water fixture in the home is opened or closed.",
        "longDesc": "WATTR is a novel self-powered sensor that uses changes in a home's water pressure as both a powering and sensing source. WATTR is capable of sampling home water pressure and wirelessly transmitting when any water fixture in the home is opened or closed. WATTR provides an alternative sensing solution to the power intensive Bluetooth-based sensor used in the HydroSense project for single-point whole-home water usage. Unlike other water-based power harvesters, WATTR does not waste water to power itself because it harvests energy from changes in pressure not flow. Finally, WATTR is a viable self-powered sensor capable of monitoring and transmitting water usage data without the use of a battery.",
        "links": []
    },
    {
        "id": "proj_ingen",
        "title": "InGen: Self-Powered Haptic Feedback Device",
        "date": "2010-2011",
        "shortDesc": "InGen is a self-powered wireless rotary input device capable of generating haptic or force feedback without the need for any external power source. Our approach uses a modified servomotor to perform three functions: (1) generating power for wireless communication and embedded electronics, (2) sensing the direction and speed of rotation, and (3) providing force feedback during rotation.",
        "longDesc": "InGen is a self-powered wireless rotary input device capable of generating haptic or force feedback without the need for any external power source. Our approach uses a modified servomotor to perform three functions: (1) generating power for wireless communication and embedded electronics, (2) sensing the direction and speed of rotation, and (3) providing force feedback during rotation. While InGen is rotating, the device is capable of providing the sensation of detents or bumps, changes in stiffness, and stiff stops entirely through power that is harvested during interaction. To the best of our knowledge, InGen is the first self-powered device, which also provides haptic feedback during operation.",
        "links": []
    },
    {
        "id": "proj_heatwave",
        "title": "HeatWave: Thermal Imaging for Surface User Interaction",
        "date": "2010-2011",
        "shortDesc": "HeatWave is a system that uses digital thermal imaging cameras to detect, track, and support user interaction on arbitrary surfaces. Example interactions include (1) distinguishing hovering above a surface from touch events, (2) shape-based gestures similar to ink strokes, (3) pressure based gestures, and (4) multi-finger gestures.",
        "longDesc": "We present HeatWave, a system that uses digital thermal imaging cameras to detect, track, and support user interaction on arbitrary surfaces. Thermal sensing has had limited examination in the HCI research community and is generally under-explored outside of law enforcement and energy auditing applications. We examine the role of thermal imaging as a new sensing solution for enhancing user surface interaction. In particular, we demonstrate how thermal imaging in combination with existing computer vision techniques can make segmentation and detection of routine interaction techniques possible in real-time, and can be used to complement or simplify algorithms for traditional RGB and depth cameras. Example interactions include (1) distinguishing hovering above a surface from touch events, (2) shape-based gestures similar to ink strokes, (3) pressure based gestures, and (4) multi-finger gestures. We close by discussing the practicality of thermal sensing for naturalistic user interaction and opportunities for future work.",
        "links": []
    },
    {
        "id": "proj_electionfraud",
        "title": "Detecting Voter Fraud from Electronic Voting Data",
        "date": "Spring 2009",
        "shortDesc": "Implemented new methods for obtaining and processing election data from foreign countries by mining the official election data posted on government websites. The data produced can be used to find anomalies in the official election data that could suggest the presence of election fraud.",
        "longDesc": "This is an interdisciplinary research project that I did with the Caltech political science department. I realized that much of the work being done in the political science group could be performed more efficiently and accurately by applying some basic principles of computer science and engineering. I provided them with new methods of obtaining and processing election data from foreign countries by mining the official election data posted on government websites. This project resulted in a publication that discusses the use of computers in searching for indicators of election fraud based on official election returns.",
        "links": []
    },
    {
        "id": "proj_antennacad",
        "title": "Computer Modeling of Wideband Tapered-Slot Microwave Antenna Feeds",
        "date": "Summer 2007",
        "shortDesc": "Created computer models of wideband dual-polarized quad-ridge horn antennas using the QuickWave EM analysis software and CST Microwave Studio. These antennas, made by ETS-Lindgren, can be optimized with the aid of my CAD models for use on wideband radio telescopes operating between 0.3 and 18 GHz.",
        "longDesc": "I created computer models of wideband dual-polarized quad-ridge horn antennas using the QuickWave EM analysis software and CST Microwave Studio. These antennas, made by ETS-Lindgren, can be optimized with the aid of my CAD models for use on wideband radio telescopes operating between 0.3 and 18 GHz. The feeds of which I created CAD models are now installed on the Goldstone Apple Valley Radio Telescope (GAVRT) as part of the Lewis Center for Educational Research. GAVRT is a very unique educational telescope that allows schoolchildren to control the 34-meter dish via the Internet, download real data, and process the data in the classroom. The feed design that I worked with is also one of the top candidates for the Square Kilometer Array (SKA), which is an international effort to create the largest radio telescope in the world.",
        "links": []
    },
    {
        "id": "proj_netlab",
        "title": "Network Routing Configuration Routines",
        "date": "2007",
        "shortDesc": "Improved scripts that control the optical switches used to route connections in a WAN test lab. The scripts dramatically improving the algorithms used to make network delays of a given length, and  allow the network hardware to be easily reconfigured to meet any test specification.",
        "longDesc": "I have improved scripts that control the optical switches used to route connections on the <a href=\"http://wil.cs.caltech.edu\">WAN in Lab (WiL) Project</a>. I have converted an existing Perl script to Python, in addition to dramatically improving the algorithms used to make network delays of a given length. These scripts allow the network hardware to be easily reconfigured to meet WiL user specifications. WAN in Lab is a single laboratory containing over 2400 km of fiber optic cable. This allows detailed control and measurement from both ends of the WAN. The lab is used to aid FAST TCP research, and can be used as a TCP benchmarking facility.",
        "links": []
    },
    {
        "id": "proj_rrsl06",
        "title": "Meteor Rader Interferometry using CAD Antenna Simulations",
        "date": "Summer 2006",
        "shortDesc": "Setup discone and log periodic dipole array (LPDA) antenna arrays at two locations for a passive radar interferometer. Created a full computer model of the new antenna arrays using the Numerical Electromagnetic Code (NEC) modeling software, and generated a spatial likelihood map of a scatter event using the computer simulation.",
        "longDesc": "I setup new hardware systems at two locations for the Radar Remote Sensing Laboratory's passive radar system. Discone and Log Periodic Dipole Array (LPDA) antenna arrays were constructed and made operational. I conducted error calibration tests and created a full computer model of the new antenna array using the Numerical Electromagnetic Code (NEC) modeling software. Phase errors due to transmission line effects were studied, as well as a detailed exploration of the effect of mutual coupling between antennas in the array. The computer model of the array was used to produce an interferometer that can give the likelihood of a scatter event at every position in the sky. Graphical representations of these data were created using MATLAB code that I wrote specifically for this purpose. This new method of interferometry can be considered a vast improvement over traditional interferometry, because it gives not only the position of maximum likelihood of a scatter event such as a meteor, but also a map of likelihood of the meteor location across the whole sky.",
        "links": []
    },
    {
        "id": "proj_rrsl05",
        "title": "Non-Linear Least Squares Curve Fitting for Radar Remote Sensing",
        "date": "Summer 2005",
        "shortDesc": "Implemented a complex nonlinear least squares curve fitting algorithm based on the Levenberg-Marquardt Algorithm to process cross-correlation data from a passive radar interferometry system.",
        "longDesc": "Using the Python programming language, I wrote software to process cross-correlation data from a passive radar interferometry system. The software included noise and signal splitting algorithms and a complex nonlinear least squares fitting algorithm based on the Levenberg-Marquardt Algorithm (LMA). I incorporated a curve fitter that used several different fitting models, including the Gaussian, Lorentzian, bi-modal, and composite models. The program selected the model with the best fit for each data set, and then output the processed data in a multitude of output formats.",
        "links": []
    }
];
