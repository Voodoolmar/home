using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SeoBiz.Cms.Tokens;

namespace ProMamaClub
{
	public class Constants
	{
		public const string SiteName = "ProMamaClub.ru";
		public const string Name = "Клуб современных мам";
	}

	public interface IStyleLoaderService
	{
		string Load();
	}

	public class StyleLoaderService: IStyleLoaderService
	{
		private string _styles;
		
		public string Load()
		{
			if (string.IsNullOrEmpty(_styles))
			{
				_styles = File.ReadAllText("wwwroot/site.min.css");
			}
			return _styles;
		}
	}

	public interface IAuthService
	{
		Task<bool> IsAuthentificated();
	}

	public class AuthService : IAuthService
	{
		private readonly ITokenService _tokenService;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public AuthService(ITokenService tokenService, IHttpContextAccessor httpContextAccessor)
		{
			_tokenService = tokenService;
			_httpContextAccessor = httpContextAccessor;
		}

		public async Task<bool> IsAuthentificated()
		{
			   var authenticated = false;
			if (_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("auth-token", out var token))
			{
				var tokenDto = await _tokenService.Get(token);
				if (tokenDto?.IsActivated == true)
				{
					authenticated = true;
				}
			}

			return authenticated;
		}
	}

	public class SitemapNode
	{
		public SitemapFrequency? Frequency { get; set; }
		public DateTime? LastModified { get; set; }
		public double? Priority { get; set; }
		public string Url { get; set; }
	}

	public enum SitemapFrequency
	{
		Never,
		Yearly,
		Monthly,
		Weekly,
		Daily,
		Hourly,
		Always
	}
}
