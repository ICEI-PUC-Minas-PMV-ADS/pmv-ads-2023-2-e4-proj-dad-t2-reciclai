using System.ComponentModel.DataAnnotations.Schema;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("PedidoUsuarios")]
    public class PedidoUsuarios
    {
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

    }
}
