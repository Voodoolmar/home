namespace SeoBiz.Cms.Categories
{
	public class Category
	{
		public string Id { get; set; }
		public string ParentId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string[] Tags { get; set; }
		public string Image { get; set; }
		public int Sort { get; set; }

		public Category Clone()
		{
			return new Category
			{
				ParentId = ParentId,
				Description = Description,
				Title = Title,
				Sort = Sort,
				Id = Id,
				Image = Image,
				Tags = Tags
			};
		}
	}
}