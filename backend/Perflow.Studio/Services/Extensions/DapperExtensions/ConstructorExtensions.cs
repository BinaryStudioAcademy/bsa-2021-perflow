using Dapper;
using OneOf.Types;
using Perflow.Studio.Business.Constructor.DTOs;
using Perflow.Studio.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Services.Extensions.DapperExtensions
{
    public static class ConstructorExtensions
    {

        public static async Task<Success> AddContainer(this IDbConnection connection, PageContainer pageContainer)
        {
            const string sqlContainer =
                @"INSERT INTO[PageContainers] ([IsPublished], [Name], [ShowMix], [ShowRecentlyPlayed], [ShowRecommendations])
                VALUES(@IsPublished, @Name, @ShowMix, @ShowRecentlyPlayed, @ShowRecommendations);
                SELECT[Id]
                FROM[PageContainers] WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();";
            var sqlContainerResult = await connection.QueryFirstAsync<PageContainer>(sqlContainer, pageContainer);
            foreach (var ps in pageContainer.PageSections)
            {
                ps.PageContainerId = sqlContainerResult.Id;
                string sqlSection = @"INSERT INTO[PageSections] ([Name], [PageContainerId], [Position])
                                        VALUES(@Name, @PageContainerId, @Position);
                                        SELECT[Id]
                                        FROM[PageSections] WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();";
                var sqlSectionResult = await connection.QueryFirstAsync<PageSection>(sqlSection, ps);
                foreach(var pse in ps.PageSectionEntities)
                {
                    pse.PageSectionId = sqlSectionResult.Id;
                    string sqlSectionEntity = @"INSERT INTO[PageSectionEntities] ([EntityType], [PageSectionId], [Position], [ReferenceId])
                                                    VALUES(@EntityType, @PageSectionId, @Position, @ReferenceId);
                                                    SELECT[Id]
                                                    FROM[PageSectionEntities] WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();";
                    var sqlSectionEntityResult = await connection.QueryFirstAsync<PageSectionEntity>(sqlSectionEntity, pse);
                }
            }
            return new Success();
        }
        public static async Task<IEnumerable<PageContainer>> GetAllContainersViews(this IDbConnection connection)
        {
            const string sql =
                @"SELECT * FROM PageContainers ORDER BY IsPublished DESC";

            var pageContainers = await connection.QueryAsync<PageContainer>(sql);

            return pageContainers;
        }

        public static async Task DeleteContainer(this IDbConnection connection, int containerId)
        {
            var data = new { Id = containerId };

            await connection.ExecuteAsync(
                "DELETE FROM PageContainers WHERE Id = @Id",
                data
            );
        }

        public static async Task<Success> UpdateContainer(this IDbConnection connection, PageContainer pageContainer)
        {
            await connection.DeleteContainer(pageContainer.Id);
            await connection.AddContainer(pageContainer);
            return new Success();
        }
        public static async Task<PageContainer> PublishContainer(this IDbConnection connection, PageContainer pageContainer)
        {
            const string sqlUnpublish =
                @"UPDATE[PageContainers] SET
                            [IsPublished] = CAST(0 AS bit) 
                            WHERE[IsPublished] = CAST(1 AS bit);
                            SELECT @@ROWCOUNT;";
            await connection.ExecuteAsync(sqlUnpublish);
            const string sqlPublish =
                @"UPDATE[PageContainers] SET
                [IsPublished] = CAST(1 AS bit)
                WHERE[Id] = @Id;
                SELECT @@ROWCOUNT;";

            return await connection.QueryFirstAsync<PageContainer>(sqlPublish, pageContainer);
        }
    }
}
