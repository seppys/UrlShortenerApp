using API.Dtos;
using API.Helpers;
using API.Interfaces;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class UrlController : BaseApiController
    {
        private readonly IUrlRepository _urlRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public UrlController(IUrlRepository urlRepository, IAccountRepository accountRepository, IMapper mapper)
        {
            _urlRepository = urlRepository;
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        [HttpGet] // api/url
        public async Task<ActionResult> GetAll()
        {
            var urls = await _urlRepository.GetAllAsync();
            var getUrlsDto = _mapper.Map<List<getUrlDto>>(urls);
            return Ok(getUrlsDto);
        }

        [Authorize]
        [HttpGet("user")] // api/url/user
        public async Task<ActionResult> GetAllByUser()
        {
            var user = await _accountRepository.GetUserByIdAsync(User.GetId());
            if (user == null)
                return BadRequest();

            var urls = await _urlRepository.GetByUserIdAsync(user.Id);
            var getUrlsDto = _mapper.Map<List<getUrlDto>>(urls);
            return Ok(getUrlsDto);
        }

        [HttpGet("{urlCode}")] // api/url/{urlCode}
        public async Task<ActionResult> Redirect()
        {
            var currentUrl = Request.GetDisplayUrl();
            var url = await _urlRepository.GetByShortUrlAsync(currentUrl);
            if (url == null)
                return NotFound();
            url.Clicks++;
            await _urlRepository.UpdateAsync(url);
            return Redirect(url.OriginalUrl);
        }

        [Authorize]
        [HttpPost("new")] // api/url/new
        public async Task<ActionResult> CreateUrl(newUrlDto url)
        {
            var user = await _accountRepository.GetUserByIdAsync(User.GetId());
            if (user == null)
                return BadRequest();

            var randomString = RandomStringGenerator.GenerateRandomString(5);
            var shortUrl =$"{Request.Scheme}://{Request.Host.Value}/api/url/{randomString}";

            var newUrl = new Url()
            {
                OriginalUrl = url.OriginalUrl,
                ShortUrl = shortUrl,
                Clicks = 0,
                UserId = user.Id
            };

            var results = await _urlRepository.CreateAsync(newUrl);

            if (!results)
                return BadRequest();

            var getUrlDto = _mapper.Map<getUrlDto>(newUrl);

            return Ok(getUrlDto);
        }

        [Authorize]
        [HttpDelete("{id}")] // api/url/{id}
        public async Task<ActionResult> DeleteUrl(int id)
        {
            var user = await _accountRepository.GetUserByIdAsync(User.GetId());
            if (user == null)
                return BadRequest();

            var url = await _urlRepository.GetByIdAsync(id);
            if (url == null)
                return NotFound();

            if (url.UserId != user.Id)
                return Forbid();

            var results = await _urlRepository.DeleteAsync(url);

            if (!results)
                return BadRequest();

            return Ok();
        }
    }
}