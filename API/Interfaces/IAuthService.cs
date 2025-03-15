using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IAuthService
    {
        string NewJwt(User user, IList<string> roles);
        public string? GetToken(string authorization);
        public Task<User?> GetUserByToken(string token);
    }
}