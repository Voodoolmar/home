using Microsoft.Extensions.Configuration;

namespace SeoBiz.Cms.Configurations
{
	public class Configurator : IConfigurator
	{
		private readonly IConfiguration _configurationService;
		private Configuration _configuration;

		public Configurator(IConfiguration configurationService)
		{
			_configurationService = configurationService;
		}

		public Configuration Configuration => _configuration = _configuration ?? _configurationService.GetSection("SeoBiz").Get<Configuration>();
	}
}