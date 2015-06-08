#!/usr/bin/python

## File Name:    demo.py
## Author:       Gabe A. Cohn
## Description:  Demos the Phidgets platform for CSE 599U.
##               Uses a slider potentiometer and RFID reader for input,
##               and a servo motor, LCD display, and console for output.
##               Only authorized users (identified by their RFID tag) are
##               allowed to control the servo motor with the slider pot.
##               All other users are identified by restricted from servo control
## Revision History:
##  10/29/2010  Gabe Cohn       initial revision
##  11/01/2010  Gabe Cohn       added console display to mirror LCD display

import sys, os

from Phidgets.PhidgetException import *
from Phidgets.Events.Events import *
from Phidgets.Devices.InterfaceKit import InterfaceKit
from Phidgets.Devices.TextLCD import TextLCD
from Phidgets.Devices.RFID import RFID
from Phidgets.Devices.Servo import Servo

# console display class
class ConsoleDisplay:
    def __init__(self, lines=2):
        self.numlines = lines
        self.clear()
        return
    def clear(self):
        self.lines = [""] * self.numlines
        self.flush()
        return
    def flush(self):
        clearCmd = ['clear','cls'][os.name == 'nt'] # use cls in windows, clear in unix
        os.system(clearCmd)
        for line in self.lines:
            print line
        return
    def setDisplayString(self, line, string):
        assert line < len(self.lines)
        self.lines[line] = string
        self.flush()
        return

# user class
class User:
    def __init__(self, name, id, auth):
        self.name = name
        self.id = id
        self.auth = auth
    def isAuthorized(self):
        return self.auth
    def getName(self):
        return self.name
    def getID(self):
        return self.id

# current user class (this is needed because python doesn't support shared (volatile) variables
class CurrentUser:
    def __init__(self, user=None):
        self.set(user)
    def set(self, user):
        self.user = user
    def get(self):
        return self.user
    
# constants
SLIDER_IDX = 0 # interface kit port on which the slider pot is attached\
SLIDER_SEN = 2 # slider sensitivity
SLIDER_MAXVAL = 999 # maximum value from slider
SERVO_IDX = 0; # servo index on motor controller board

users = {} # dictionary of users, with ID values as keys and User objects as values
users['0106935A0F'] = User('Gabe Cohn', '0106935A0F', True)
users['01068DE104'] = User('Shwetak Patel', '01068DE104', False)
users['defaultUnknownUser'] = User('UNKNOWN', 'defaultUnknownUser', False)

# mainloop
def run():

    def setServoPosition(sliderPos):
        # get relative position
        relPos = sliderPos / float(SLIDER_MAXVAL)
        # map to servo position
        servo_min = servo.getPositionMin(SERVO_IDX)
        servo_max = servo.getPositionMax(SERVO_IDX)
        servoPos = (relPos * (servo_max - servo_min)) + servo_min
        servo.setPosition(SERVO_IDX, servoPos)
        return

    # event handlers
    def sensorChangeHandler(event):
        ''' handles sensor value changes for the interface kit '''

        # do nothing if not a change on the slider
        if not ((event.device is ifaceKit) and (event.index == SLIDER_IDX)):
            return

        if curUser.get() == None: # no user
            lcd.setDisplayString(1, "SLIDER: NO USER")
            console.setDisplayString(1, "SLIDER: NO USER")
        elif curUser.get().isAuthorized(): # if authorized user
            lcd.setDisplayString(1, "SLIDER: %d" %event.value)
            console.setDisplayString(1, "SLIDER: %d" %event.value)
            setServoPosition(event.value)
        else: # unauthorized user
            lcd.setDisplayString(1, "SLIDER: UNAUTHORIZED")
            console.setDisplayString(1, "SLIDER: UNAUTHORIZED")
        return

    def rfidTagFoundHandler(event):
        ''' handles RFID tag found events '''

        # set curUser
        if event.tag in users.keys(): # known user
            curUser.set(users[event.tag])
        else: # unknown user
            curUser.set(users['defaultUnknownUser'])

        # update user line of display            
        lcd.setDisplayString(0, "User: %s" %curUser.get().getName())
        console.setDisplayString(0, "User: %s" %curUser.get().getName())
        return
    
    def rfidTagLostHandler(event):
        ''' handles RFID tag lost events '''

        lcd.setDisplayString(0, "User: NONE")
        console.setDisplayString(0, "User: NONE")
        curUser.set(None)
        return
            
    # create instances for all devices
    ifaceKit = InterfaceKit()
    lcd = TextLCD()
    rfid = RFID()
    servo = Servo()

    curUser = CurrentUser() # assume no user in the beginning
    
    try:
        # open Interface Kit
        ifaceKit.openPhidget()
        ifaceKit.waitForAttach(1000) # wait 1 sec
        print "InterfaceKit (%d) is attached" %ifaceKit.getSerialNum()
        
        # open Text LCD
        lcd.openPhidget()
        lcd.waitForAttach(1000) # wait 1 sec
        print "TextLCD (%d) is attached" %lcd.getSerialNum()

        # open RFID
        rfid.openPhidget()
        rfid.waitForAttach(1000) # wait 1 sec
        print "RFID (%d) is attached" %rfid.getSerialNum()

        # open servo
        servo.openPhidget()
        servo.waitForAttach(1000) # wait 1 sec
        print "Servo (%d) is attached" %servo.getSerialNum()

        # wait for user input to continue
        print "Press Enter to continue...."
        sys.stdin.read(1) 

        # initialize console display
        console = ConsoleDisplay(2)
        
        # initialize servo to slider position
        setServoPosition(ifaceKit.getSensorValue(SLIDER_IDX))
        
        # initialize the LCD display
        lcd.setDisplayString(0, "User: NONE")
        lcd.setDisplayString(1, "SLIDER: NO USER")
        console.setDisplayString(0, "User: NONE")
        console.setDisplayString(1, "SLIDER: NO USER")
        
        # setup slider pot
        ifaceKit.setSensorChangeTrigger(SLIDER_IDX, SLIDER_SEN)
        ifaceKit.setOnSensorChangeHandler(sensorChangeHandler)

        # setup RFID
        rfid.setOnTagHandler(rfidTagFoundHandler)
        rfid.setOnTagLostHandler(rfidTagLostHandler)
        rfid.setAntennaOn(True) # turn on antenna
        
        # wait for user input to exit (run program until then)
        print "Press Enter to quit...."
        sys.stdin.read(1) 

    except PhidgetException as e:
        print "PhidgetException %i: %s" %(e.code, e.details)
        raise

    finally: # close all open phidgets (this is important!)
        ifaceKit.closePhidget()
        lcd.closePhidget()
        rfid.closePhidget()
        servo.closePhidget()

if __name__ == '__main__':
    run()
    