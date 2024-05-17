using Microsoft.EntityFrameworkCore;
using System.Fabric;

namespace UserService.Database
{
    public class CreateMyDbContextTrips
    {
        public static TripsDbContext CreateDbContext()
        {
            var configurationPackage = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config");
            var connectionStringParameter = configurationPackage.Settings.Sections["ConnectionStringsTrips"].Parameters["YourConnectionString"];
            var connectionString = connectionStringParameter.Value;

            var dbContextOptions = new DbContextOptionsBuilder<TripsDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            return new TripsDbContext(dbContextOptions);
        }
    }
}