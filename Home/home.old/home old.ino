/* ClickButton library demo

  Blinks a LED according to different clicks on one button.
  
  Short clicks:

    Single click - Toggle LED on/off
    Double click - Blink      (Toggles LED 2 times/second)
    Triple click - Fast blink (Toggles LED 5 times/second)
    
  Long clicks (hold button for one second or longer on last click):
    
    Single-click - Slow blink   (Toggles LED every second)
    Double-click - Sloow blink  (Toggles LED every other second)
    Triple-click - Slooow blink (Toggles LED every three seconds)


  The circuit:
  - LED attached from pin 10 to resistor (say 220-ish ohms), other side of resistor to GND (ground)
  - pushbutton attached from pin 4 to GND
  No pullup resistor needed, using the Arduino's (Atmega's) internal pullup resistor in this example.

  Based on the Arduino Debounce example.

  2010, 2013 raron
 
 GNU GPLv3 license
*/

#include "ClickButton.h"

// the LED
const int ledPin1 = 2;
const int ledPin2 = 3;
const int ledPin3 = 4;
const int ledPin4 = 5;
int ledState1 = 1;
int ledState2 = 1;
int ledState3 = 1;
int ledState4 = 1;

// the Button
const int buttonPin1 = 22;
const int buttonPin2 = 23;
const int buttonPin3 = 24;
const int buttonPin4 = 25;
ClickButton button1(buttonPin1, LOW, CLICKBTN_PULLUP);
ClickButton button2(buttonPin2, LOW, CLICKBTN_PULLUP);
ClickButton button3(buttonPin3, LOW, CLICKBTN_PULLUP);
ClickButton button4(buttonPin4, LOW, CLICKBTN_PULLUP);

// Arbitrary LED function 
int LEDfunction1 = 0;
int LEDfunction2 = 0;
int LEDfunction3 = 0;
int LEDfunction4 = 0;


void setup()
{
  pinMode(ledPin1,OUTPUT);  
  pinMode(ledPin2,OUTPUT);  
  pinMode(ledPin3,OUTPUT);  
  pinMode(ledPin4,OUTPUT); 

  // Setup button timers (all in milliseconds / ms)
  // (These are default if not set, but changeable for convenience)
  button1.maxPresses     = 3;    // max button multiclick count
  button1.debounceTime   = 20;   // Debounce timer in ms
  button1.multiclickTime = 250;  // Time limit for multi clicks
}


void loop()
{
  // Update button state
  button1.Update();
  button2.Update();
  button3.Update();
  button4.Update();

  // Save click codes in LEDfunction, as click codes are reset at next Update()
  if (button1.click != 0) LEDfunction1 = button1.click;
  if (button2.click != 0) LEDfunction2 = button2.click;
  if (button3.click != 0) LEDfunction3 = button3.click;
  if (button4.click != 0) LEDfunction4 = button4.click;
  

  // Simply toggle LED on single clicks
  // (Cant use LEDfunction like the others here,
  //  as it would toggle on and off all the time)
  if(button1.click == 1) ledState1 = !ledState1;
  if(button2.click == 1) ledState2 = !ledState2;
  if(button3.click == 1) ledState3 = !ledState3;
  if(button4.click == 1) ledState4 = !ledState4;
  // update the LED
  digitalWrite(ledPin1,ledState1);
  digitalWrite(ledPin2,ledState2);
  digitalWrite(ledPin3,ledState3);
  digitalWrite(ledPin4,ledState4);
}




