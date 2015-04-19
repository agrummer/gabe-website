## Methods to create thumbnails using the ImageMagicks utility

import os, os.path, re, subprocess

def runREinDir(srcDir, includeRE, dstDir, geometry, quality):
    if not os.path.isdir(srcDir):
        print "ERROR: srcDir does not exist!"
        return
    if not os.path.isdir(dstDir):
        print "dstDir does not exist, it will be created."
        os.mkdir(dstDir)
    files = os.listdir(srcDir)
    matches = 0
    sucess = 0

    for f in files:
        match = re.search(includeRE, f)
        if match:
            matches += 1
            try:
                if not generateThumbnail(os.path.join(srcDir, f), os.path.join(dstDir, f), geometry, quality):
                    sucess += 1
                    print "Generated thumbnail %s" %f
            except:
                raise
                print "ERROR: could not generate thumbnail %s" %f

    print '%d file matches found' %matches
    print '%d thumbnails generated' %sucess


def generateThumbnail(srcFile, dstFile, geometry, quality):
    '''
        geometry - must be a valid geometry parameter for the convert function
        quality - 0 to 100
    '''
    return subprocess.call('convert \"%s\" -thumbnail %s -quality %s \"%s\"' %(srcFile, geometry, quality, dstFile), shell=True)
