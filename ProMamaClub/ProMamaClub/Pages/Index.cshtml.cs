using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ProMamaClub.Models;
using SeoBiz.Cms.Posts;

namespace ProMamaClub.Pages
{
    public class IndexModel : PageModel
    {
	    private readonly IPostService _postService;
	    public PostPreview[] LatestNews { get; private set; }

	    public IndexModel(IPostService postService)
	    {
		    _postService = postService;
	    }

        public async Task OnGet()
        {
	        var posts = await _postService.GetPage(new PostListFilter
	        {
				Limit = 15,
				Published = true,
				WithoutBody = true
	        });

	        LatestNews = posts.Items.Select(x => new PostPreview(x)).ToArray();
        }
    }
}
