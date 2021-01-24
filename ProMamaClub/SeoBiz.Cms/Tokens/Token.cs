using System;

namespace SeoBiz.Cms.Tokens
{
	public class Token
	{
		public string Id { get; set; }
		public string UserId { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime? ActivatedAt { get; set; }

		public bool IsActivated => ActivatedAt.HasValue;
	}
}