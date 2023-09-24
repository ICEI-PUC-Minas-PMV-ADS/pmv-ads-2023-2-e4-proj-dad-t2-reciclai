using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("Pedidos")]
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int IdSolicitante { get; set; }
        [Required]
        public int IdColetor { get; set; }
        [Required]
        public DateTime DataColeta { get; set; }
        [Required]
        public DateTime HorarioColeta { get; set; }
        [Required]
        public TipoLixo TipoLixo { get; set; }
        [Required]
        public int QtdLixo { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public string Endereco { get; set; }
        [Required]
        public string NomeSolicitante { get; set; }
        [Required]
        public bool LixoPerigoso { get; set; }

        public ICollection<PedidoUsuarios> Usuarios { get; set; }
        public ICollection<Monitor> Monitor { get; set; }
        public ICollection<Iluminacao> Iluminacao { get; set; }
        public ICollection<PainelFotovoltaico> PainelFotovoltaico { get; set; }
        public ICollection<PilhasBateria> PilhasBateria { get; set; }
        public ICollection<TiTelecomunicacao> TiTelecomunicacao { get; set; }
        //public ICollection<Eletrodomestico> Eletrodomestico { get; set; }
        //public ICollection<Eletroportatil> Eletroportatil { get; set; }
        //public ICollection<FiosCabos> FiosCabos { get; set; }

    }
    
}
