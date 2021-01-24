using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using SeoBiz.Cms.Dbs;

namespace SeoBiz.Cms.Users
{
	public class UserService : IUserService
	{
		private readonly IDb _db;

		public UserService(IDb db)
		{
			_db = db;
		}

		public Task<User> GetById(string userId)
		{
			return _db.GetCollection<User>().Find(Builders<User>.Filter.Eq(x => x.Id, new ObjectId(userId))).FirstOrDefaultAsync();
		}

		public async Task<User> GetByTelegramId(string telegramUserId)
		{
			return await _db.GetCollection<User>().Find(Builders<User>.Filter.Eq(x => x.TelegramUserId, telegramUserId)).FirstOrDefaultAsync();
		}

		public Task UpdateUserChatId(string telegramUserId, long chatId)
		{
			return _db.GetCollection<User>().UpdateOneAsync(Builders<User>.Filter.Eq(x => x.TelegramUserId, telegramUserId), Builders<User>.Update.Set(x => x.ChatId, chatId));
		}
	}
}