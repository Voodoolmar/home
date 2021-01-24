using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SeoBiz.Cms.Posts;

namespace ProMamaClub.Pages.Admin
{
	public class PostsModel : PageModel
	{
		private readonly IPostService _postService;
		private readonly IAuthService _authService;

		public PostsModel(IPostService postService, IAuthService authService)
		{
			_postService = postService;
			_authService = authService;
		}
		public async Task<ActionResult> OnGet(int skip = 0)
		{
			if (!await _authService.IsAuthentificated()) return NotFound();

			var posts = await _postService.GetPage(new PostListFilter
			{
				WithoutBody = true,
				Skip = skip
			});

			Posts = posts.Items;
			Skip = skip;
			return Page();
		}
		public async Task<RedirectToPageResult> OnGetPublishAsync(string id, int skip = 0)
		{
			await _postService.Publish(id, true);
			return RedirectToPage(new { Skip = skip });
		}
		public async Task<RedirectToPageResult> OnGetUnpublishAsync(string id, int skip = 0)
		{
			await _postService.Publish(id, false);
			return RedirectToPage(new {Skip = skip});
		}

		public List<SeoBiz.Cms.Posts.Post> Posts { get; set; }
		public int Skip { get; set; }
	}
}