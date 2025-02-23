using API.Dtos;
using API.Helpers;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class UrlController : BaseApiController
    {
        private readonly IUrlRepository _urlRepository;

        public UrlController(IUrlRepository urlRepository)
        {
            _urlRepository = urlRepository;
        }

        [HttpGet] // api/url
        public async Task<ActionResult> GetAll()
        {
            var urls = await _urlRepository.GetAllAsync();
            return Ok(urls);
        }

        [HttpGet("{urlCode}")] // api/url/{urlCode}
        public async Task<ActionResult> Redirect()
        {
            var currentUrl = Request.GetDisplayUrl();
            var url = await _urlRepository.GetByShortUrlAsync(currentUrl);
            if (url == null)
                return NotFound();
            return Redirect(url.OriginalUrl);
        }

        [HttpPost("new")] // api/url/new
        public async Task<ActionResult> CreateUrl(newUrlDto url)
        {
            var existsUrl = await _urlRepository.GetByOriginalUrlAsync(url.OriginalUrl);

            if (existsUrl != null)
                return BadRequest("This url already exists");

            var randomString = RandomStringGenerator.GenerateRandomString(5);
            var shortUrl =$"{Request.Scheme}://{Request.Host.Value}/api/url/{randomString}";

            var newUrl = new Url()
            {
                OriginalUrl = url.OriginalUrl,
                ShortUrl = shortUrl
            };

            var results = await _urlRepository.CreateAsync(newUrl);

            if (!results)
                return BadRequest();

            return Ok(newUrl);
        }
    }
}