using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using mf_apis_web_services_fuel_manager.Models;

    namespace apis_web_services_projeto_reciclai.Models
    {
        [Table("Monitores")]
        public class Monitor : LinksHATEOS
    {
            [Key]
            public int Id { get; set; }
            [Required]
            public bool Led { get; set; }
            [Required]
            [Column(TypeName = "decimal(18,2)")]
            public decimal Tamanho { get; set; }

            [ForeignKey("Pedido")]
            public int PedidoId { get; set; }

            public Pedido Pedido { get; set; }
        }

    }

