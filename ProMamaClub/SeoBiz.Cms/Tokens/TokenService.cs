using System;
using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using SeoBiz.Cms.Dbs;
using SeoBiz.Cms.Telegrams;
using SeoBiz.Cms.Users;

namespace SeoBiz.Cms.Tokens
{
	public class TokenService : ITokenService
	{
		private readonly IDb _db;
		private readonly IUserService _userService;
		private readonly ITelegramSender _telegramSender;

		private static readonly ConcurrentDictionary<string, Token> TokenCache = new ConcurrentDictionary<string, Token>();

		private static readonly RNGCryptoServiceProvider Generator = new RNGCryptoServiceProvider();

		public TokenService(IDb db, IUserService userService, ITelegramSender telegramSender)
		{
			_db = db;
			_userService = userService;
			_telegramSender = telegramSender;
		}

		public async ValueTask<Token> Get(string id)
		{
			if (TokenCache.TryGetValue(id, out var token))
			{
				return token;
			}

			token = await _db.GetCollection<Token>().Find(Builders<Token>.Filter.Eq(x => x.Id, id)).FirstOrDefaultAsync();
			TokenCache.TryAdd(id, token);
			return token;
		}

		public async Task Activate(string id)
		{
			var filter = Builders<Token>.Filter;

			var now = DateTime.UtcNow;
			
			var query = filter.And(filter.Eq(x => x.Id, id), filter.Eq(x => x.ActivatedAt, null));
			var update = Builders<Token>.Update.Set(x => x.ActivatedAt, now);
			var result = await _db.GetCollection<Token>().UpdateOneAsync(query, update);
			if (result.ModifiedCount == 1)
			{
				var token = await _db.GetCollection<Token>().Find(filter.Eq(x => x.Id, id)).FirstAsync();
				TokenCache[id] = token;
			}
		}

		public async Task<string> GenerateToken(string telegramUserId)
		{
			var user = await _userService.GetByTelegramId(telegramUserId);

			var tokenValue = GenerateToken();

			if (user == null)
			{
				return tokenValue;
			}

			var token = new Token
			{
				Id = tokenValue,
				UserId = user.Id.ToString(),
				CreatedAt = DateTime.UtcNow
			};

			await _db.GetCollection<Token>().InsertOneAsync(token);

			await _telegramSender.SendAuth(user.ChatId, tokenValue);

			if (!TokenCache.TryAdd(tokenValue, token))
			{
				throw new Exception("Bad token");
			}

			return tokenValue;
		}

		public string GenerateToken()
		{
			var buffer = new byte[24];
			Generator.GetBytes(buffer);
			var token = ByteArrayToString(buffer);
			return token;
		}

		private static string ByteArrayToString(byte[] ba)
		{
			var hex = new StringBuilder(ba.Length * 2);
			foreach (var b in ba)
				hex.AppendFormat("{0:x2}", b);
			return hex.ToString();
		}
	}
}