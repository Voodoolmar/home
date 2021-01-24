using MongoDB.Bson;

namespace SeoBiz.Cms.Users
{
	public class User
	{
		public ObjectId Id { get; set; }
		public string UserName { get; set; }
		public string TelegramUserId { get; set; }
		public long ChatId { get; set; }
	}
}