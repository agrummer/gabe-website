#!/usr/bin/python

# generates thumbnails for the projects

SRC_DIR = "../../Planning/Thumbnails/Projects"
INCLUDE_RE = r"\.jpg" # regular expression for source files to include
DST_DIR = "../img/projects"
GEOMETERY = '160x120' # scale to 160px by 120px
QUALITY = 100

import makeThumbnails

print "Generating Thumbnails for Projects..."
makeThumbnails.runREinDir(SRC_DIR, INCLUDE_RE, DST_DIR, GEOMETERY, QUALITY)
