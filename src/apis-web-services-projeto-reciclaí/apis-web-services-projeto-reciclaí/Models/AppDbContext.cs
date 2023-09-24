using apis_web_services_projeto_reciclaí.Models;
using Microsoft.EntityFrameworkCore;

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

            builder.Entity<PedidoUsuarios>()
                .HasOne(c => c.Usuario).WithMany(c => c.Pedidos)
                .HasForeignKey(c => c.UsuarioId);
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<PedidoUsuarios> PedidoUsuarios { get; set; }

    }
}
