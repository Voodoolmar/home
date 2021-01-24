using System;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Posts;

namespace ProMamaClub.Pages
{
    public class PostModel : PageModel
    {
	    private readonly IPostService _postService;
	    private readonly ICategoryService _categoryService;
	    private readonly IAuthService _authService;

	    public PostModel(IPostService postService, ICategoryService categoryService, IAuthService authService)
	    {
		    _postService = postService;
		    _categoryService = categoryService;
		    _authService = authService;
	    }

	    public DateTime Date { get; set; }

		public string Title { get; set; }
	    public string Image { get; set; }
	    public string Description { get; set; }
	    public string[] Tags { get; set; }
	    public string Body { get; set; }

	    public string RootCategoryId { get; set; }
	    public string RootCategory { get; set; }
	    public string CategoryId { get; set; }
	    public string Category { get; set; }

	    public int ViewCount { get; set; }

		public async Task<ActionResult> OnGet(string id)
		{
			ViewData["postId"] = id;
			ViewData["authenticated"] = await _authService.IsAuthentificated();

			var post = await _postService.Get(new PostFilter{PostId = id});
	        if (!post.IsPublished || post.IsDeleted) return NotFound();

	        Date = post.Date;

			Title = post.Title;
			Image = "/images/large/" + post.Image;
			Description = post.Description;
			Tags = post.Tags;
	        Body = HttpUtility.HtmlDecode(post.Body);


			var category = _categoryService.GetCategory(post.CategoryId);
	        var rootCategory = _categoryService.GetCategory(category.Category.ParentId);
	        RootCategoryId = rootCategory.Category.Id;
	        RootCategory = rootCategory.Category.Title;
	        CategoryId = post.CategoryId;
	        Category = category.Category.Title;


			ViewCount = post.ViewCount;
	        await _postService.IncrementViewCount(id);

			return Page();
        }
    }
}