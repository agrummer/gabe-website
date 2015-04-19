#!/usr/bin/python

# generates thumbnails for the talks

SRC_DIR = "../../Planning/Thumbnails/Talks"
INCLUDE_RE = r"\.jpg" # regular expression for source files to include
DST_DIR = "../img/talks"
GEOMETERY = '160x' # scale such that width is 160px
QUALITY = 100

import makeThumbnails

print "Generating Thumbnails for Talks..."
makeThumbnails.runREinDir(SRC_DIR, INCLUDE_RE, DST_DIR, GEOMETERY, QUALITY)
