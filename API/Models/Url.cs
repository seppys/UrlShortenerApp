using System.ComponentModel.DataAnnotations;

namespace API.Models
{
	public class Url
	{
		public int Id { get; set; }

		[Url]
		public required string OriginalUrl { get; set; }

		[Url]
		public required string ShortUrl { get; set; }
	}
}
