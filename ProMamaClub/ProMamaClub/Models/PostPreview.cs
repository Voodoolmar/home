using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Posts;

namespace ProMamaClub.Models
{
	public class PostPreview
	{
		public string Id { get; }
		public string Title { get; }
		public int ViewCount { get; }
		public int CommentCount { get; }
		public string[] Tags { get; }
		public string ArticlePictureUrl { get; }
		public string Description { get; }

		public PostPreview()
		{
			Id = "title-id";
			Title = "Тестовая статья";
			ViewCount = 112387;
			CommentCount = 12;
			Tags = new[] { "Бременность", "Роды" };
			ArticlePictureUrl = "/inset/blog-sidebar01.jpg";
			Description = "Краткое описание для отображения в поисковиках " +
						  "Vivamus libero eros, euismod bibe ndum vel, aliquet ";

		}

		public PostPreview(Post post)
		{
			Id = post.Id;
			Title = post.Title;
			ViewCount = post.ViewCount;
			CommentCount = post.CommentCount;
			Tags = post.Tags;
			ArticlePictureUrl = "/images/middle/" + post.Image;
			Description = post.Description;
		}
	}
}
