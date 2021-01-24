using System;
using System.Collections.Generic;
using System.Linq;
using SeoBiz.Cms.Comments;

namespace ProMamaClub.Pages.Comments
{
    public class IndexModel
    {
	    public IndexModel(List<SeoBiz.Cms.Comments.Comment> comments)
	    {
		    Messages = comments
			    .Select(x => new MessageModel(x.Id.ToString(), x.Name, x.Body, x.At, x.State, x.Reply != null ? new ReplyModel(x.Reply.Body, x.Reply.At) : null))
			    .ToArray();
	    }

	    public string PostId { get; set; }
	    public MessageModel[] Messages { get; set; }
	}

	public class MessageModel: ReplyModel
	{
		public MessageModel(string id, string commentAuthor, string text, DateTime date, CommentState state, ReplyModel reply):
			base(text,date)
		{
			Id = id;
			CommentAuthor = commentAuthor;
			State = state;
			Reply = reply;
		}

		public string Id { get; }
		public string CommentAuthor { get; }
		public CommentState State { get; }
		public ReplyModel Reply { get; }
	}

	public class ReplyModel
	{
		public ReplyModel(string text, DateTime date)
		{
			Text = text;
			Date = date;
		}
		public string Text { get; }
		public DateTime Date { get; }
	}
}