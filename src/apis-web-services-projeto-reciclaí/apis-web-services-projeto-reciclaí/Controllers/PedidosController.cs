using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclaí.Models;
using mf_apis_web_services_fuel_manager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System.ComponentModel.DataAnnotations;
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
            try
            {
                var model = await _context.Pedidos.Include(t => t.Usuarios).ThenInclude(t => t.Usuario).ToListAsync();

                if (model == null) return NotFound();

                return Ok(model);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Pedido model)
        {
            try
            {
                _context.Pedidos.Add(model);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetById", new { id = model.Id }, model);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var model = await _context.Pedidos
                    .Include(t => t.Usuarios).ThenInclude(t => t.Usuario)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (model == null) return NotFound();

                GerarLinks(model);
                return Ok(model);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Pedido model)
        {
            try
            {
                if (id != model.Id) return BadRequest();

                var modelDb = await _context.Pedidos.AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (modelDb == null) return NotFound();

                _context.Pedidos.Update(model);

                await _context.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var model = await _context.Pedidos.FindAsync(id);

                if (model == null) return NotFound();

                _context.Pedidos.Remove(model);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost("{id}/usuarios")]
        public async Task<ActionResult> AddUsuario(int id, PedidoUsuarios model)
        {
            try
            {
                if (id != model.PedidoId) return BadRequest();

                model.Usuario = _context.Usuarios.First(u => u.Id == model.UsuarioId);

                if (_context.PedidoUsuarios.Any(c => c.Pedido.Id == id && c.Usuario.Perfil.Equals(model.Usuario.Perfil)))
                    return StatusCode(405);

                _context.PedidoUsuarios.Add(model);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetById", new { id = model.PedidoId }, model);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        [HttpDelete("{id}/usuarios/{usuarioId}")]
        public async Task<ActionResult> DeleteUsuario(int id, int usuarioId)
        {
            try
            {
                var model = await _context.PedidoUsuarios
                    .Where(c => c.PedidoId == id && c.UsuarioId == usuarioId)
                    .FirstOrDefaultAsync();

                if (model == null) return NotFound();

                _context.PedidoUsuarios.Remove(model);
                await _context.SaveChangesAsync();

                return NoContent();


            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        private void GerarLinks(Pedido model)
        {
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", metodo: "Delete"));

        }



    }
}
