using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SeoBiz.Cms.Comments;

namespace ProMamaClub.Pages.Comments
{
	public class Comment
	{
		public string PostId { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public string Text { get; set; }
	}
    public class PostModel : PageModel
    {
	    private readonly ICommentService _commentService;
		
	    public PostModel(ICommentService commentService)
	    {
		    _commentService = commentService;
	    }
		[BindProperty]
		public Comment Comment { get; set; }

        public void OnPost()
        {
	        _commentService.Add(Comment.PostId, Comment.Name, Comment.Email, Comment.Text);
        }
    }
}