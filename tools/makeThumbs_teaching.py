#!/usr/bin/python

# generates thumbnails for the teaching section

SRC_DIR = "../../Planning/Thumbnails/Teaching"
INCLUDE_RE = r"\.png" # regular expression for source files to include
DST_DIR = "../img/teaching"
GEOMETERY = '160x' # scale to 160px wide
QUALITY = 100

import makeThumbnails

print "Generating Thumbnails for Projects..."
makeThumbnails.runREinDir(SRC_DIR, INCLUDE_RE, DST_DIR, GEOMETERY, QUALITY)
