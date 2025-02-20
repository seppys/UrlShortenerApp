using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UrlRepository : IUrlRepository
    {
        private readonly DataContext _dataContext;

        public UrlRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Url>> GetAllAsync()
        {
            return await _dataContext.Urls.ToListAsync();
        }
        public async Task<Url?> GetByIdAsync(int id)
        {
            return await _dataContext.Urls.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<Url?> GetByOriginalUrlAsync(string originalUrl)
        {
            return await _dataContext.Urls.FirstOrDefaultAsync(u => u.OriginalUrl == originalUrl);
        }
        public async Task<Url?> GetByShortUrlAsync(string shortUrl)
        {
            return await _dataContext.Urls.FirstOrDefaultAsync(u => u.ShortUrl == shortUrl);
        }
        public async Task<bool> CreateAsync(Url url)
        {
            await _dataContext.Urls.AddAsync(url);

            return await SaveAsync();
        }
        public async Task<bool> UpdateAsync(Url url)
        {
            _dataContext.Update(url);

            return await SaveAsync();
        }
        public async Task<bool> DeleteAsync(Url url)
        {
            _dataContext.Remove(url);

            return await SaveAsync();
        }

        private async Task<bool> SaveAsync()
        {
            var results = await _dataContext.SaveChangesAsync();
            return results != 0;
        }
    }
}