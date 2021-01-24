using System.Threading.Tasks;

namespace SeoBiz.Cms.Categories
{
	public interface ICategoryService
	{
		Task Save(Category category);
		Task DropCache();
		CategoryViewItem[] GetRootCategories();
		CategoryViewItem GetCategory(string id);
		Task Up(string id);
		Task Down(string id);
	}
}