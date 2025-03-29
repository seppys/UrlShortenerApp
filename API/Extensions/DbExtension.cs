using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
	public static class DbExtension
	{
		public static IServiceCollection AddDbServices(this IServiceCollection services, IConfiguration config)
		{
			string connectionString = config["MySql:ConnectionString"];

			services.AddDbContext<DataContext>(options =>
			{
				options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
			});

			return services;
		}
	}
}
