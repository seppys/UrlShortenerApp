using System.Security.Claims;

namespace API.Services
{
    public static class ClaimService
    {
        public static string GetId(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Sid)?.Value;
        }
    }
}