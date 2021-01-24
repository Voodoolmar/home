using System;
using MongoDB.Bson;

namespace SeoBiz.Cms.Comments
{
	public class Comment
	{
		public ObjectId Id { get; set; }
		public DateTime At { get; set; }
		public string PostId { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Body { get; set; }

		public CommentState State { get; set; }

		public CommentReply Reply { get; set; }
	}
}