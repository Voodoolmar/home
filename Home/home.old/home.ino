#include "ClickButton.h"

const int count = 10;

// relay
const int relayPins[count] = {	2,	3,	4,	5,	6,	7,	8,	9,	10,	11 };

// relayStates
int states[count] =          {	1,	1,	1,	1,	1,	1,	1,	1,	1,	1  };
int recoverStates[count] =   {  1,      1,      1,      1,      1,      1,      1,      1,      1,      1  };
// ButtonPins
const int btnPins[count] =   {	22,	23,	24,	25,	26,	27,	28,	29,	30,	31 };

int lampFunctions[count] =   {  0,      0,      0,      0,      0,      0,      0,      0,      0,      0  };

ClickButton** buttons;

char messageBuffer[10], cmd[3], pin[3], val[4];
int index = 0;

void setup()
{  
  buttons = new ClickButton*[count];
  for (int i = 0; i < count; ++i)
  {
    buttons[i] = new ClickButton(btnPins[i], LOW, CLICKBTN_PULLUP);
  }
  
  Serial.begin(115200);
  for (int i=0; i<count; i++) {
    pinMode(relayPins[i], OUTPUT); 
    buttons[i]->debounceTime   = 20;   
    buttons[i]->multiclickTime = 250;  
    buttons[i]->longClickTime  = 1000; 
  }  
}


void loop()
{
  for (int i=0; i<count; i++) {
    buttons[i]->Update();
    
    if (buttons[i]->clicks != 0)
    {
      lampFunctions[i] = buttons[i]->clicks;
    }
    
    if(buttons[i]->clicks == 1) states[i] = !states[i];
    if(lampFunctions[i] == 2) {}
    if(lampFunctions[i] == 3) {}
    if(lampFunctions[i] == -1)
    {
      int a = 0;
      for (int j=0; j<count; j++) {
        if(states[j] == 0)a++;
      }
      
      Serial.println(a); 
      for (int j=0; j<count; j++) {
        if(a>0){
          recoverStates[j] = states[j];
          states[j] = 1;
        }else{
          states[j] = recoverStates[j];
        }
      }
    }
    
  }   
  
  while(Serial.available() > 0) {
    char x = Serial.read();
    if (x == '!') index = 0;      // start
    else if (x == '.') process(); // end
    else messageBuffer[index++] = x;
  }
  
  for (int i=0; i<count; i++)
  {
    digitalWrite(relayPins[i],states[i]);
  }
}

void process() {
  index = 0;  
  strncpy(cmd, messageBuffer, 2);
  cmd[2] = '\0';
  strncpy(pin, messageBuffer + 2, 2);
  pin[2] = '\0';
  strncpy(val, messageBuffer + 4, 3);
  val[3] = '\0';
  
  if (true) {
    Serial.println(messageBuffer); 
  }

  int cmdid = atoi(cmd);  
  switch(cmdid) {
    case 0:  ss(pin,val);               break;
//    case 1:  dw(pin,val);               break;
//    case 2:  dr(pin);                   break;
//    case 3:  aw(pin,val);               break;
//    case 4:  ar(pin);                   break;
//    case 90: autoReply();               break;
//    case 98: handleServo(pin,val,aux);  break;
//    case 99: toggleDebug(val);          break;
    default:                            break;
  }
}
void ss(char *pin, char *val) { 
  for (int i=0; i<count; i++)
  {
    int v = atoi(pin);
    if(relayPins[i] == v) {
      states[i] = !states[i];
    }
  }
}



