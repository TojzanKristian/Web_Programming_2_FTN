using Common.Models;
using Microsoft.EntityFrameworkCore;

namespace UserService.Database
{
    public class RatingsDbContext : DbContext
    {
        public DbSet<Rating> RatingsOfDrivers { get; set; }

        public RatingsDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}