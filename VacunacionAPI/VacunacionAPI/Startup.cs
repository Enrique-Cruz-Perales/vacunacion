using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacunacionAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "VacunacionAPI", Version = "v1" });
            });

            //1 ADD CORS
            //services.AddCors(c =>
            //{
            //    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            //});
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", 
                    builder =>
                    {
                        builder.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();                        
                    });

                //podemos tener otra fuente API
                options.AddPolicy("AllowOriginSAT",
                    builder =>
                    {
                        builder.WithOrigins("http://www.renapo.com.mx");
                    });
            
            });

            services.AddControllers();

            //3. JSON Serializer: INSTALL NUGGET PACKAGE MVC.NewtonSoftJson -  add using Newtonsoft.Json.Serialization;
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver());

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                //para entorno de desarrollo en kestrel
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VacunacionAPI v1"));
            }
            //else 
            //{
            //    /** PRODUCCION
            //     *  Para entorno de produccion IIS: Cuando hacemos deploy a produccion en ISS debemos cambiar las
            //     *  rutas manteniedno el Alias del sitio en ISS en este casi mi sitio en IIS es vacunacionApi.
            //     *  El motivo es que swagger busca el archivo swagger.json en [/swagger/v1/swagger.json] pero 
            //     *  no toma en cuenta el prefijo del alias en IIS
            //     *  **/
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VacunacionAPI v1"));
            //}

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VacunacionAPI v1"));

            app.UseHttpsRedirection();

            app.UseRouting();

            //2. ADD CORS - siempre antes del routing
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });            
        }
    }
}
