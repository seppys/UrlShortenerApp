
using API.Data;
using API.Interfaces;

namespace API.Extensions
{
    public static class DIExtension
    {
        public static IServiceCollection AddDiServices(this IServiceCollection services)
        {
            services.AddScoped<IUrlRepository, UrlRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();

            return services;
        }
    }
}