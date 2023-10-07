using apis_web_services_projeto_reciclai.Models;
using mf_apis_web_services_fuel_manager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apis_web_services_projeto_reciclai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiosCabosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FiosCabosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var model = await _context.FiosCabos.ToListAsync();
            return Ok(model);
        }
        [HttpPost]
        public async Task<ActionResult> Create(FiosCabo model)
        {
            _context.FiosCabos.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var model = await _context.FiosCabos
                   .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();

            GerarLinks(model);
            return Ok(model);

        }
            [HttpPut("{id}")]
            public async Task<ActionResult> Update(int id, FiosCabo model)
            {
                if (id != model.Id) return BadRequest();

                var modeloDb = await _context.FiosCabos.AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (modeloDb == null) return NotFound();

                _context.FiosCabos.Update(model);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            [HttpDelete("{id}")]

            public async Task<ActionResult> Delete(int id)
            {
                var model = await _context.FiosCabos.FindAsync(id);

                if (model == null) return NotFound();

                _context.FiosCabos.Remove(model);
                await _context.SaveChangesAsync();

                return NoContent();


        }

        private void GerarLinks(FiosCabo model)
        {
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "self", metodo: "GET"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "update", metodo: "PUT"));
            model.Links.Add(new LinkDto(model.Id, Url.ActionLink(), rel: "delete", metodo: "Delete"));


        }

        }

    }

