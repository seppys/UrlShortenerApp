using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IAuthService
    {
        string NewJwt(IdentityUser user, IList<string> roles);
        public string? GetToken(string authorization);
        public Task<IdentityUser?> GetUserByToken(string token);
    }
}