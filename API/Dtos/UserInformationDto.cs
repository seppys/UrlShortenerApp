using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserInformationDto
    {
        [EmailAddress]
        public required string Email { get; set; }
    }
}