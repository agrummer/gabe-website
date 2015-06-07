/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(function () {
    "use strict";

    // parse hash, which contains error code
    var hash = window.location.hash;
    hash = typeof(hash) == "string" ? hash : $(this).attr("hash");

    // determine error information
    var errcode, errname;
    if(hash) { // hash represents error code
        errcode = hash.substring(1); // remove hash sign (#)
        switch(errcode) {
            case "400": errname = "Bad Request"; break;
            case "401": errname = "Authorization Required"; break;
            case "403": errname = "Forbidden"; break;
            case "404": errname = "Not Found"; break;
            case "405": errname = "Method Not Allowed"; break;
            case "406": errname = "Not Acceptable (encoding)"; break;
            case "407": errname = "Proxy Authentication Required "; break;
            case "408": errname = "Request Timed Out"; break;
            case "409": errname = "Conflicting Request"; break;
            case "410": errname = "Gone"; break;
            case "411": errname = "Content Length Required"; break;
            case "412": errname = "Precondition Failed"; break;
            case "413": errname = "Request Entity Too Long"; break;
            case "414": errname = "Request URI Too Long"; break;
            case "415": errname = "Unsupported Media Type"; break;
            case "500": errname = "Internal Server Error"; break;
            case "501": errname = "Not Implemented"; break;
            case "502": errname = "Bad Gateway "; break;
            case "503": errname = "Service Unavailable"; break;
            case "504": errname = "Gateway Timeout"; break;
            case "505": errname = "HTTP Version Not Supported"; break;
            default: errname = "Unknown Error";
        }
    } else { // unknown error
        errcode = "Unknown";
        errname = "Unknown Error";
    }

    // write error information onto page
    $('.errorcode').text(errcode);
    $('.errorname').text(errname);

});
