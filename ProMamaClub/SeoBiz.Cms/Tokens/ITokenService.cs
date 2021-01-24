using System.Threading.Tasks;

namespace SeoBiz.Cms.Tokens
{
	public interface ITokenService
	{
		ValueTask<Token> Get(string id);
		Task<string> GenerateToken(string telegramUserId);
		Task Activate(string id);
	}
}