using System.Collections.Generic;
using System.Net.Http.Headers;

namespace SeoBiz.Cms
{
	public class Page<T>
	{
		public List<T> Items { get; }
		public long TotalCount { get; }

		public Page(List<T> items, long totalCount)
		{
			Items = items;
			TotalCount = totalCount;
		}
	}
}