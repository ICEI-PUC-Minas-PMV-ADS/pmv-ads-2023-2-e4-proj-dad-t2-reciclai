using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("TiTelecomunicacoes")]
    public class TiTelecomunicacao
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Estrutura { get; set; }
        [Required]
        public double Tamanho { get; set; }

        [ForeignKey("Pedido")]
        public int PedidoId { get; set; }

        public Pedido Pedido { get; set; }
    }

}
