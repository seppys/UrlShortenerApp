using System.Text;
using API.Data;
using API.Interfaces;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class AuthExtension
    {
        public static IServiceCollection AddAuthServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<User>().AddRoles<IdentityRole>().AddEntityFrameworkStores<DataContext>(); ;
            services.AddIdentityApiEndpoints<User>()
                .AddEntityFrameworkStores<DataContext>();
            services.AddAuthorization();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:TokenKey"])),
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });
            services.AddScoped<IAuthService, AuthService>();

            return services;
        }
    }
}