using MongoDB.Driver;
using SeoBiz.Cms.Configurations;

namespace SeoBiz.Cms.Dbs
{
	public class Db : IDb
	{
		private readonly IConfigurator _configurator;

		public Db(IConfigurator configurator)
		{
			_configurator = configurator;
		}

		public IMongoCollection<T> GetCollection<T>()
		{
			var collection = new MongoClient(_configurator.Configuration.MongoConnectionString).GetDatabase(_configurator.Configuration.MongoDatabase).GetCollection<T>(typeof(T).Name);
			return collection;
		}
	}
}