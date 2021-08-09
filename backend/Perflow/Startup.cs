using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Perflow.Services.Extensions;
using Perflow.DataAccess.Context;
using Shared.Auth.Extensions;
using Shared.ExceptionsHandler.Filters;

namespace Perflow
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var migrationAssembly = typeof(PerflowContext).Assembly.GetName().Name;
            services.AddDbContext<PerflowContext>(options =>
                options.UseSqlServer(Configuration["ConnectionStrings:PerflowDbConnection"],
                    opt => opt.MigrationsAssembly(migrationAssembly)));

            services.RegisterAutoMapper();

            services.RegisterCustomServices();

            services.AddControllers(options => options.Filters.Add(new CustomExceptionFilterAttribute()));

            services.AddAuth();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Perflow", Version = "v1" });
            });

            services.AddBlobStorage(Configuration.GetConnectionString("BlobStorage"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Perflow v1"));
            }

            app.UseCors(builder => builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            InitializeDatabase(app);
        }

        private static void InitializeDatabase(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<PerflowContext>();
            context.Database.Migrate();
        }
    }
}
