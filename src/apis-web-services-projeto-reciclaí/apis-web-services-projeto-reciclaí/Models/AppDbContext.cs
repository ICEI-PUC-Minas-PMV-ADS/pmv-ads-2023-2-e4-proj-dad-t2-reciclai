using Microsoft.EntityFrameworkCore;

namespace apis_web_services_projeto_reciclaí.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

    }
}
