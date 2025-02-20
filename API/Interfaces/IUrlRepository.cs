using API.Models;

namespace API.Interfaces
{
    public interface IUrlRepository
    {
        Task<IEnumerable<Url>> GetAllAsync();
        Task<Url?> GetByIdAsync(int id);
        Task<Url?> GetByOriginalUrlAsync(string originalUrl);
        Task<Url?> GetByShortUrlAsync(string shortUrl);
        Task<bool> CreateAsync(Url url);
        Task<bool> UpdateAsync(Url url);
        Task<bool> DeleteAsync(Url url);
    }
}