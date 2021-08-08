#docker build -f .docker/Perflow.Studio.Dockerfile -t perflow-studio .

FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
#ARG PROJECT_PORT
WORKDIR /app
#EXPOSE $PROJECT_PORT

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY backend/Perflow.Studio/ Perflow.Studio/
COPY backend/Shared/ Shared/

RUN dotnet restore "Perflow.Studio/Perflow.Studio.csproj"
COPY . .
WORKDIR "/src/Perflow.Studio"
RUN dotnet build "Perflow.Studio.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Perflow.Studio.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Perflow.Studio.dll"]