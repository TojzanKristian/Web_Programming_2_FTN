using AutoMapper;
using Common.Encryption;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Fabric;
using WebService.Hubs;
using WebService.Mappings;

namespace WebService
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly JwtConfiguration jwtConfig = new JwtConfiguration();
        private string ClientURLString { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            var configurationPackage = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config");
            var connectionStringParameter = configurationPackage.Settings.Sections["AppSettings"].Parameters["AllowedOrigin"];
            ClientURLString = connectionStringParameter.Value;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR();

            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<TripProfile>();
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(ClientURLString)
                                      .AllowAnyMethod()
                                      .AllowAnyHeader()
                                      .AllowCredentials()
                                      .WithExposedHeaders("Content-Type"));
            });


            jwtConfig.ConfigureJwtAuthentication(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors("AllowSpecificOrigin");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<TripHub>("/new-trip");
            });
        }
    }
}