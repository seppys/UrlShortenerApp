using API.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class AccountRepository : IAccountRepository
    {

        private readonly UserManager<IdentityUser> _userManager;

        public AccountRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> CreateUserAsync(string email, string password)
        {
            var newUser = new IdentityUser()
            {
                UserName = email,
                Email = email,
            };

            return await _userManager.CreateAsync(newUser, password);
        }

        public async Task<string> CreateEmailConfirmationToken(IdentityUser user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<IdentityUser?> GetUserByUsernameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<IdentityUser?> GetUserByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<IdentityUser?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IList<string>> GetRolesAsync(IdentityUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }
        
        public async Task<IdentityResult> UpdateUserAsync(IdentityUser user)
        {
            return await _userManager.UpdateAsync(user);
        }

        public async Task<IdentityResult> ChangePasswordAsync(IdentityUser user, string oldPassword, string newPassword)
        {
            var results = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            
            return results;
        }

        public async Task<IdentityResult> ChangeUsernameAsync(IdentityUser user, string username)
        {
            var results = await _userManager.SetUserNameAsync(user, username);

            return results;
        }

        public async Task<bool> CheckPasswordAsync(IdentityUser user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
    }
}