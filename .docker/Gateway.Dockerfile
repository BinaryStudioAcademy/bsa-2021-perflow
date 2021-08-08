#docker build -f .docker/Gateway.Dockerfile -t gateway .

FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
#ARG PROJECT_PORT
WORKDIR /app
#EXPOSE $PROJECT_PORT

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY backend/ApiGateway/ApiGateway ApiGateway/

RUN dotnet restore "ApiGateway/ApiGateway.csproj"
COPY . .
WORKDIR "/src/ApiGateway"
RUN dotnet build "ApiGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiGateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiGateway.dll"]
