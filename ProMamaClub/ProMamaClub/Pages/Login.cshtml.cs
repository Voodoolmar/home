using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SeoBiz.Cms.Tokens;

namespace ProMamaClub.Pages
{
    public class LoginModel : PageModel
	{
		[BindProperty]
		public string Login { get; set; }

	    private readonly ITokenService _tokenService;

	    public LoginModel(ITokenService tokenService)
	    {
		    _tokenService = tokenService;
	    }

	    public async Task<RedirectToPageResult> OnPostAsync()
		{
			var token = await _tokenService.GenerateToken(Login);

			HttpContext.Response.Cookies.Append("auth-token", token);
			return RedirectToPage("/Admin/Index");
		}

    }
}