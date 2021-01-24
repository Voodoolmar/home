using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SeoBiz.Cms.Configurations;
using SeoBiz.Cms.Dbs;
using SeoBiz.Cms.Posts;
using SeoBiz.Cms.Telegrams;
using SeoBiz.Cms.Users;

namespace SeoBiz.Cms.Comments
{
	public class CommentService : ICommentService
	{
		private readonly IPostService _postService;
		private readonly ITelegramSender _telegramSender;
		private readonly IDb _db;
		private readonly IConfigurator _configurator;
		private readonly IUserService _userService;

		public CommentService(
			IPostService postService,
			IDb db,
			ITelegramSender telegramSender,
			IConfigurator configurator,
			IUserService userService)
		{
			_postService = postService;
			_db = db;
			_telegramSender = telegramSender;
			_configurator = configurator;
			_userService = userService;
		}

		public async Task Add(string postId, string name, string email, string comment)
		{
			var post = await _postService.Get(new PostFilter { PostId = postId, WithoutBody = true });
			if (post == null)
			{
				throw new BusinessException("Пост не найден");
			}

			if (!IsValidEmail(email))
			{
				throw new BusinessException("Не верный email");
			}

			_db.GetCollection<Comment>().InsertOne(new Comment
			{
				At = DateTime.UtcNow,
				PostId = postId,
				Body = comment,
				Email = email,
				Name = name,
				State = CommentState.New
			});


			var ids = new List<long>();
			foreach (var moderator in _configurator.Configuration.Moderators)
			{
				var user = await _userService.GetByTelegramId(moderator);
				if (user != null && user.ChatId != 0)
				{
					ids.Add(user.ChatId);
				}
			}

			await _telegramSender.SendNewComment(ids.ToArray(), new Uri(new Uri(_configurator.Configuration.BaseUri), "posts/" + postId).ToString());
		}

		public async Task Approve(ObjectId commentId)
		{
			var queryBuilder = Builders<Comment>.Filter;
			var updateBuilder = Builders<Comment>.Update;
			var query = queryBuilder.Eq(x => x.Id, commentId);
			var collection = _db.GetCollection<Comment>();
			await collection.UpdateOneAsync(query, updateBuilder.Set(x => x.State, CommentState.Approved));
		}

		public async Task Delete(ObjectId commentId)
		{
			var queryBuilder = Builders<Comment>.Filter;
			var updateBuilder = Builders<Comment>.Update;
			var query = queryBuilder.Eq(x => x.Id, commentId);
			var collection = _db.GetCollection<Comment>();
			await collection.UpdateOneAsync(query, updateBuilder.Set(x => x.State, CommentState.Deleted));
		}

		public async Task Reply(ObjectId commentId, string reply)
		{
			var queryBuilder = Builders<Comment>.Filter;
			var updateBuilder = Builders<Comment>.Update;
			var query = queryBuilder.Eq(x => x.Id, commentId);
			var collection = _db.GetCollection<Comment>();
			var result = await collection.UpdateOneAsync(query, updateBuilder
				.Set(x => x.State, CommentState.Replied).Set(x => x.Reply, new CommentReply
				{
					At = DateTime.UtcNow,
					Body = reply
				}));

			if (result.ModifiedCount == 1)
			{
				try
				{
					var comment = await collection.Find(query).FirstOrDefaultAsync();

					var client = new SmtpClient(_configurator.Configuration.Email.StmpHost, _configurator.Configuration.Email.StmpPort);
					client.UseDefaultCredentials = false;
					client.Credentials = new NetworkCredential(_configurator.Configuration.Email.Username, _configurator.Configuration.Email.Password);

					var mailMessage = new MailMessage();
					mailMessage.From = new MailAddress(_configurator.Configuration.Email.SenderEmail);
					mailMessage.To.Add(comment.Email);

					var uri = new Uri(new Uri(_configurator.Configuration.BaseUri), $"posts/{comment.PostId}#{comment.Id}");
					mailMessage.Subject = _configurator.Configuration.Email.ReplySubject;
					mailMessage.Body = $"Здравствуйте, { comment.Name }!\n\nВам ответили на комментарий. Чтобы посмотреть ответ, перейдите по ссылке:\n\n{uri}";

					await client.SendMailAsync(mailMessage);
				}
				catch (Exception e)
				{
					//TODO::log
				}
			}
		}

		public async Task<List<Comment>> GetList(CommentFilter filter)
		{
			var options = new FindOptions<Comment>
			{
				Sort = Builders<Comment>.Sort.Ascending(x => x.At)
			};

			var builder = Builders<Comment>.Filter;
			var queries = builder.Eq(x => x.PostId, filter.PostId);
			if (filter.States.Length > 0)
			{
				queries &= builder.In(x => x.State, filter.States);
			}
			else
			{
				queries &= builder.In(x => x.State, new[] { CommentState.Approved, CommentState.Replied });
			}

			var comments = await (await _db.GetCollection<Comment>().FindAsync(queries, options)).ToListAsync();

			return comments;
		}

		private bool IsValidEmail(string email)
		{
			try
			{
				new MailAddress(email);
				return true;
			}
			catch (FormatException)
			{
				return false;
			}
		}
	}
}