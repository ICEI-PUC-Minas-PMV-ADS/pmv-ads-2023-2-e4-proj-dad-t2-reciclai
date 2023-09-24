using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("Eletrodomesticos") ]
    public class Eletrodomestico
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public decimal Tamanho { get; set; }
        [Required]
        public decimal Peso { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }
    }
}
