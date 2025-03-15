using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserAuthDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}