using API.Dtos;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class AccountController : BaseApiController
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IAuthService _authService;

        public AccountController(IAccountRepository accountRepository, IAuthService authService)
        {
            _accountRepository = accountRepository;
            _authService = authService;
        }

        [HttpPost("register")] // api/account/register
        public async Task<ActionResult> CreateUserAsync(UserAuthDto userAuthDto)
        {
            var creationResult = await _accountRepository.CreateUserAsync(userAuthDto.Email, userAuthDto.Password);

            if (!creationResult.Succeeded)
                return BadRequest(creationResult.Errors.First());

            var newUser = await _accountRepository.GetUserByEmailAsync(userAuthDto.Email);

            var jwt = await NewJWT(newUser);

            var response = new { Token = jwt };

            return Ok(response);
        }

        [HttpPost("login")] // api/account/login
        public async Task<ActionResult> GetToken(UserAuthDto userAuthDto)
        {
            var user = await _accountRepository.GetUserByUsernameAsync(userAuthDto.Email);

            if (user == null || ! await _accountRepository.CheckPasswordAsync(user, userAuthDto.Password))
                return Unauthorized("Unauthorized");

            var jwt = await NewJWT(user);

            var response = new { Token = jwt };

            return Ok(response);
        }

        private async Task<string> NewJWT(IdentityUser user)
        {
            var roles = await _accountRepository.GetRolesAsync(user);
            
            var jwt = _authService.NewJwt(user, roles);

            return jwt;
        }
    }
}