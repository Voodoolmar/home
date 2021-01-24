using System.Threading.Tasks;

namespace SeoBiz.Cms.Posts
{
	public interface IPostService
	{
		Task<Post> Get(PostFilter filter);
		Task<Page<Post>> GetPage(PostListFilter filter);
		Task Save(Post post);
		Task IncrementViewCount(string seoId);
		Task Publish(string id, bool state);
	}
}