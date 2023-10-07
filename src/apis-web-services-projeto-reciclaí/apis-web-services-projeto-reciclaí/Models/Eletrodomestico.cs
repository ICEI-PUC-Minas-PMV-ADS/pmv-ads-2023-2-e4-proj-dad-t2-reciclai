using mf_apis_web_services_fuel_manager.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("Eletrodomesticos") ]
    public class Eletrodomestico : LinksHATEOS
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Tamanho { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Peso { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }
        public Pedido Pedido { get; set; }
    }
}
