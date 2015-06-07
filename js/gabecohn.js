/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(function () {
    "use strict";

    // detect and apply Internet Explorer (IE) class (for IE 9-11)
    var isIE9 = !!navigator.userAgent.match(/MSIE 9\./);
    var isIE10 = !!navigator.userAgent.match(/MSIE 10\./);
    var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
    if (isIE9) {
        $('body').addClass("ie9");
    } else if (isIE10) {
        $('body').addClass("ie10");
    } else if (isIE11) {
        $('body').addClass("ie11");
    }
    if (isIE9 || isIE10 || isIE11) {
        $('body').addClass("msie");
    }

    // Render navbar and footer
    renderNavbar();
    renderFooter();

    $(window).load(function(){
        updateNavbar();
        handleAnchor();
    });

    $(window).resize(function() {
        updateNavbar();
    });

    // handle anchors on clicks
    window.addEventListener("hashchange", handleAnchor);

});

var updateNavbar = function() {
    // only show brand if navbar is collapsed
    if (window.outerWidth < 768) {
        $("#navbar .navbar-brand").show();
    } else {
        $("#navbar .navbar-brand").hide();
    }
};

var handleAnchor = function() {
    var hash = window.location.hash;
    hash = typeof(hash) == "string" ? hash : $(this).attr("hash");

    if(!hash) {
        return;
    }

    var anchor = hash.substring(1); // remove hash sign (#)
    var $target = $("a[name=" + anchor + "]");
    if (!$target) {
        $target = $(hash);
    }

    // Compute navbar height
    var navbarHeight = parseFloat($("nav#navbar").css("height"));
    var navbarVeriticalOffset = navbarHeight + 15; // use an additional 15 pixels of padding
    
    // Older browsers without pushState might flicker here, as they momentarily
    // jump to the wrong position (IE < 10)
    if($target.length) {
        $('html, body').animate({
            scrollTop: $target.offset().top - navbarVeriticalOffset
        }, 500);
        if(history && "pushState" in history) {
            history.pushState({}, document.title, window.location.pathname + hash);
        }
    }

    // expand project if target is a project
    var $project_anchor = $("#project-" + anchor);    
    if($project_anchor) {
        $project_anchor.find(".collapse").collapse("show");
    }  
}

var addIconsToLinks = function(links) {
    if (links && links.length && links.length > 0) {
        for (var i = 0; i < links.length; i += 1) {
            if (links[i].type) {
                switch(links[i].type) {
                    case "dl": links[i].icon = "book"; break;
                    case "doc": links[i].icon = "file"; break;
                    case "link": links[i].icon = "link"; break;
                    case "proj": links[i].icon = "tag"; break;
                    case "pub": links[i].icon = "file"; break;
                    case "slides": links[i].icon = "blackboard"; break;
                    case "star": links[i].icon = "star-empty"; break;
                    case "talk": links[i].icon = "blackboard"; break;
                    case "video": links[i].icon = "film"; break;
                    case "recording": links[i].icon = "facetime-video"; break;
                    case "web": links[i].icon = "globe"; break;
                    default: links[i].icon = "file";
                }
            }
        }
    }
    return links;
}

// Helper function to sort a list in reverse chronological order using 'sortDate' attribute
var sortListByDate = function(list) {
    list.sort(function(a,b) {
        if (a.sortDate < b.sortDate) return 1;
        if (a.sortDate > b.sortDate) return -1;
        return 0;
    });
    return list;
};

// Helper method to find an element within an array which has an attribute of a specified name and value
var getArrayElementWithAttribute = function(array, nameValue) {
    if (array && nameValue) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] && array[i][nameValue.name] && array[i][nameValue.name] === nameValue.value) {
                return array[i];
            }
        }
    } else {
        console.log("ERROR: Must provide valid array and name-value pair to lookup element in array. array = " + array + ", nameValue = " + nameValue);
    }
    return undefined;
};

// returns an array which is a subset of the passed array containing only those elements in which <attributeValue> is contained within <attributeName>, which is an array
var getArrayElementsContainingAttributeInList = function(array, attributeName, attributeValue) {
    var results = [];

    if (array && attributeName && attributeValue) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i] && array[i][attributeName]) {
                for (var k = 0; k < array[i][attributeName].length; k += 1) {
                    if (array[i][attributeName][k] === attributeValue) {
                        results.push(array[i]);
                    }
                }
            }
        }
    } else {
        console.log("ERROR: Must provide valid array, attributeName, and attributeValue to perform lookup. {array = " + array + ", attributeName = " + attributeName + ", attributeValue = " + attributeValue + "}");
    }

    return results;
};

var renderNavbar = function() {
    var $parent = $("nav#navbar");
    if (!$parent || $parent.length === 0) {
        // HTML container not found on the current page
        console.log("renderNavbar: parent not found");
        return;
    }

    var navHtml = '' +
        '<div class="container-fluid">' +
        '    <div class="navbar-header">' +
        '        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-body">' +
        '            <span class="icon-bar"></span>' +
        '            <span class="icon-bar"></span>' +
        '            <span class="icon-bar"></span>' +
        '        </button>' +
        '        <a class="navbar-brand" href="/">Gabe A. Cohn</a>' +
        '    </div>' +
        '    <div id="navbar-body" class="collapse navbar-collapse">' +
        '        <ul id="nav-left" class="nav navbar-nav">' +
        '            <li class="nav-home"><a href="/">Home</a></li>' +
        '            <li class="nav-projects"><a href="/#projects">Projects</a></li>' +
        '            <li class="nav-publications"><a href="/#publications">Publications</a></li>' +
        '            <li class="nav-talks"><a href="/#talks">Talks</a></li>' +
        '            <li class="nav-teaching"><a href="/#teaching">Teaching</a></li>' +
        '            <li class="nav-press"><a href="/#press">Press</a></li>' +
        '            <li class="nav-cv"><a href="/pdf/Cohn_CV.pdf" target="_blank">CV</a></li>' +
        '        </ul>' +
        '    </div>' +
        '</div>';

    // add navbar to page
    $parent.html(navHtml);

    // if home page, then remove '/' from hrefs (so that scrollspy works)
    if (window.location.pathname === "/") {
        $("nav#navbar #navbar-body li a").each(function() {
            var href = $(this).attr("href"); // get current href
            if (href === "/") { // Home section is an exception
                href = "#home"; // needs to be changed to "#home"
            } else {
                href = href.substr(1); // remove leading slash
            }
            $(this).attr("href", href); 
        });
    }

    // set active section of page in navbar
    var activeSection = $parent.attr("data-active");
    if (activeSection && activeSection.length > 0) {
        $("nav#navbar #navbar-body li." + activeSection).addClass("active");
    }
};

var renderFooter = function() {
    $("footer#footer #copyright").each(function() {
        var start = $(this).attr("data-start-date");
        var end = $(this).attr("data-end-date");
        var copyStr = '&copy; ';
        if (start && start.length > 0) {
            copyStr += start + ' &ndash; ';
        }
        if (!end || end.length === 0) { // use today
            var today = new Date();
            end = today.getFullYear();
        }
        copyStr += end + ' Gabe A. Cohn';
        
        $(this).html(copyStr);
    });
};

var applyMovingImages = function() {
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
};

var applyMovingBkgrnd = function() {
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
};
