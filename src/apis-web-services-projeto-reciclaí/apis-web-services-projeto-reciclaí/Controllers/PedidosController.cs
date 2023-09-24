using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclaí.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System.Linq.Expressions;

namespace apis_web_services_projeto_reciclai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PedidosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Pedidos.Include(t => t.Usuarios).ThenInclude(t => t.Usuario).ToListAsync();

            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Pedido model)
        {

            _context.Pedidos.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Pedidos
                .Include(t => t.Usuarios).ThenInclude(t => t.Usuario)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Pedido model)
        {
            if (id != model.Id) return BadRequest();

            var modelDb = await _context.Pedidos.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (modelDb == null) return NotFound();

            _context.Pedidos.Update(model);

            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Pedidos.FindAsync(id);

            if (model == null) return NotFound();

            _context.Pedidos.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/usuarios")]
        public async Task<ActionResult> AddUsuario(int id, PedidoUsuarios model)
        {
            if (id != model.PedidoId) return BadRequest();

            model.Usuario = _context.Usuarios.First(u => u.Id == model.UsuarioId);

            if (_context.PedidoUsuarios.Any(c => c.Usuario.Perfil.Equals(model.Usuario.Perfil)))
                return StatusCode(405);

            _context.PedidoUsuarios.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.PedidoId }, model);
        
        }

        [HttpDelete("{id}/usuarios/{usuarioId}")]
        public async Task<ActionResult> DeleteUsuario(int id, int usuarioId)
        {
            var model = await _context.PedidoUsuarios
                .Where(c => c.PedidoId == id && c.UsuarioId == usuarioId)
                .FirstOrDefaultAsync();

            if (model == null) return NotFound();

            _context.PedidoUsuarios.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
