using System;

namespace SeoBiz.Cms
{
	public class BusinessException : Exception
	{
		public BusinessException(string message)
			: base(message)
		{
		}
	}
}