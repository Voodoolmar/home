using System.Threading.Tasks;

namespace SeoBiz.Cms.Users
{
	public interface IUserService
	{
		Task<User> GetById(string userId);
		Task<User> GetByTelegramId(string telegramUserId);
		Task UpdateUserChatId(string telegramUserId, long chatId);
	}
}