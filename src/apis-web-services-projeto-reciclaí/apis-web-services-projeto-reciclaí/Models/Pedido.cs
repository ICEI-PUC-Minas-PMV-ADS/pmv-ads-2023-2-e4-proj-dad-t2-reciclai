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
    }

        /*
        public ICollection<Eletrodomestico> Eletrodomesticos { get; set; }
        public ICollection<Eletroportateis> Eletroportateis { get; set; }
        public ICollection<Monitores> Monitores { get; set; }
        public ICollection<Iluminacao> Iluminacao { get; set; }
        public ICollection<Fios_cabos> Fios_cabos { get; set; }
        public ICollection<Pilhas_baterias> Pilhas_baterias { get; set; }
        public ICollection<Ti_telecomunicacao> Ti_telecomunicacao { get; set; }
        public ICollection<Paineis_fotovoltaicos> Paineis_fotovoltaicos { get; set; }
        */
    
}
