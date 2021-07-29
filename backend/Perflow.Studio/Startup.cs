using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MediatR;
using Perflow.Studio.Common.Implementations;
using Perflow.Studio.Common.Interfaces;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.DataAccess.Extensions;
using Perflow.Studio.DataAccess.Implementations;
using Perflow.Studio.DataAccess.Repositories;
using Perflow.Studio.Domain.Entities;
using Shared.ExceptionsHandler.Filters;

namespace Perflow.Studio
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IDateProvider, DateProvider>();

            services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

            services.AddRepository<Song, ISongsRepository, SongsRepository>();

            services.AddAutoMapper(typeof(Startup));

            services.AddMediatR(typeof(Startup));

            services.AddControllers(options => options.Filters.Add(new CustomExceptionFilterAttribute()));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Perflow.Studio", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Perflow.Studio v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
