namespace API.Dtos
{
    public class getUrlDto
    {
        public int Id { get; set; }
		public required string OriginalUrl { get; set; }
		public required string ShortUrl { get; set; }
		public int Clicks { get; set; } = 0;
    }
}