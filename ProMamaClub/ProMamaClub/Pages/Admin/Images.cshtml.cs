using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ProMamaClub.Pages.Admin
{
    public class ImagesModel : PageModel
    {
	    private readonly IHostingEnvironment _env;

	    public ImagesModel(IHostingEnvironment env)
	    {
		    _env = env;
	    }

		public List<string> Files = new List<string>();

        public void OnGet(string route)
		{
			var largeImages = 
				string.IsNullOrEmpty(route)
				? Path.Combine(_env.WebRootPath, "images")
				: Path.Combine(_env.WebRootPath, "images", route);
			string[] allfiles = Directory.GetFiles(largeImages, "*.*");
			foreach (var file in allfiles)
			{
				Files.Add("/" + file.Substring(file.IndexOf("images")).Replace("\\", "/"));
				// Do something with the Folder or just add them to a list via nameoflist.add();
			}
		}
    }
}