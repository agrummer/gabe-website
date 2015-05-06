#!/usr/bin/python

# generates thumbnails for featured press

SRC_DIR = "../../Planning/Thumbnails/Press"
INCLUDE_RE = r"\w+\.\w{3}$" # regular expression for source files to include
DST_DIR = "../img/press"
GEOMETERY = '200x90' # scale to 200px wide, and 90px height
CANVAS_SIZE = '200x90' # make images this exact size
QUALITY = 100

import makeThumbnails

print "Generating Thumbnails for Press..."
makeThumbnails.runREinDir(SRC_DIR, INCLUDE_RE, DST_DIR, GEOMETERY, QUALITY, CANVAS_SIZE)
