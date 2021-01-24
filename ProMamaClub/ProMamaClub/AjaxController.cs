using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Comments;
using SeoBiz.Cms.Posts;

namespace ProMamaClub
{
	public class AjaxController : Controller
	{
		private readonly ICategoryService _categoryService;
		private readonly IAuthService _authService;
		private readonly ICommentService _commentService;
		private readonly IPostService _postService;

		public AjaxController(ICategoryService categoryService, IAuthService authService, ICommentService commentService, IPostService postService)
		{
			_categoryService = categoryService;
			_authService = authService;
			_commentService = commentService;
			_postService = postService;
		}

		public async Task<JsonResult> GetCategory(string id)
		{
			var category = _categoryService.GetCategory(id);
			return Json(category);
		}

		public async Task ConfirmComment(string id)
		{
			if (!await _authService.IsAuthentificated()) return;
			await _commentService.Approve(new ObjectId(id));
		}

		public async Task RemoveComment(string id)
		{
			if (!await _authService.IsAuthentificated()) return;
			await _commentService.Delete(new ObjectId(id));
		}


		[Route("/sitemap.xml")]
		public async Task<ContentResult> SitemapXml()
		{
			var sitemapNodes = await GetSitemapNodes(Url);
			var xml = GetSitemapDocument(sitemapNodes);
			return Content(xml, "text/xml", Encoding.UTF8);
		}


		public async Task<IReadOnlyCollection<SitemapNode>> GetSitemapNodes(IUrlHelper urlHelper)
		{
			var nodes = new List<SitemapNode>();


			var page = await _postService.GetPage(new PostListFilter { Published = true, WithoutBody = true, Limit = 20000});
			foreach (var post in page.Items)
			{
				nodes.Add(new SitemapNode
				{
					Url = $"https://promamaclub.ru/Post/{post.Id}",
					Frequency = SitemapFrequency.Weekly,
					Priority = 0.8,
					LastModified = post.RowVersion
				});
			}

			return nodes;
		}
		
		public string GetSitemapDocument(IEnumerable<SitemapNode> sitemapNodes)
		{
			XNamespace xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";
			var root = new XElement(xmlns + "urlset");

			foreach (var sitemapNode in sitemapNodes)
			{
				var urlElement = new XElement(
					xmlns + "url",
					new XElement(xmlns + "loc", Uri.EscapeUriString(sitemapNode.Url)),
					sitemapNode.LastModified == null ? null : new XElement(
						xmlns + "lastmod",
						sitemapNode.LastModified.Value.ToLocalTime().ToString("yyyy-MM-ddTHH:mm:sszzz")),
					sitemapNode.Frequency == null ? null : new XElement(
						xmlns + "changefreq",
						sitemapNode.Frequency.Value.ToString().ToLowerInvariant()),
					sitemapNode.Priority == null ? null : new XElement(
						xmlns + "priority",
						sitemapNode.Priority.Value.ToString("F1", CultureInfo.InvariantCulture)));
				root.Add(urlElement);
			}

			var document = new XDocument(root);
			return document.ToString();
		}

	}


}