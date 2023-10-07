using mf_apis_web_services_fuel_manager.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading;

namespace apis_web_services_projeto_reciclai.Models
{
    [Table("Pedidos")]
    public class Pedido : LinksHATEOS
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
        public ICollection<Monitor> Monitores { get; set; }
        public ICollection<Iluminacao> Iluminacoes { get; set; }
        public ICollection<PainelFotovoltaico> PainelFotovoltaicos { get; set; }
        public ICollection<PilhasBateria> PilhasBaterias { get; set; }
        public ICollection<TiTelecomunicacao> TiTelecomunicacoes { get; set; }
        public ICollection<Eletrodomestico> Eletrodomesticos { get; set; }
        public ICollection<Eletroportatil> Eletroportateis { get; set; }
        public ICollection<FiosCabo> FiosCabos { get; set; }

    }
    
}
