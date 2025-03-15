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
		public int Clicks { get; set; } = 0;
		public User User { get; set; } = null!;
		public required string UserId { get; set; }
	}
}
