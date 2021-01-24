using System;

namespace SeoBiz.Cms.Configurations
{
	public class Configuration
	{
		public string TelegramToken { get; set; }

		public string MongoConnectionString { get; set; }
		public string MongoDatabase { get; set; }

		public string[] Moderators { get; set; }
		public string BaseUri { get; set; }

		public EmailConfiguration Email { get; set; }
	}
}