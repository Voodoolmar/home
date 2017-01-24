#include <Wire.h>
#include "Stater.h"
#include "PCF8574.h"

#define INPUT_SIZE 30

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
  Serial.begin(115200);
  initButtons();
  Serial.println("!Started");
}
void loop()
{  
  byte value1 = INP_1.read8();
  byte value2 = INP_2.read8();

  listenSerial();

  updateState(state1, value1, 1);
  updateState(state2, value2, 2);

  updateBpState();

  writeStates();
}

void listenSerial()
{
 if (Serial.available() > 0)
  {
    // put your main code here, to run repeatedly:
    // Get next command from Serial (add 1 for final 0)
    char input[INPUT_SIZE + 1];
    byte size = Serial.readBytes(input, INPUT_SIZE);
    // Add the final 0 to end the C string
    input[size] = 0;
    
    // Read each command pair 
    char* command = strtok(input, "&");
    while (command != 0)
    {
        // Split the command in two values
        char* separator = strchr(command, ':');
        if (separator != 0)
        {
            // Actually split the string in 2: replace ':' with 0
            *separator = 0;
            int id = atoi(command);
            ++separator;
            int position = atoi(separator);
  
            
            setValue(id, position);
            // Do something with servoId and position
        }
        // Find the next command in input string
        command = strtok(0, "&");
    }
  }
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
  newState = ~newState;
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
      Serial.print("!");
      Serial.print(i+shift+1);
      Serial.println(":1");
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
      Serial.print("!");
      Serial.print(i+shift+1);
      Serial.println(":2");
    }
    if (buttons[i+shift]->clicks == 3) 
    {
      Serial.print("!");
      Serial.print(i+shift+1);
      Serial.println(":3");
    }
    if (buttons[i+shift]->clicks == -1) 
    {
      allOff();
      Serial.print("!");
      Serial.print(i+shift+1);
      Serial.println(":-1");
    }
  }
}

void setValue(int val, int state){
  if(val == 101)a1 = state%256;
  if(val == 102)a2 = state%256;
  if(val == 103)a3 = state%256;
  if(val == 104)a4 = state%256;

  if(val>0 && val<=8){
    if(state>0){
      state1 |= (1 << val-1);
    }else{
      state1 &= ~(1 << val-1);
    }
  }
  else if (val>8 && val<=16){
    if(state > 0){
      state2 &= ~(1 << val-9);
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

void initButtons()
{
  buttons = new Stater*[bitCount*chipCount];
  for (int i = 0; i < bitCount*chipCount; ++i)
  {
    buttons[i] = new Stater();
  }
}
