#ifndef Stater_H
#define Stater_H

#if (ARDUINO <  100)
#include <WProgram.h>
#else
#include <Arduino.h>
#endif


class Stater
{
public:
	Stater();
	void Update(boolean btnState);
	int clicks;                   // button click counts to return
	boolean depressed;            // the currently debounced button (press) state (presumably it is not sad :)
	long debounceTime;
	long multiclickTime;
	long longClickTime;
	
private:
	boolean _activeHigh;          // Type of button: Active-low = 0 or active-high = 1
	boolean _btnState;            // Current appearant button state
	boolean _lastState;           // previous button reading
	int _clickCount;              // Number of button clicks within multiclickTime milliseconds
	long _lastBounceTime;         // the last time the button input pin was toggled, due to noise or a press
		 
};

#endif



