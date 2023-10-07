using apis_web_services_projeto_reciclai.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apis_web_services_projeto_reciclai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EletroportateisController : ControllerBase
    {
        private readonly AppDbContext _context;
        public EletroportateisController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.Eletroportateis.ToListAsync();
            return Ok(model);
        }
        [HttpPost]
        public async Task<ActionResult> Create(Eletroportatil model)
        {
            _context.Eletroportateis.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.Eletroportateis
                   .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();


            return Ok(model);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Eletroportatil model)
        {
            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.Eletroportateis.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Eletroportateis.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _context.Eletroportateis.FindAsync(id);

            if (model == null) return NotFound();

            _context.Eletroportateis.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
    
