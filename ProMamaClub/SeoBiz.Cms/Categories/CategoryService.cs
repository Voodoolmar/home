using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using SeoBiz.Cms.Dbs;
using SeoBiz.Cms.Posts;

namespace SeoBiz.Cms.Categories
{
	public class CategoryService : ICategoryService
	{
		private readonly IDb _db;

		private static readonly CategoryCache CategoryCacheInstance = new CategoryCache();

		public CategoryService(IDb db)
		{
			_db = db;
		}

		public async Task DropCache()
		{
			var now = DateTime.UtcNow;
			var categoryPostCounts = await _db
				.GetCollection<Post>()
				.Aggregate()
				.Match(x => x.IsPublished)
				.Group(x => x.CategoryId, x => new CategoryPostCount { Id = x.Key, Count = x.Count() })
				.ToListAsync();
			var categoryCountMap = categoryPostCounts.ToDictionary(x => x.Id, x => x.Count);

			var categoryList = await GetList();

			var categoryMap = new Dictionary<string, CategoryViewItem>();

			foreach (var category in categoryList)
			{
				categoryMap.Add(category.Id, new CategoryViewItem
				{
					Category = category,
					PostCount = categoryCountMap.TryGetValue(category.Id, out var count) ? count : 0
				});
			}

			var roots = new CategoryViewItem[0];
			foreach (var parent in categoryList
				.GroupBy(x => x.ParentId, x => categoryMap.TryGetValue(x.Id, out var categoryViewItem) ? categoryViewItem : null))
			{
				if (parent.Key == null)
				{
					roots = parent.OrderBy(x => x.Category.Sort).ToArray();
				}
				else if (categoryMap.TryGetValue(parent.Key, out var categoryViewItem))
				{
					categoryViewItem.Subcategories = parent.OrderBy(x => x.Category.Sort).ToArray();
				}
			}

			CategoryCacheInstance.Initialize(now, roots, categoryMap);
		}

		public CategoryViewItem[] GetRootCategories()
		{
			return CategoryCacheInstance.GetRootCategories();
		}

		public CategoryViewItem GetCategory(string id)
		{
			return CategoryCacheInstance.GetCategory(id);
		}

		public async Task Up(string id)
		{
			await Swap(id, -1);
		}

		public async Task Down(string id)
		{
			await Swap(id, 1);
		}

		private async Task Swap(string id, int delta)
		{
			var category = GetCategory(id);

			var parentId = category.Category.ParentId;

			await Resort(parentId);

			var siblings = GetSiblings(parentId);
			if (siblings.Length < 2)
			{
				return;
			}

			var index = Array.FindIndex(siblings, x => x.Category.Id == id);

			var swapIndex = index + delta;

			if (swapIndex < 0 || swapIndex >= siblings.Length)
			{
				return;
			}

			var current = siblings[index].Category;
			var currentClone = current.Clone();

			var swapping = siblings[swapIndex].Category;
			var swappingClone = swapping.Clone();

			currentClone.Sort = swapping.Sort;
			swappingClone.Sort = current.Sort;

			await InternalSave(currentClone);
			await InternalSave(swappingClone);

			await DropCache();
		}

		private async Task Resort(string parentId)
		{
			var siblings = GetSiblings(parentId).OrderBy(x => x.Category.Sort).ThenBy(x => x.Category.Title).ToArray();

			var categoryToSave = new List<Category>();

			for (var i = 0; i < siblings.Length; ++i)
			{
				if (siblings[i].Category.Sort != i)
				{
					var clone = siblings[i].Category.Clone();
					clone.Sort = i;
					categoryToSave.Add(clone);
				}
			}

			if (categoryToSave.Count > 0)
			{
				foreach (var c in categoryToSave)
				{
					await InternalSave(c);
				}

				await DropCache();
			}
		}

		private CategoryViewItem[] GetSiblings(string parentId)
		{
			return parentId != null
				? GetCategory(parentId).Subcategories ?? new CategoryViewItem[0]
				: GetRootCategories();
		}

		public async Task Save(Category category)
		{
			if (GetCategory(category.Id) == null)
			{
				await Resort(category.ParentId);

				category.Sort = (GetSiblings(category.ParentId).OrderByDescending(x => x.Category.Sort).FirstOrDefault()?.Category.Sort ?? 0) + 1;
			}

			await InternalSave(category);

			Task.Run(DropCache);
		}

		private async Task InternalSave(Category category)
		{
			var collection = _db.GetCollection<Category>();
			var filter = Builders<Category>.Filter;

			var savedPost = await (await collection.FindAsync(filter.Eq(x => x.Id, category.Id))).FirstOrDefaultAsync();

			if (savedPost == null)
			{
				await collection.InsertOneAsync(category);
			}
			else
			{
				await collection.ReplaceOneAsync(filter.Eq(x => x.Id, category.Id), category);
			}
		}

		private async Task<List<Category>> GetList()
		{
			var builder = Builders<Category>.Filter;

			var categories = await (await _db.GetCollection<Category>().FindAsync(builder.Empty)).ToListAsync();
			return categories;
		}

		private class CategoryCache
		{
			private readonly DateTime _version;
			private CategoryViewItem[] _rootCategories;
			private Dictionary<string, CategoryViewItem> _categories;

			public CategoryCache()
			{
				_rootCategories = new CategoryViewItem[0];
				_categories = new Dictionary<string, CategoryViewItem>();
				_version = DateTime.MinValue;
			}

			public void Initialize(DateTime version, CategoryViewItem[] roots, Dictionary<string, CategoryViewItem> categories)
			{
				lock (this)
				{
					if (version <= _version)
					{
						return;
					}
					_rootCategories = roots;
					_categories = categories;
				}
			}

			public CategoryViewItem[] GetRootCategories()
			{
				return _rootCategories;
			}

			public CategoryViewItem GetCategory(string id)
			{
				return _categories.TryGetValue(id, out var category) ? category : null;
			}
		}

		private class CategoryPostCount
		{
			public string Id { get; set; }
			public long Count { get; set; }
		}
	}
}