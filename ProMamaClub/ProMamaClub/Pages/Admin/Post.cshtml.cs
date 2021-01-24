using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Posts;

namespace ProMamaClub.Pages.Admin
{
	[IgnoreAntiforgeryToken(Order = 1001)]
	public class PostModel1 : PageModel
	{
		private readonly IPostService _postService;
		private readonly ICategoryService _categoryService;
		private readonly IAuthService _authService;

		public PostModel1(IPostService postService, ICategoryService categoryService, IAuthService authService)
		{
			_postService = postService;
			_categoryService = categoryService;
			_authService = authService;
		}

		public DateTime Date { get; set; }

		[BindProperty]
		public Post Post { get; set; }

		public string RootCategoryId { get; set; }

		public bool IsDeleted { get; set; }

		public bool IsPublished { get; set; }

		public SelectListItem[] RootCategories { get; set; }
		public SelectListItem[] Categories { get; set; }

		public string LargeImage { get; set; }
		public string MiddleImage { get; set; }
		public string SmallImage { get; set; }


		public async Task<ActionResult> OnGetAsync(string id)
		{
			if (!await _authService.IsAuthentificated()) return NotFound();
			if (string.IsNullOrEmpty(id))
			{
				Date = DateTime.Now;
				Post = new Post
				{
					Title = "Not he who has much is rich, but he who gives much",
					Tags = "Ключевые слова",
					Image = "blog-sign01.jpg"
				};
				LargeImage = "/inset/blog/blog-sign01.jpg";
				MiddleImage = "/inset/blog-sidebar01.jpg";
				SmallImage = "/inset/blog-widget01.jpg";
				FillCategories(null);
				return Page();
			}

			var post = await _postService.Get(new PostFilter { PostId = id });
			if (post == null) return NotFound();

			Date = post.Date;
			Post = new Post
			{
				Id = post.Id,
				Title = post.Title,
				Image = post.Image,
				Description = post.Description,
				Tags = string.Join(", ", post.Tags),
				CategoryId = post.CategoryId,
				Body = HttpUtility.HtmlDecode(post.Body),
				RowVersion = post.RowVersion
			};

			LargeImage = "/images/large/" + post.Image;
			MiddleImage = "/images/middle/" + post.Image;
			SmallImage = "/images/small/" + post.Image;

			IsDeleted = post.IsDeleted;
			IsPublished = post.IsPublished;
			
			FillCategories(post.CategoryId);
			return Page();
		}

		public async Task<ActionResult> OnPostAsync()
		{
			if (!await _authService.IsAuthentificated()) return NotFound();
			if (!ModelState.IsValid)
			{
				LargeImage = "/images/large/" + Post.Image;
				MiddleImage = "/images/middle/" + Post.Image;
				SmallImage = "/images/small/" + Post.Image;
				FillCategories(Post.CategoryId);
				return Page();
			}
			var post = new SeoBiz.Cms.Posts.Post
			{
				Id = Helpers.Translit(Post.Title.Trim()),
				Date = DateTime.Now,
				Title = Post.Title,
				Description = Post.Description,
				Tags = Post.Tags.Split(',').Select(x => x.Trim()).ToArray(),
				CategoryId = Post.CategoryId,
				Body = HttpUtility.HtmlEncode(Post.Body),
				Image = Post.Image
			};
			await _postService.Save(post);
			return RedirectToPage("/Admin/Post");
		}

		private void FillCategories(string categoryId)
		{
			var categories = _categoryService.GetRootCategories();
			RootCategories = categories.Select(x => new SelectListItem {Value = x.Category.Id, Text = x.Category.Title}).ToArray();

			if (string.IsNullOrEmpty(categoryId))
			{
				Categories = new SelectListItem[0];
			}
			else
			{
				var category = _categoryService.GetCategory(categoryId);
				var rootCategory = _categoryService.GetCategory(category.Category.ParentId);
				RootCategoryId = rootCategory.Category.Id;
				Categories = rootCategory.Subcategories
					.Select(x => new SelectListItem {Value = x.Category.Id, Text = x.Category.Title}).ToArray();
			}
		}
	}
}