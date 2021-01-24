using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ProMamaClub.Pages.Admin
{
    public class IndexModel : PageModel
    {
	    private readonly IAuthService _authService;

	    public IndexModel(IAuthService authService)
	    {
		    _authService = authService;
	    }

        public async Task<ActionResult> OnGetAsync()
        {
	        if (!await _authService.IsAuthentificated()) return NotFound();
	        return Page();
        }
    }
}