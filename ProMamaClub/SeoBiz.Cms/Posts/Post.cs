using System;

namespace SeoBiz.Cms.Posts
{
	public class Post
	{
		public string Id { get; set; }

		public DateTime Date { get; set; }

		public string Image { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string[] Tags { get; set; }
		
		public string CategoryId { get; set; }

		public int ViewCount { get; set; }
		public int CommentCount { get; set; }

		public string Body { get; set; }

		public bool IsDeleted { get; set; }

		public bool IsPublished { get; set; }

		public string UserId { get; set; }

		public DateTime RowVersion { get; set; }
	}
}