#include <Wire.h>
#include "Stater.h"
#include "PCF8574.h"

byte bitCount = 8;
byte chipCount = 2;

static byte state1 = 255;
static byte state2 = 255;

PCF8574 OUT_1(0x20);
PCF8574 OUT_2(0x21);
PCF8574 INP_1(0x22);
PCF8574 INP_2(0x23);

Stater** buttons;

int a1 = 255;
int a2 = 255;
int a3 = 255;
int a4 = 255;

int counter1 = 0;
int counter2 = 0;
int counter3 = 0;

int counterPin1 = 8;
int counterPin2 = 4;
int counterPin3 = 2;

int bpPin = 7;

int offVal = 255;

void setup()
{
  Serial.begin(57600);
  Serial.println("Starting");
  initButtons();
  Serial.println("Started");
}
void loop()
{  
  byte value1 = INP_1.read8();
  byte value2 = INP_2.read8();

  updateState(state1, value1, 1);
  updateState(state2, value2, 2);

  updateBpState();

  writeStates();
}

void writeStates(){
  analogWrite(9, a1);
  analogWrite(6, a2);
  analogWrite(5, a3);
  analogWrite(3, a4);

  OUT_1.write8(state1);
  OUT_2.write8(state2);
}

void updateBpState(){
  if(a1<offVal || a2<offVal || a3<offVal || a4<offVal){
    digitalWrite(bpPin, HIGH);
  }
  else{
    digitalWrite(bpPin, LOW);
  }
}

void updateState(uint8_t &state, byte newState, byte num)
{ 
  newState = reverseBitsByte(newState);
  byte shift = bitCount * (num-1);
  for (int i = 0; i < bitCount; ++i)
  {
    buttons[i+shift]->Update(newState & (1 << i));
  }

  for (int i = 0; i < bitCount; ++i)
  {
    if (buttons[i+shift]->clicks == 1) 
    {
      state ^= (1 << i);
    }
    if (buttons[i+shift]->clicks == 2) 
    {
      int a = i+shift+1;
      if(a == 11 || a == 12){
        if(a3<offVal || a4 < offVal){
          a3 = offVal;
          a4 = offVal;
        }else{
          a3 = 254;
          a4 = 254;
        }
      }
      if(a == 9 || a == 10){
        if(a1<offVal || a2 < offVal){
          a1 = offVal;
          a2 = offVal;
        }else{
          a1 = 254;
          a2 = 254;
        }
      }
    }
    if (buttons[i+shift]->clicks == -1) 
    {
      allOff();
    }
  }
}

void allOff(){
  state1 = offVal;
  state2 = offVal;
  a1 = offVal;
  a2 = offVal;
  a3 = offVal;
  a4 = offVal;
}

byte reverseBitsByte(byte input) 
{
  byte output = 0;
  byte bit;
  for(byte count=1;count<=8;count++)
  { 
    bit= input & 0x01;
    input=input>>1;
    output=output<<1; 
    if(bit==1) 
      output = output+1;
  }
  return output;		
}

void initButtons()
{
  buttons = new Stater*[bitCount*chipCount];
  for (int i = 0; i < bitCount*chipCount; ++i)
  {
    buttons[i] = new Stater();
  }
}