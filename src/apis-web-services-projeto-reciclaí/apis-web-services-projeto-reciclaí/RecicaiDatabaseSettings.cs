using MongoDB.Driver;

internal class ReciclaiDatabaseSettings
{
    internal object UsuarioCollectionName;

    public MongoClientSettings ConnectionString { get; internal set; }
    public string DatabaseName { get; internal set; }
}