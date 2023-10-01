using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclai.Services;
using Microsoft.AspNetCore.Mvc;


namespace apis_web_services_projeto_reciclai.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosTokenController : ControllerBase
    {
        private readonly UsuariosTokenService _usuariosTokenService;

        public UsuariosTokenController(UsuariosTokenService usuariosTokenService)
        {
            _usuariosTokenService = usuariosTokenService;
        }
        [HttpGet]
        public async Task<List<UsuarioToken>> Get() =>
        await _usuariosTokenService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<UsuarioToken>> Get(string id)
        {
            var usuarioToken = await _usuariosTokenService.GetAsync(id);
            if (usuarioToken == null)
            {
                return NotFound();
            }
            return usuarioToken;
        }

        [HttpPost]
        public async Task<IActionResult>Post (UsuarioToken newUsuarioToken)
        {
            await _usuariosTokenService.CreateAsync(newUsuarioToken);
            return CreatedAtAction(nameof(Get), new { id = newUsuarioToken.Id }, newUsuarioToken);

        }
        [HttpPut("{id:length(24)}")]
        public async Task <ActionResult>Update(string id, UsuarioToken updateUsuarioToken)
        {
            var usuarioToken = await _usuariosTokenService.GetAsync (id);
            if (usuarioToken is null)
                return NotFound();
            updateUsuarioToken.Id = usuarioToken.Id;
            await _usuariosTokenService.UpdateAsync(id, updateUsuarioToken);    
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult>Delete(string id)
        {
            var usuarioToken = await _usuariosTokenService.GetAsync(id);
            if (usuarioToken is null)
                return NotFound();
            await _usuariosTokenService.RemoveAsync(id);
            return NoContent();
        
        }
    }
}
