using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Perflow.DataAccess.Context;
using Perflow.Services.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;

namespace Perflow.Services.Implementations
{
    public class SongIndexingService : ISongIndexingService, IDisposable
    {
        private readonly PerflowContext _context;
        private readonly IVoidQueue _indexingQueue;

        public SongIndexingService(IOptions<SongIndexingRabbitMQOptions> options, IQueueFactory queueFactory, PerflowContext context)
        {
            _context = context;

            var rabbitMqOptions = options.Value;

            _indexingQueue = queueFactory.CreateVoidQueue(rabbitMqOptions.ExchangeOptions, rabbitMqOptions.QueueOptions);
        }

        public async Task IndexSongs()
        {
            var indexingOptions = new SongIndexingOptions();

            indexingOptions.SongsIndexData = await _context
                .Songs
                .Select(x => new SongIndexData() 
                {
                    Id = x.Id,
                    BlobId = x.SourceBlobId
                })
                .ToListAsync();

            if (indexingOptions.SongsIndexData.Count == 0)
            {
                return;
            }

            _indexingQueue.SendMessage(indexingOptions.ToBytes());
        }

        public void Dispose()
        {
            _context?.Dispose();
            _indexingQueue?.Dispose();
        }
    }
}
