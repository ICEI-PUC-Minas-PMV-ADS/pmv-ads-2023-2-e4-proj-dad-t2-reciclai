using System.ComponentModel.DataAnnotations;

namespace apis_web_services_projeto_reciclai.Models
{
    public class AuthenticateDto
    {
        [Required]
        public string Email{ get; set; }


        [Required]
        public string Senha { get; set; }
    }
}
