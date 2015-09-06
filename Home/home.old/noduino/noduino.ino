#include "ClickButton.h"

const int count = 10;

// relay
const int relayPins[count] = {	2,	3,	4,	5,	6,	7,	8,	9,	10,	11 };

// relayStates
int states[count] =          {	1,	1,	1,	1,	1,	1,	1,	1,	1,	1  };

// ButtonPins
const int btnPins[count] =   {	22,	23,	24,	25,	26,	27,	28,	29,	30,	31 };

int lampFunctions[count] =   {  0,      0,      0,      0,      0,      0,      0,      0,      0,      0  };

ClickButton buttons[count] = {
  ClickButton (btnPins[0], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[1], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[2], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[3], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[4], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[5], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[6], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[7], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[8], LOW, CLICKBTN_PULLUP),
  ClickButton (btnPins[9], LOW, CLICKBTN_PULLUP),
};
void setup()
{  
  for (int i=0; i<count; i++) {
    pinMode(relayPins[i], OUTPUT); 
    buttons[i].debounceTime   = 20;   
    buttons[i].multiclickTime = 250;  
    buttons[i].longClickTime  = 1000; 
  }  
}


void loop()
{
  for (int i=0; i<count; i++) {
    buttons[i].Update();
    
    if (buttons[i].clicks != 0) lampFunctions[i] = buttons[i].clicks;
    
    if(buttons[i].clicks == 1) states[i] = !states[i];
    if(lampFunctions[i] == 2) {}
    if(lampFunctions[i] == 3) {}
    if(lampFunctions[i] == -1) {}
    if(lampFunctions[i] == -2) {}
    if(lampFunctions[i] == -3) 
      for (int j=0; j<count; j++) {
        states[j] = 1;
      }
  }   
  
  for (int i=0; i<count; i++)
  {
    digitalWrite(relayPins[i],states[i]);
  }
}




