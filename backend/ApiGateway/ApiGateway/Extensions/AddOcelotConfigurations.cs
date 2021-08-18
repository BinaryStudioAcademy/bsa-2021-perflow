using System;
using System.IO;
using System.Linq;
using ApiGateway.Exceptions;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Ocelot.Configuration.File;

namespace ApiGateway.Extensions
{
    public static class AddOcelotConfigurations
    {
        public static IConfigurationBuilder AddOcelotConfiguration(this IConfigurationBuilder builder, string folder)
        {
            var configurationFiles = new DirectoryInfo(folder).GetFiles();

            if (configurationFiles.Any(file => file.Extension != ".json"))
            {
                throw new OcelotConfigurationException($"Folder {folder} contains invalid configuration files");
            }

            var ocelotConfiguration = new FileConfiguration();

            foreach (FileInfo fileInfo in configurationFiles)
            {
                FileConfiguration fileConfiguration = JsonConvert.DeserializeObject<FileConfiguration>(File.ReadAllText(fileInfo.FullName));

                ocelotConfiguration.Aggregates.AddRange(fileConfiguration.Aggregates);
                ocelotConfiguration.Routes.AddRange(fileConfiguration.Routes);
            }

            var globalFile = configurationFiles
                .FirstOrDefault(file => file.Name.Equals("global.json", StringComparison.OrdinalIgnoreCase));

            if (globalFile != null)
            {
                var globalConfiguration = JsonConvert.DeserializeObject<FileConfiguration>(File.ReadAllText(globalFile.FullName));
                ocelotConfiguration.GlobalConfiguration = globalConfiguration.GlobalConfiguration;
            }

            File.WriteAllText("ocelot.json", JsonConvert.SerializeObject(ocelotConfiguration));
            builder.AddJsonFile("ocelot.json", false, false);

            return builder;
        }
    }
}
