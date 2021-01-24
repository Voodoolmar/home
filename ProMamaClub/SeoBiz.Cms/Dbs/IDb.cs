using MongoDB.Driver;

namespace SeoBiz.Cms.Dbs
{
	public interface IDb
	{
		IMongoCollection<T> GetCollection<T>();
	}
}