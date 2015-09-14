#include <Wire.h>
#include "Stater.h"
#include "PCF8574.h"
#include <EtherCard.h>

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

static byte myip[] = { 
  192,168,1,200 };
static byte gwip[] = { 
  192,168,1,1 };
static byte dns[] = { 
  192,168,1,1 };

static byte mymac[] = { 
  0x74,0x69,0x69,0x2D,0x30,0x31 };

int offVal = 255;

byte Ethernet::buffer[200];

static BufferFiller bfill;  // used as cursor while filling the buffer

void setup()
{
  Serial.begin(57600);
  Serial.println("Starting");
  if (ether.begin(sizeof Ethernet::buffer, mymac, 10) == 0) 
    Serial.println( "Failed to access Ethernet controller");
  ether.staticSetup(myip, gwip);
  ether.printIp("IP:  ", ether.myip);
  ether.printIp("GW:  ", ether.gwip);

  initButtons();

  Serial.println("Started");
}
void loop()
{
  word pos = ether.packetLoop(ether.packetReceive());
  
  byte value1 = INP_1.read8();
  byte value2 = INP_2.read8();

  updateState(state1, value1, 1);
  updateState(state2, value2, 2);

  etherProcess(pos);
    Serial.println("test");

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

void etherProcess(word pos){
  if (pos) {
    bfill = ether.tcpOffset();
    processParams((char *) Ethernet::buffer + pos);
    statePage(bfill);
    ether.httpServerReply(bfill.position());
  }
}

void processParams(char* data){
  if (data)
  {
    char* param;
    strtok(data, " ");
    param = strtok(NULL, " ");

    byte val = atoi(strtok(param, "/")); 
    int state = atoi(strtok(NULL, "/"));

    Serial.print(val);    
    Serial.print(":");    
    Serial.println(state);

    if(val == 101)a1 = state%256;
    if(val == 102)a2 = state%256;
    if(val == 103)a3 = state%256;
    if(val == 104)a4 = state%256;

    if(val>0 && val<=8){
      state1 ^= (1 << val-1);
    }
    else if (val>8 && val<=16){
      state2 ^= (1 << val-9);
    }
  }
}

void statePage(BufferFiller& buf) {
  long t = millis() / 1000;
  word h = t / 3600;
  byte m = (t / 60) % 60;
  byte s = t % 60;

  buf.emit_p(PSTR("{"
    "\"uptime\":\"$D$D:$D$D:$D$D\","), h/10, h%10, m/10, m%10, s/10, s%10);

  for(int i = 0;i<(bitCount*chipCount);++i){
    boolean on = false;
    if(i<=7){               
      if(state1 & (1 << i)){
        on = false;
      }
      else{
        on = true;
      }
    }
    else if (i>7 && i<=15){            
      if(state2 & (1 << i-8)){
        on = false;
      }
      else{
        on = true;
      }
    }    
    if(on){
      buf.emit_p(PSTR("\"s$D\":true,"), i+1);
    }
    else{
      buf.emit_p(PSTR("\"s$D\":false,"), i+1);
    }
  }  

  buf.emit_p(PSTR("\"a1\":$D,"
    "\"a2\":$D,"
    "\"a3\":$D,"
    "\"a4\":$D,"
    "\"counter1\":$D,"
    "\"counter2\":$D,"
    "\"counter3\":$D"
    "}"), a1,a2,a3,a4,counter1, counter2, counter3);
}


