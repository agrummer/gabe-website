## Methods to create thumbnails using the ImageMagicks utility

import os, os.path, re, subprocess

def runREinDir(srcDir, includeRE, dstDir, geometry, quality, canvasSize=False, forceJPG=False):
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
        outf = f # use same name output file as input file
        if forceJPG: # change output file extension to .jpg
            (fname, ext) = os.path.splitext(f)
            outf = fname + '.jpg'
        match = re.search(includeRE, f)
        if match:
            matches += 1
            try:
                if not generateThumbnail(os.path.join(srcDir, f), os.path.join(dstDir, outf), geometry, quality, canvasSize):
                    sucess += 1
                    print "Generated thumbnail: %s -> %s" %(f, outf)
            except:
                raise
                print "ERROR: could not generate thumbnail for source file %s" %f

    print '%d file matches found' %matches
    print '%d thumbnails generated' %sucess


def generateThumbnail(srcFile, dstFile, geometry, quality, canvasSize=False):
    '''
        geometry - must be a valid geometry parameter for the convert function
        quality - 0 to 100
        canvasSize - if specified (not False), then the image is centered on a white background with the specified canvas size
    '''
    canvasString = ""
    if canvasSize:
        canvasString = '-background white -gravity center -extent %s' %canvasSize
    cmdString = 'convert \"%s\" -thumbnail %s -quality %s %s \"%s\"' %(srcFile, geometry, quality, canvasString, dstFile)
    return subprocess.call(cmdString, shell=True)
