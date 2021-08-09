#docker build -f .docker/Processor.Dockerfile -t processor .

FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
#ARG PROJECT_PORT
WORKDIR /app
#EXPOSE $PROJECT_PORT

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY backend/Processor/Processor.ConsoleApp Processor/Processor
COPY backend/Shared/Shared/ Shared/Shared

RUN dotnet restore "Processor/Processor/Processor.ConsoleApp.csproj"
COPY . .
WORKDIR "/src/Processor/Processor"
RUN dotnet build "Processor.ConsoleApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Processor.ConsoleApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Processor.ConsoleApp.dll"]
