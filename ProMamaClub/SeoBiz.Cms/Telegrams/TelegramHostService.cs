using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using SeoBiz.Cms.Tokens;
using SeoBiz.Cms.Users;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;

namespace SeoBiz.Cms.Telegrams
{
	public class TelegramHostService : IHostedService
	{
		private readonly ITokenService _tokenService;
		private readonly ITelegramSender _telegramSender;
		private readonly IUserService _userService;

		public TelegramHostService(ITokenService tokenService, ITelegramSender telegramSender, IUserService userService)
		{
			_tokenService = tokenService;
			_telegramSender = telegramSender;
			_userService = userService;
		}

		public Task StartAsync(CancellationToken cancellationToken)
		{
			_telegramSender.Start(BotOnCallbackQueryReceived, BotOnMessageReceived);
			return Task.CompletedTask;
		}

		private async void BotOnMessageReceived(object sender, MessageEventArgs messageEventArgs)
		{
			var message = messageEventArgs.Message;

			if (message == null) return;

			if (message.Type == MessageType.TextMessage)
			{
				await _userService.UpdateUserChatId(message.Chat.Username, message.Chat.Id);
			}
		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			_telegramSender.Stop();

			return Task.CompletedTask;
		}

		private void BotOnCallbackQueryReceived(object sender, CallbackQueryEventArgs e)
		{
			var arguments = e.CallbackQuery.Data.Split(':');

			if (arguments[0] == "auth")
			{
				_tokenService.Activate(arguments[1]);
			}
		}
	}
}