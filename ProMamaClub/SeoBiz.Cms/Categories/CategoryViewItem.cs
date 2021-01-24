namespace SeoBiz.Cms.Categories
{
	public class CategoryViewItem
	{
		public Category Category { get; internal set; }
		public CategoryViewItem[] Subcategories { get; internal set; }
		public long PostCount { get; internal set; }
	}
}