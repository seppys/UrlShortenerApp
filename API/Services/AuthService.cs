using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class AuthService : IAuthService
    {

        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;

        public AuthService(IConfiguration config, UserManager<User> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        public string NewJwt(User user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Sid, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:TokenKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(720),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
            return jwt;
        }

        public string? GetToken(string authorizationHeader)
        {
            string? token = null;
            if (authorizationHeader != null)
            {
                if (authorizationHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    token = authorizationHeader.Substring("Bearer ".Length).Trim();
                }
            }
            return token;
        }

        public async Task<User?> GetUserByToken(string token)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var readableToken = jwtHandler.CanReadToken(token);
            var jwt = jwtHandler.ReadJwtToken(token);
            var userId = jwt.Claims.First(c => c.Type == ClaimTypes.Sid).Value;

            return await _userManager.FindByIdAsync(userId);
        }
    }
}