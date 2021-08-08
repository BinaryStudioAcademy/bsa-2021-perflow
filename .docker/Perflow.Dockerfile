#docker build -f .docker/Perflow.Dockerfile -t perflow .

FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
#ARG PROJECT_PORT
WORKDIR /app
#EXPOSE $PROJECT_PORT

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY backend/Perflow/ Perflow/
COPY backend/Shared/ Shared/

RUN dotnet restore "Perflow/Perflow.csproj"
COPY . .
WORKDIR "/src/Perflow"
RUN dotnet build "Perflow.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Perflow.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Perflow.dll"]