using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> CreateUserAsync(string email, string password);
        Task<string> CreateEmailConfirmationToken(IdentityUser user);
        Task<IdentityUser?> GetUserByUsernameAsync(string username);
        Task<IdentityUser?> GetUserByIdAsync(string id);
        Task<IdentityUser?> GetUserByEmailAsync(string email);
        Task<IList<string>> GetRolesAsync(IdentityUser user);
        Task<IdentityResult> UpdateUserAsync(IdentityUser user);
        Task<IdentityResult> ChangeUsernameAsync(IdentityUser user, string username);
        Task<IdentityResult> ChangePasswordAsync(IdentityUser user, string oldPassword, string newPassword);
        Task<bool> CheckPasswordAsync(IdentityUser user, string password);
    }
}