using apis_web_services_projeto_reciclai.Controllers;
using apis_web_services_projeto_reciclai.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReciclaiTestes_
{
    public class TesteEletrodomesticos : IDisposable
    {
        private readonly AppDbContext _dbContext;

        public TesteEletrodomesticos()
        {
            // Banco de dados in memory
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "Reciclai_database")
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _dbContext = new AppDbContext(options);

            ReciclaiDatabase();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        private void ReciclaiDatabase()
        {
            // Inserir dados de teste no banco de dados
            var Eletrodomesticos = new[]
            {
            new Eletrodomestico {
                Id = 1,
                Tamanho = 10,
                Peso = 10,
                PedidoId = 1},
            new Eletrodomestico {
                Id = 2,
                Tamanho = 10,
                Peso = 10,
                PedidoId = 1},
            };

            _dbContext.Eletrodomesticos.AddRange(Eletrodomesticos);
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);

            // Act
            var result = await controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<Eletrodomestico>>(okResult.Value);

            Assert.NotNull(model);
            Assert.NotEmpty(model);

            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);

            var eletrodomestico = new Eletrodomestico
            {
                // Objeto "model" com os dados pra teste
                Id = 3,
                Tamanho = 10,
                Peso = 10,
                PedidoId = 1
            };

            // Act
            var result = await controller.Create(eletrodomestico);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdEletrodomestico = Assert.IsAssignableFrom<Eletrodomestico>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedModel = await _dbContext.Eletrodomesticos.FirstOrDefaultAsync(p => p.Id == createdEletrodomestico.Id);
            Assert.NotNull(savedModel);

        }

        [Fact]
        public async Task GetById_ReturnsOkResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 1; // ID de um Eletrodomestico de teste existente

            // Act
            var result = await controller.GetById(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Eletrodomestico>(okResult.Value);
            Assert.Equal(id, model.Id);
        }

        [Fact]
        public async Task GetById_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.GetById(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNoContentResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 1; // ID de um Eletrodomestico de teste existente

            var modelForUpdate = _dbContext.Eletrodomesticos.SingleOrDefault(p => p.Id == id);

            Assert.NotNull(modelForUpdate);

            modelForUpdate.Tamanho = 20;

            // Act
            var result = await controller.Update(id, modelForUpdate);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se os dados foram atualizados no banco de dados
            var updatedModelDb = await _dbContext.Eletrodomesticos.FindAsync(id);
            Assert.NotNull(updatedModelDb);
            Assert.Equal(modelForUpdate.Tamanho, updatedModelDb.Tamanho);

        }

        [Fact]
        public async Task Update_ReturnsBadRequestResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 1; // ID de um Eletrodomestico de teste existente
            var updatedEletrodomestico = new Eletrodomestico
            {
                Id = 5,
                Tamanho = 10,
                Peso = 10,
                PedidoId = 1
            }; // ID inválido

            // Act
            var result = await controller.Update(id, updatedEletrodomestico);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados
            var updatedEletrodomestico = new Eletrodomestico
            {
                Id = id
            };

            // Act
            var result = await controller.Update(id, updatedEletrodomestico);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se o modelo foi removido do banco de dados
            var deletedModel = await _dbContext.Eletrodomesticos.FindAsync(id);
            Assert.Null(deletedModel);
        }

        [Fact]
        public async Task Delete_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new EletrodomesticosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}