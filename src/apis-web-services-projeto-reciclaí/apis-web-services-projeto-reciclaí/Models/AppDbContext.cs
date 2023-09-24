using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace apis_web_services_projeto_reciclai.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PedidoUsuarios>()
                .HasKey(c => new { c.PedidoId, c.UsuarioId });

            builder.Entity<PedidoUsuarios>()
                .HasOne(c => c.Pedido).WithMany(c => c.Usuarios)
                .HasForeignKey(c => c.PedidoId);

           /* builder.Entity<PedidoUsuarios>()
                .HasOne(c => c.Usuario).WithMany(c => c.Pedidos)
                .HasForeignKey(c => c.UsuarioId);*/
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Monitor> Monitores { get; set; }
        public DbSet<Iluminacao> Iluminacoes { get; set; }
        public DbSet<PilhasBateria> PilhasBaterias { get; set; }
        public DbSet<PainelFotovoltaico> PainelFotovoltaicos { get; set; }
        public DbSet<TiTelecomunicacao> TiTelecomunicacoes { get; set; }
        public DbSet<PedidoUsuarios> PedidoUsuarios { get; set; }
    }
}
