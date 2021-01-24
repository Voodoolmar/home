using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeoBiz.Cms.Categories;

namespace ProMamaClub.Pages.Admin
{
	public class Category
	{
		public string Id { get; set; }
		[Required]
		public string Title { get; set; }

		public string Image { get; set; }

		public string Tags { get; set; }

		public string ParentId { get; set; }

		[Required]
		public string Description { get; set; }
	}

	[IgnoreAntiforgeryToken(Order = 1001)]
	public class CategoryModel : PageModel
	{
		private readonly ICategoryService _categoryService;
		private readonly IAuthService _authService;

		public CategoryModel(ICategoryService categoryService, IAuthService authService)
		{
			_categoryService = categoryService;
			_authService = authService;
		}

		public CategoryViewItem[] Categories { get; set; }
		public SelectListItem[] RootCategories { get; set; }
		
		[BindProperty]
		public Category Category { get; set; }

		public async Task<ActionResult> OnGetUpAsync(string id)
		{
			await _categoryService.Up(id);
			return RedirectToPage("/Admin/Category");
		}
		public async Task<ActionResult> OnGetDownAsync(string id)
		{
			await _categoryService.Down(id);
			return RedirectToPage("/Admin/Category");
		}

		public async Task<ActionResult> OnGet(string id)
		{
			if (!await _authService.IsAuthentificated()) return NotFound();
			FillCategories();
			var category = id!=null ? _categoryService.GetCategory(id).Category : null;

			if (category != null)
			{
				Category = new Category
				{
					Id = category.Id,
					Title = category.Title,
					Image = category.Image,
					Description = category.Description,
					ParentId = category.ParentId,
					Tags = string.Join(", ", category.Tags)
				};
			}
			else
			{
				Category = new Category();
			}

			return Page();
		}


		public async Task<ActionResult> OnPost()
		{
			if (!await _authService.IsAuthentificated()) return NotFound();
			if (!ModelState.IsValid)
			{
				FillCategories();
				return Page();
			}
			await _categoryService.Save(new SeoBiz.Cms.Categories.Category
			{
				Id = Category.Id ?? Helpers.Translit(Category.Title),
				Title = Category.Title,
				Image = Category.Image,
				Description = Category.Description,
				ParentId = Category.ParentId,
				Tags = (Category.Tags ?? string.Empty).Split(',').Select(x => x.Trim()).ToArray()
			});
			return RedirectToPage("/Admin/Category");
		}

		private void FillCategories()
		{
			var categories = _categoryService.GetRootCategories();

			Categories = categories;

			RootCategories = new[] { new SelectListItem { Value = string.Empty, Text = "Корневая" } }
				.Concat(categories.Select(x => new SelectListItem { Value = x.Category.Id, Text = x.Category.Title })).ToArray();
		}
	}
}