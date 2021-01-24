using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Comments;
using SeoBiz.Cms.Configurations;
using SeoBiz.Cms.Dbs;
using SeoBiz.Cms.Images;
using SeoBiz.Cms.Posts;
using SeoBiz.Cms.Telegrams;
using SeoBiz.Cms.Tokens;
using SeoBiz.Cms.Users;

namespace SeoBiz.Cms
{
	public static class SeoBizCmsRegistrator
	{
		public static IServiceCollection AddSeoBizCms(this IServiceCollection services)
		{
			services
				.AddSingleton<IConfigurator, Configurator>()
				.AddSingleton<IDb, Db>()
				.AddSingleton<ITelegramSender, TelegramSender>()
				.AddSingleton<IHostedService, TelegramHostService>()
				.AddSingleton<ICategoryService, CategoryService>()
				.AddSingleton<ICommentService, CommentService>()
				.AddSingleton<IPostService, PostService>()
				.AddSingleton<ITokenService, TokenService>()
				.AddSingleton<IUserService, UserService>()
				.AddSingleton<IImageService, ImageService>();

			return services;
		}
	}
}