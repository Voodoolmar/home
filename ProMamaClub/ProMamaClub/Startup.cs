using System.Text.Encodings.Web;
using System.Text.Unicode;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.WebEncoders;
using Microsoft.Net.Http.Headers;
using SeoBiz.Cms;
using SeoBiz.Cms.Categories;

namespace ProMamaClub
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services
				.Configure<WebEncoderOptions>(options => {
					options.TextEncoderSettings = new TextEncoderSettings(UnicodeRanges.All);
				});
			services
				.AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
				.AddSingleton<IAuthService, AuthService>()
				.AddSingleton<IStyleLoaderService, StyleLoaderService>()
				.AddSeoBizCms()
				.AddMvc();


		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseBrowserLink();
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
			}

			app.ApplicationServices.GetService<ICategoryService>().DropCache();

			app.UseStaticFiles(new StaticFileOptions
			{
				ServeUnknownFileTypes = true,

				OnPrepareResponse = ctx =>
				{
					const int durationInSeconds = 7*24*60*60;
					ctx.Context.Response.Headers[HeaderNames.CacheControl] = "max-age=" + durationInSeconds;
				}
			});

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});
		}
	}
}
