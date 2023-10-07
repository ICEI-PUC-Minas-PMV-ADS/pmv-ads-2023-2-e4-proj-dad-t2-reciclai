using apis_web_services_projeto_reciclai.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;

namespace apis_web_services_projeto_reciclai.Services
{
    public class UsuariosTokenService
    {
        private readonly IMongoCollection<UsuarioToken> _UsuarioTokenCollection;

        public UsuariosTokenService(
            IOptions<ReciclaiDatabaseSettings> ReciclaiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
            ReciclaiDatabaseSettings.Value.ConnectionString);

            var mongodatabase = mongoClient.GetDatabase(
                ReciclaiDatabaseSettings.Value.DatabaseName);
            _UsuarioTokenCollection = mongodatabase.GetCollection<UsuarioToken>(
                ReciclaiDatabaseSettings.Value.UsuarioCollectionName);
        }
            public async Task<List<UsuarioToken>> GetAsync() =>
                await _UsuarioTokenCollection.Find(_ => true).ToListAsync();

            public async Task<UsuarioToken?> GetAsync(string id) =>
                await _UsuarioTokenCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            public async Task CreateAsync(UsuarioToken UsuarioToken) =>
                await _UsuarioTokenCollection.InsertOneAsync(UsuarioToken);

            public async Task UpdateAsync(string id, UsuarioToken updatedUsuarioToken) =>
                await _UsuarioTokenCollection.ReplaceOneAsync(x => x.Id == id, updatedUsuarioToken);

            public async Task RemoveAsync(string id) =>
                await _UsuarioTokenCollection.DeleteOneAsync(x => x.Id == id);
    }
    }

