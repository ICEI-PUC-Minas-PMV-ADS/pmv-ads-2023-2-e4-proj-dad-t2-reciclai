using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("Eletroportateis")]
    public class Eletroportatil
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Tipo { get; set; }
        [Required]
        public string Material { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }
    }
}
