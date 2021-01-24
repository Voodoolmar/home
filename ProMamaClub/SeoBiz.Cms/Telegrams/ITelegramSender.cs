using System;
using System.Threading.Tasks;
using Telegram.Bot.Args;

namespace SeoBiz.Cms.Telegrams
{
	public interface ITelegramSender
	{
		Task SendAuth(long chatId, string token);
		Task SendNewComment(long[] chatIds, string url);

		void Start(EventHandler<CallbackQueryEventArgs> botOnCallbackQueryReceived, EventHandler<MessageEventArgs> botOnMessageReceived);
		void Stop();
	}
}