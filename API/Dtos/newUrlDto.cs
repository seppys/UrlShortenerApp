using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class newUrlDto
    {
        [Url]
		public required string OriginalUrl { get; set; }
    }
}