using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclai.Services;
using Microsoft.AspNetCore.Mvc;


namespace apis_web_services_projeto_reciclai.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OpiniaoUsuariosController : ControllerBase
    {
        private readonly OpiniaoUsuarioService _opiniaoUsuarioService;

        public OpiniaoUsuariosController(OpiniaoUsuarioService opiniaoUsuarioService)
        {
            _opiniaoUsuarioService = opiniaoUsuarioService;
        }
        [HttpGet]
        public async Task<List<OpiniaoUsuario>> Get() =>
        await _opiniaoUsuarioService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<OpiniaoUsuario>> Get(string id)
        {
            var opiniaoUsuario = await _opiniaoUsuarioService.GetAsync(id);
            if (opiniaoUsuario == null)
            {
                return NotFound();
            }
            return opiniaoUsuario;
        }

        [HttpPost]
        public async Task<IActionResult>Post (OpiniaoUsuario newOpiniaoUsuario)
        {
            await _opiniaoUsuarioService.CreateAsync(newOpiniaoUsuario);
            return CreatedAtAction(nameof(Get), new { id = newOpiniaoUsuario.Id }, newOpiniaoUsuario);

        }
        [HttpPut("{id:length(24)}")]
        public async Task <ActionResult>Update(string id, OpiniaoUsuario updateOpiniaoUsuario)
        {
            var opiniaoUsuario = await _opiniaoUsuarioService.GetAsync (id);
            if (opiniaoUsuario is null)
                return NotFound();
            updateOpiniaoUsuario.Id = opiniaoUsuario.Id;
            await _opiniaoUsuarioService.UpdateAsync(id, updateOpiniaoUsuario);    
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult>Delete(string id)
        {
            var opiniaoUsuario = await _opiniaoUsuarioService.GetAsync(id);
            if (opiniaoUsuario is null)
                return NotFound();
            await _opiniaoUsuarioService.RemoveAsync(id);
            return NoContent();
        
        }
    }
}
