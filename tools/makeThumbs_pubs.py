#!/usr/bin/python

# generates thumbnails for the publications

SRC_DIR = "../../Planning/Thumbnails/Publications"
INCLUDE_RE = r"\.jpg" # regular expression for source files to include
DST_DIR = "../img/publications"
GEOMETERY = '100x' # scale such that width is 100px
QUALITY = 100

import makeThumbnails

print "Generating Thumbnails for Publications..."
makeThumbnails.runREinDir(SRC_DIR, INCLUDE_RE, DST_DIR, GEOMETERY, QUALITY)
