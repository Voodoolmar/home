using SeoBiz.Cms.Posts;

namespace ProMamaClub.Models
{
	public class RecentArticlePreview
	{
		public RecentArticlePreview(Post post)
		{
			Id = post.Id;
			Title = post.Title;
			ArticlePictureUrl = "/images/small/" + post.Image;
		}

		public string Id { get; }
		public string Title { get; }
		public string ArticlePictureUrl { get; }
	}
}