using System;
using System.Threading.Tasks;
using SeoBiz.Cms.Configurations;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types;
using Telegram.Bot.Types.InlineKeyboardButtons;
using Telegram.Bot.Types.ReplyMarkups;

namespace SeoBiz.Cms.Telegrams
{
	public class TelegramSender : ITelegramSender
	{
		private readonly IConfigurator _configurator;
		private TelegramBotClient _bot;

		public TelegramSender(IConfigurator configurator)
		{
			_configurator = configurator;
		}

		public void Start(EventHandler<CallbackQueryEventArgs> botOnCallbackQueryReceived, EventHandler<MessageEventArgs> botOnMessageReceived)
		{
			if (_bot != null)
			{
				return;
			}

			_bot = new TelegramBotClient(_configurator.Configuration.TelegramToken);

			_bot.OnMessage += botOnMessageReceived;
			_bot.OnMessageEdited += botOnMessageReceived;

			_bot.OnCallbackQuery += botOnCallbackQueryReceived;

			if (!_bot.IsReceiving)
			{
				_bot.StartReceiving();
			}
		}

		public void Stop()
		{
			if (_bot != null && _bot.IsReceiving)
			{
				_bot.StopReceiving();
			}
		}

		public async Task SendAuth(long chatId, string token)
		{
			var keyboard = new InlineKeyboardMarkup(new InlineKeyboardButton[] { new InlineKeyboardCallbackButton("войти", "auth:" + token) });
			await _bot.SendTextMessageAsync(chatId, "войти", replyMarkup: keyboard);
		}

		public async Task SendNewComment(long[] chatIds, string url)
		{
			foreach (var chatId in chatIds)
			{
				await _bot.SendTextMessageAsync(chatId, "новый коммент: " + url);
			}
		}
	}
}