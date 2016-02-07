#include "Stater.h"


const int buttonPin1 = 40;
Stater** buttons;

void setup()
{
  Serial.begin(9600);
  pinMode(buttonPin1, INPUT);
  buttons = new Stater*[1];
    buttons[0] = new Stater();
   Serial.println("Started");  
}
void loop()
{
  buttons[0]->Update(!digitalRead(buttonPin1));
  
  if(buttons[0]->clicks==1){
	  Serial.println("c");  
  }
}

