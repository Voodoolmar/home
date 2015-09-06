// PointerTest.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "string.h"

const char* changes[20];
int count;

void add(const char* str)
{
	changes[count] = str;
	++count;
}

char* createString(const char* str)
{
	char* copy = (char*)malloc(sizeof(char) * strlen(str));
	strcpy(copy, str);
	return copy;
}

void clear()
{
	for (int i = 0; i < count; ++i)
	{
		free(changes[i]);
	}

	count = 0;
}

int _tmain(int argc, _TCHAR* argv[])
{
	char* number = (char*)malloc(sizeof(char) * 20);
	itoa(123, number, 10);

	add(createString("asdasdas"));
	add(createString("asdasdasdafcsdfs"));
	add(number);

	for (int i = 0; i < count; ++i)
	{
		printf("%s\n", changes[i]);
	}

	return 0;
}