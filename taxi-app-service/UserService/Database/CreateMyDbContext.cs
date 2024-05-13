using Microsoft.EntityFrameworkCore;
using System.Fabric;

namespace UserService.Database
{
    class CreateMyDbContext
    {
        public static UsersDbContext CreateDbContext()
        {
            var configurationPackage = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config");
            var connectionStringParameter = configurationPackage.Settings.Sections["ConnectionStrings"].Parameters["YourConnectionString"];
            var connectionString = connectionStringParameter.Value;

            var dbContextOptions = new DbContextOptionsBuilder<UsersDbContext>()
                .UseSqlServer(connectionString)
                .Options;

            return new UsersDbContext(dbContextOptions);
        }
    }
}