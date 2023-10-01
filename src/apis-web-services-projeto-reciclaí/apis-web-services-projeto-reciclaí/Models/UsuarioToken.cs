using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace apis_web_services_projeto_reciclai.Models
{
    public class UsuarioToken
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]   
        public string? Id { get; set; }
       public string Token { get; set; } = null!;
    }
}
