namespace SeoBiz.Cms.Posts
{
	public class PostListFilter
	{
		public string[] CategoryIds { get; set; }
		public bool Published { get; set; }
		public int Skip { get; set; }
		public int Limit { get; set; }

		public bool WithoutBody { get; set; }
	}
}