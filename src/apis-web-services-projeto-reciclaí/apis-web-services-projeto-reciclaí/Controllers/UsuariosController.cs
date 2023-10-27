using apis_web_services_projeto_reciclai.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc.Routing;

namespace apis_web_services_projeto_reciclai.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var model = await _context.Usuarios.ToListAsync();
            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateUser(UsuarioDto model)
        {
            Usuario novo = new Usuario()
            {
                Nome = model.Nome,
                Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha),
                Email = model.Email,
                Endereco = model.Endereco,
                Perfil = model.Perfil,
                TipoLixo = model.TipoLixo,
            };

            _context.Usuarios.Add(novo);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUserById", new { id = novo.Id }, novo);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(int id)
        {
            var model = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, UsuarioDto model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = await _context.Usuarios.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (modelDb == null) return NotFound();

            modelDb.Nome = model.Nome;
            modelDb.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);
            modelDb.Email = model.Email;
            modelDb.Endereco = model.Endereco;
            modelDb.Perfil = model.Perfil;
            modelDb.TipoLixo = model.TipoLixo;  

            
            _context.Usuarios.Update(modelDb);

            await _context.SaveChangesAsync();

            return NoContent();


        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var model = await _context.Usuarios.FindAsync(id);

            if (model == null) return NotFound();

            _context.Usuarios.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate([Bind("Email, Senha")] AuthenticateDto model)
        {
            var usuarioDb = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == model.Email);

            var usuarioId = usuarioDb.Id;

            if(usuarioDb == null || !BCrypt.Net.BCrypt.Verify(model.Senha, usuarioDb.Senha ))
                return Unauthorized();

            var jwt = GenerateJwtToken(usuarioDb);

            var data = new
            {
                jwtToken = jwt,
                userId = usuarioId,
            };

            return Ok(data);
            
        }

        private string GenerateJwtToken(Usuario model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
                new Claim(ClaimTypes.Role, model.Perfil.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpOptions("{id}/EnviarEmail")]
        public async Task<ActionResult> EnviarEmail(int id, UsuarioDto model)
        {
            try
            {
                if (id != model.Id) return BadRequest();

                var modelDb = await _context.Usuarios.AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (modelDb == null) return NotFound();

                modelDb.Email = model.Email;

                MailMessage mail = new MailMessage()
                {
                    From = new MailAddress("reciclai2023@gmail.com", "Reciclaí")
                };

                mail.To.Add(new MailAddress(modelDb.Email));

                mail.Subject = "Solicitação de coleta";

                mail.Body = "O status da coleta foi alterado, favor entrar na sua conta para visualizar.";
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.UseDefaultCredentials = false;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new NetworkCredential("reciclai2023@gmail.com", "vtrgxoqweixjruva");
                    smtp.EnableSsl = true;
                    smtp.Timeout = 20_000;
                    await smtp.SendMailAsync(mail);
                }

                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
