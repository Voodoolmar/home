#include "PCF8574.h"
#include <Wire.h>

PCF8574 PCF_32(0x20);
PCF8574 PCF_33(0x21);

void setup()
{
}

void loop()
{
  for (int i=0; i<255; i++)
  {
    PCF_32.write8(i);
    delay(100);
  }
}
