using apis_web_services_projeto_reciclai.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace apis_web_services_projeto_reciclai.Models
{
    public class UsuarioDto
    {
        public int? Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }

        [Required]
        [Display(Name = "Endereço")]
        public string Endereco { get; set; }

        [Required]
        public Perfil Perfil { get; set; }

        public TipoLixo TipoLixo { get; set; }
    }
}
