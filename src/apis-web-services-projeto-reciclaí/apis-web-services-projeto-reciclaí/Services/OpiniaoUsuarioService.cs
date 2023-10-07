using apis_web_services_projeto_reciclai.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;

namespace apis_web_services_projeto_reciclai.Services
{
    public class OpiniaoUsuarioService
    {
        private readonly IMongoCollection<OpiniaoUsuario> _OpiniaoUsuarioCollection;

        public OpiniaoUsuarioService(
            IOptions<ReciclaiDatabaseSettings> ReciclaiDatabaseSettings)
        {
            var mongoClient = new MongoClient(
            ReciclaiDatabaseSettings.Value.ConnectionString);

            var mongodatabase = mongoClient.GetDatabase(
                ReciclaiDatabaseSettings.Value.DatabaseName);
            _OpiniaoUsuarioCollection = mongodatabase.GetCollection<OpiniaoUsuario>(
                ReciclaiDatabaseSettings.Value.UsuarioCollectionName);
        }
            public async Task<List<OpiniaoUsuario>> GetAsync() =>
                await _OpiniaoUsuarioCollection.Find(_ => true).ToListAsync();

            public async Task<OpiniaoUsuario?> GetAsync(string id) =>
                await _OpiniaoUsuarioCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            public async Task CreateAsync(OpiniaoUsuario OpiniaoUsuario) =>
                await _OpiniaoUsuarioCollection.InsertOneAsync(OpiniaoUsuario);

            public async Task UpdateAsync(string id, OpiniaoUsuario updatedOpiniaoUsuario) =>
                await _OpiniaoUsuarioCollection.ReplaceOneAsync(x => x.Id == id, updatedOpiniaoUsuario);

            public async Task RemoveAsync(string id) =>
                await _OpiniaoUsuarioCollection.DeleteOneAsync(x => x.Id == id);
    }
    }

