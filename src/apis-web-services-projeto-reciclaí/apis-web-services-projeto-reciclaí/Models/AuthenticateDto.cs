using System.ComponentModel.DataAnnotations;

namespace apis_web_services_projeto_reciclai.Models
{
    public class AuthenticateDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}
