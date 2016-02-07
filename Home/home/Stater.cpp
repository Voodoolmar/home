#include "Stater.h"

Stater::Stater()
{
	_activeHigh = LOW;
	_btnState = !_activeHigh;  // initial button state in active-high logic
	_lastState = _btnState;
	_clickCount = 0;
	clicks = 0;
	depressed = 0;
	_lastBounceTime = 0;
	debounceTime = 20;            // Debounce timer in ms
	multiclickTime = 250;           // Time limit for multi clicks
	longClickTime = 1000;
	
	_editMode = LOW;
	_lastClickTime = 0;
	editModeOffTime = 3000;
}


void Stater::EditMode()
{	
	_editMode = HIGH;
	multiclickTime = 50;
	_lastClickTime = (long)millis();
}

void Stater::Update(boolean btnState)
{
	long now = (long)millis();      // get current time
	_btnState = btnState;  // current appearant button state

	// Make the button logic active-high in code
	if (!_activeHigh) _btnState = !_btnState;

	// If the switch changed, due to noise or a button press, reset the debounce timer
	if (_btnState != _lastState) _lastBounceTime = now;


	// debounce the button (Check if a stable, changed state has occured)
	if (now - _lastBounceTime > debounceTime && _btnState != depressed)
	{
		depressed = _btnState;
		if (depressed) _clickCount++;
	}

	// If the button released state is stable, report nr of clicks and start new cycle
	if (!depressed && (now - _lastBounceTime) > multiclickTime)
	{
		// positive count for released buttons
		clicks = _clickCount;
		_clickCount = 0;
	}

	// Check for "long click"
	if (depressed && (now - _lastBounceTime > longClickTime))
	{
		// negative count for long clicks
		clicks = 0 - _clickCount;
		_clickCount = 0;
	}
	
	//Off EditModel
	if(_editMode && (now - _lastClickTime > editModeOffTime)){
		_editMode = LOW;
		multiclickTime = 250;
	}

	_lastState = _btnState;
}



