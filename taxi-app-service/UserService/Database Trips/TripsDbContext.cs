using Common.Models;
using Microsoft.EntityFrameworkCore;

namespace UserService.Database
{
    public class TripsDbContext : DbContext
    {
        public DbSet<Trip> Trips { get; set; }

        public TripsDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}