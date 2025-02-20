using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
	public static class DbExtension
	{
		public static IServiceCollection AddDbServices(this IServiceCollection services, IConfiguration config)
		{
			services.AddDbContext<DataContext>(options =>
			{
				options.UseSqlite("Data Source=database.db");
			});

			return services;
		}
	}
}
