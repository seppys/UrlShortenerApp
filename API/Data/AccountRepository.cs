using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class AccountRepository : IAccountRepository
    {

        private readonly UserManager<User> _userManager;

        public AccountRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> CreateUserAsync(string email, string password)
        {
            var newUser = new User()
            {
                Email = email,
                UserName = email,
            };

            return await _userManager.CreateAsync(newUser, password);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IList<string>> GetRolesAsync(User user)
        {
            return await _userManager.GetRolesAsync(user);
        }
        
        public async Task<IdentityResult> UpdateUserAsync(User user)
        {
            return await _userManager.UpdateAsync(user);
        }

        public async Task<IdentityResult> ChangePasswordAsync(User user, string oldPassword, string newPassword)
        {
            var results = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            
            return results;
        }

        public async Task<IdentityResult> ChangeUsernameAsync(User user, string username)
        {
            var results = await _userManager.SetUserNameAsync(user, username);

            return results;
        }

        public async Task<bool> CheckPasswordAsync(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
    }
}