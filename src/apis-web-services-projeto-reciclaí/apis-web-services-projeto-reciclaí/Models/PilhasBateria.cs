using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("PilhasBaterias")]
    public class PilhasBateria
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Composicao { get; set; }
        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }

        public Pedido Pedido { get; set; }
    }

}