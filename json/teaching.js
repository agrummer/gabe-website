/* Teaching JSON structure
 *  The courses will appear in the same order listed in the JSON.
 *  The top level is a list of sections. Each section object contains the following:
 *      sectionTitle - string, title to be displayed above the section and in the nav bar
 *      courses - array, list of course objects to show in this section.
 *  Each course object contains the following:
 *      id - string, for referencing this course in other JSON objects and the id of the <div>
 *      link - string or NULL, link to the course home page
 *      title - string, title of course
 *      desc - string, description of course
 *      instances - array of course instance objects, list of instances that I taught the course
 *          Each course instance object contains the following:
 *          course - string, course number
 *          terms - string, list of terms the course was taught
 */
var teachingJSON = [
    {
        "sectionTitle": "Courses Instructed",
        "courses": [
            {
                "id": "cse467",
                "link": "http://courses.cs.washington.edu/courses/cse467/13au/",
                "title": "CSE 467 - Advanced Digital Design",
                "desc": "This course builds upon basic digital logic design techniques, focusing primarily on design, implementation and verification of customized application-specific digital logic designs. In this course, students learn how to build and optimize algorithms to run very quickly on custom hardware. Such hardware acceleration is commonly used for high speed computations in computer vision, artificial intelligence, computational biology, and finance. The class project will allow students will implement a highly optimized computer vision algorithm on an FGPA.",
                "instances": [
                    {
                        "course": "UW CSE 467",
                        "terms": "Autumn 2013"
                    }
                ]
            }
        ]
    },
    {
        "sectionTitle": "Guest Lectures and Tutorials",
        "courses": [
            {
                "id": "pcb",
                "link": "http://sockeye.cs.washington.edu/teaching/pcb",
                "title": "PCB Design Tutorial",
                "desc": "This tutorial covers schematic entry and PCB design. Most of the material can be applied to any design tool; however, this tutorial focuses on Altium Designer/DXP/Protel. This tutorial consists of a set of slides which give an overview of PCB design and describe each step of the process. There are also a series of videos which go through the PCB design process step-by-step.",
                "instances": [
                    {
                        "course": "UW CSE 477",
                        "terms": "Spring 2013, Spring 2011, Spring 2010"
                    },
                    {
                        "course": "UW CSE 599U",
                        "terms": "Spring 2013, Fall 2010"
                    }
                ]
            },
            {
                "id": "micro",
                "link": "http://sockeye.cs.washington.edu/teaching/micro",
                "title": "Microcontroller Basics",
                "desc": "This lecture gives an introduction to microcontrollers, describes common features, and gives brief guidelines for choosing a microcontroller.",
                "instances": [
                    {
                        "course": "UW CSE 599U",
                        "terms": "Winter 2012, Winter 2010, Fall 2010"
                    },
                    {
                        "course": "UW CSE 477",
                        "terms": "Spring 2013"
                    }
                ]
            },
            {
                "id": "msp430",
                "link": "http://sockeye.cs.washington.edu/teaching/msp430",
                "title": "MSP 430 Tutorial",
                "desc": "This tutorial covers the basics of the MSP 430 development platforms, and provides several resources for developing MSP 430 projects.",
                "instances": [
                    {
                        "course": "UW CSE 599U",
                        "terms": "Winter 2012, Fall 2010"
                    }
                ]
            },
            {
                "id": "arduino",
                "link": "http://sockeye.cs.washington.edu/teaching/arduino",
                "title": "Arduino Tutorial",
                "desc": "This tutorial covers the basics of the Arduino development platform, and provides several resources for developing Arduino projects.",
                "instances": [
                    {
                        "course": "UW CSE 599U",
                        "terms": "Winter 2012"
                    }
                ]
            },
            {
                "id": "phidgets",
                "link": "http://sockeye.cs.washington.edu/teaching/phidgets",
                "title": "Phidgets Tutorial",
                "desc": "This tutorial covers the basics of the Phidgets rapid prototyping platform for sensing and output over USB.",
                "instances": [
                    {
                        "course": "UW CSE 599U",
                        "terms": "Winter 2012, Fall 2010"
                    }
                ]
            },
            {
                "id": "make",
                "link": "http://sockeye.cs.washington.edu/teaching/make",
                "title": "Introduction to GNU make",
                "desc": "This lecture gives an introduction to GNU make. The software is described and shown how useful it can be for large builds. Basic Makefile syntax is described, and example Makefiles are given.",
                "instances": [
                    {
                        "course": "Caltech EE/CS 51",
                        "terms": "Winter 2009, Winter 2008"
                    }
                ]
            }
        ]
    },
    {
        "sectionTitle": "Courses as Teaching Assistant",
        "courses": [
            {
                "id": "ee52",
                "link": "http://sockeye.cs.washington.edu/teaching/ee52",
                "title": "EE/CS 52 - Embedded Systems Design (Emphasis on Hardware)",
                "desc": "This course continues with the study of the design of embedded systems which was started in EE/CS 51. In this class, the main focus is on hardware. A complete working project will be built by each student. While most of the software will be supplied, the hardware will be almost entirely the students' own design. The lectures focus mainly on hardware, with some discussion of software and hardware/software integration issues.",
                "instances": [
                    {
                        "course": "Caltech EE/CS 52",
                        "terms": "Spring 2009, Spring 2008"
                    }
                ]
            },
            {
                "id": "ee51",
                "link": "http://sockeye.cs.washington.edu/teaching/ee51",
                "title": "EE/CS 51 - Embedded Systems Design (Emphasis on Software)",
                "desc": "This course covers the design of embedded systems from both a hardware and software point of view. In the class approximately equal time is spent on hardware and software issues in lecture, while the homework and lab aspect focuses mainly on software. The follow-on class (EE/CS 52) changes the homework and lab focus to hardware.",
                "instances": [
                    {
                        "course": "Caltech EE/CS 51",
                        "terms": "Winter 2009, Winter 2008"
                    }
                ]
            },
            {
                "id": "ee5",
                "link": "http://sockeye.cs.washington.edu/teaching/ee5",
                "title": "EE 5 - Introduction to Embedded Systems",
                "desc": "This course gives students a basic understanding of the major hardware and software principles involved in the specification and design of embedded systems. The course will cover basic digital logic, CPU and embedded systems architecture, and embedded systems programming principles (events, user interfaces, and multi-tasking). The class is intended for students who wish to gain a basic understanding of embedded systems or for those who would like an introduction to the materials taught in EE/CS 51 and EE/CS 52.",
                "instances": [
                    {
                        "course": "Caltech EE 5",
                        "terms": "Fall 2008, Fall 2007"
                    }
                ]
            }
        ]
    }
];