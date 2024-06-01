using Common.Models;
using Microsoft.EntityFrameworkCore;

namespace UserService.Database
{
    public class UsersDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UsersDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}