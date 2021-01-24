using System;
using System.Threading.Tasks;
using MongoDB.Driver;
using SeoBiz.Cms.Categories;
using SeoBiz.Cms.Dbs;

namespace SeoBiz.Cms.Posts
{
	public class PostService : IPostService
	{
		private readonly IDb _db;
		private readonly ICategoryService _categoryService;

		public PostService(IDb db, ICategoryService categoryService)
		{
			_db = db;
			_categoryService = categoryService;
		}

		public async Task<Post> Get(PostFilter filter)
		{
			var options = new FindOptions<Post>
			{
			};

			if (filter.WithoutBody)
			{
				options.Projection = Builders<Post>.Projection.Exclude(x => x.Body);
			}

			var post = await (await _db.GetCollection<Post>().FindAsync(Builders<Post>.Filter.Eq(x => x.Id, filter.PostId), options)).FirstOrDefaultAsync();
			return post;
		}

		public async Task<Page<Post>> GetPage(PostListFilter filter)
		{
			var builder = Builders<Post>.Filter;
			var query = builder.Eq(x => x.IsDeleted, false);
			if (filter.CategoryIds != null)
			{
				query &= builder.In(x => x.CategoryId, filter.CategoryIds);
			}

			if (filter.Published)
			{
				query &= builder.Eq(x => x.IsPublished, true);
			}

			var options = new FindOptions<Post>
			{
				Sort = Builders<Post>.Sort.Descending(x => x.Date),
				Limit = filter.Limit > 0 ? filter.Limit : 10,
				Skip = filter.Skip,
			};

			if (filter.WithoutBody)
			{
				options.Projection = Builders<Post>.Projection.Exclude(x => x.Body);
			}

			var getPostsTask = (await _db.GetCollection<Post>().FindAsync(query, options)).ToListAsync();
			var getPostCountTask = _db.GetCollection<Post>().CountAsync(query);
			await Task.WhenAll(getPostsTask, getPostCountTask);
			return new Page<Post>(getPostsTask.Result, getPostCountTask.Result);
		}

		public async Task Save(Post post)
		{
			var collection = _db.GetCollection<Post>();
			var filter = Builders<Post>.Filter;

			while (true)
			{
				var savedPost = await (await collection.FindAsync(filter.Eq(x => x.Id, post.Id))).FirstOrDefaultAsync();

				if (savedPost == null)
				{
					try
					{
						post.RowVersion = DateTime.UtcNow;
						await collection.InsertOneAsync(post);
						break;
					}
					catch (Exception e)
					{
						//TODO:catch concurrency exception, then update
						throw;
					}
				}
				else
				{
					var idExpression = filter.Eq(x => x.Id, post.Id);
					var rowVersionExpression = filter.Eq(x => x.RowVersion, savedPost.RowVersion);

					post.IsDeleted = savedPost.IsDeleted;
					post.IsPublished = savedPost.IsPublished;
					post.ViewCount = savedPost.ViewCount;
					post.Date = savedPost.Date;
					post.RowVersion = DateTime.UtcNow;
					var result = await collection.ReplaceOneAsync(filter.And(idExpression, rowVersionExpression), post);
					if (result.ModifiedCount == 1)
					{
						break;
					}
				}
			}

			Task.Run(_categoryService.DropCache);
		}

		public async Task Publish(string id, bool state)
		{
			var collection = _db.GetCollection<Post>();
			var filter = Builders<Post>.Filter;

			await collection.UpdateOneAsync(filter.Eq(x => x.Id, id), Builders<Post>.Update.Set(x => x.IsPublished, state));

			Task.Run(_categoryService.DropCache);
		}

		public async Task IncrementViewCount(string id)
		{
			var collection = _db.GetCollection<Post>();
			var filter = Builders<Post>.Filter;

			await collection.UpdateOneAsync(filter.Eq(x => x.Id, id), Builders<Post>.Update.Set(x => x.RowVersion, DateTime.UtcNow).Inc(x => x.ViewCount, 1));
		}

		public async Task IncrementCommentCount(string id)
		{
			var collection = _db.GetCollection<Post>();
			var filter = Builders<Post>.Filter;

			await collection.UpdateOneAsync(filter.Eq(x => x.Id, id), Builders<Post>.Update.Set(x => x.RowVersion, DateTime.UtcNow).Inc(x => x.CommentCount, 1));
		}
	}
}