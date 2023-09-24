using Microsoft.EntityFrameworkCore;

namespace apis_web_services_projeto_reciclai.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Monitor> Monitores { get; set; }
        public DbSet<Iluminacao> Iluminacoes { get; set; }
        public DbSet<PilhasBateria> PilhasBaterias { get; set; }
        public DbSet<PainelFotovoltaico> PainelFotovoltaicos { get; set; }
    }   
}
