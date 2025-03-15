using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> CreateUserAsync(string email, string password);
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByIdAsync(string id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<IList<string>> GetRolesAsync(User user);
        Task<IdentityResult> UpdateUserAsync(User user);
        Task<IdentityResult> ChangeUsernameAsync(User user, string username);
        Task<IdentityResult> ChangePasswordAsync(User user, string oldPassword, string newPassword);
        Task<bool> CheckPasswordAsync(User user, string password);
    }
}