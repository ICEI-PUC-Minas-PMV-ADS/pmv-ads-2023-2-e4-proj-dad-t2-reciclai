﻿using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclaí.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apis_web_services_projeto_reciclaí.Controllers
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
            var model = await _context.Pedidos.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Pedidos model)
        {
            Pedidos novo = new Pedidos()
            {
                DataColeta = model.DataColeta,
                HorarioColeta = model.HorarioColeta,
                TipoLixo = model.TipoLixo,
                QtdLixo = model.QtdLixo,
                Descricao = model.Descricao,
                Endereco = model.Endereco,
                NomeSolicitante = model.NomeSolicitante,
                LixoPerigoso = model.LixoPerigoso
            };

            _context.Pedidos.Add(novo);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetById", new { Id = novo.Id }, novo);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int Id)
        {
            var model = await _context.Pedidos
                .FirstOrDefaultAsync(u => u.Id == Id);

            if (model == null) return NotFound();

            return Ok(model);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int Id, Pedidos model)
        {
            if (Id != model.Id) return BadRequest();

            var modelDb = await _context.Pedidos.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == Id);

            if (modelDb == null) return NotFound();

            modelDb.DataColeta = model.DataColeta;
            modelDb.HorarioColeta = model.HorarioColeta;
            modelDb.TipoLixo = model.TipoLixo;
            modelDb.QtdLixo = model.QtdLixo;
            modelDb.Descricao = model.Descricao;
            modelDb.Endereco = model.Endereco;
            modelDb.NomeSolicitante = model.NomeSolicitante;
            modelDb.LixoPerigoso = model.LixoPerigoso;


            _context.Pedidos.Update(modelDb);

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
    }
}
