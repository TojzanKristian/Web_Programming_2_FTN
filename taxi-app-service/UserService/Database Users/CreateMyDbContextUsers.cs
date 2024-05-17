using Microsoft.EntityFrameworkCore;
using System.Fabric;

namespace UserService.Database
{
    public class CreateMyDbContextUsers
    {
        public static UsersDbContext CreateDbContext()
        {
            var configurationPackage = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config");
            var connectionStringParameter = configurationPackage.Settings.Sections["ConnectionStringsUsers"].Parameters["YourConnectionString"];
            var connectionString = connectionStringParameter.Value;

            var dbContextOptions = new DbContextOptionsBuilder<UsersDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            return new UsersDbContext(dbContextOptions);
        }
    }
}