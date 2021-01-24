using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ProMamaClub.Models;
using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Posts;

namespace ProMamaClub.Pages.Category
{
    public class IndexModel : PageModel
	{
		private readonly ICategoryService _categoryService;
		private readonly IPostService _postService;

		public IndexModel(ICategoryService categoryService, IPostService postService)
		{
			_categoryService = categoryService;
			_postService = postService;
		}

		public string CategoryId { get; set; }
		public string CategoryName { get; private set; }
		public string CategoryDescription { get; private set; }
		public PostPreview[] Articles { get; private set; }

		public async Task OnGet(string id, int skip = 0)
        {
	        var category = _categoryService.GetCategory(id);
	        var posts = await _postService.GetPage(new PostListFilter
	        {
				CategoryIds = new[]{id},
				Skip = skip
	        });

	        CategoryId = category.Category.Id;
	        CategoryName = category.Category.Title;
	        CategoryDescription = category.Category.Description;
	        Articles = posts.Items.Select(x => new PostPreview(x)).ToArray();
	        Skip = skip;
		}
		public int Skip { get; set; }
	}
}