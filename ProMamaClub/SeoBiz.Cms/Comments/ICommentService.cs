using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using SeoBiz.Cms.Posts;

namespace SeoBiz.Cms.Comments
{
	public interface ICommentService
	{
		Task Add(string postId, string name, string email, string comment);
		Task Approve(ObjectId commentId);
		Task Delete(ObjectId commentId);
		Task Reply(ObjectId commentId, string reply);
		Task<List<Comment>> GetList(CommentFilter filter);
	}
}