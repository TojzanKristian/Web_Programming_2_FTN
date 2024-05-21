using Microsoft.EntityFrameworkCore;
using System.Fabric;

namespace UserService.Database
{
    public class CreateMyDbContextRatings
    {
        public static RatingsDbContext CreateDbContext()
        {
            var configurationPackage = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config");
            var connectionStringParameter = configurationPackage.Settings.Sections["ConnectionStringsRatings"].Parameters["YourConnectionString"];
            var connectionString = connectionStringParameter.Value;

            var dbContextOptions = new DbContextOptionsBuilder<RatingsDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            return new RatingsDbContext(dbContextOptions);
        }
    }
}