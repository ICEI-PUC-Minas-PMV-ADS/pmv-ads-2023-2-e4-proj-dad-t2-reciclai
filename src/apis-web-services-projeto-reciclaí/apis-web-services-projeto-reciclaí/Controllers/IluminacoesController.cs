using apis_web_services_projeto_reciclai.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Iluminacao = apis_web_services_projeto_reciclai.Models.Iluminacao;

namespace apis_web_services_projeto_reciclai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IluminacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IluminacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Iluminacoes.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Iluminacao model)
        {
            _context.Iluminacoes.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Iluminacoes
                .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();


            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Iluminacao model)
        {
            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.Iluminacoes.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Iluminacoes.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Iluminacoes.FindAsync(id);

            if (model == null) return NotFound();

            _context.Iluminacoes.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
