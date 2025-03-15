using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        ICollection<Url> Urls = new Collection<Url>();
    }
}