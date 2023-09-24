using apis_web_services_projeto_reciclai.Models;
using mf_apis_web_services_fuel_manager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PilhasBateria = apis_web_services_projeto_reciclai.Models.PilhasBateria;

namespace apis_web_services_projeto_reciclai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PilhasBateriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PilhasBateriasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.PilhasBaterias.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(PilhasBateria model)
        {
            _context.PilhasBaterias.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.PilhasBaterias
                .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();


            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, PilhasBateria model)
        {
            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.PilhasBaterias.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.PilhasBaterias.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.PilhasBaterias.FindAsync(id);

            if (model == null) return NotFound();

            _context.PilhasBaterias.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
