using mf_apis_web_services_fuel_manager.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace apis_web_services_projeto_reciclai.Models
{
    public class OpiniaoUsuario : LinksHATEOS
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Nome { get; set; } = null!;

        public string Mensagem { get; set; } = null!;
    }
}
