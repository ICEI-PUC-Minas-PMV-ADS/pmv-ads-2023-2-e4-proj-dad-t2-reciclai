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
    public class TesteFiosCabos : IDisposable
    {
        private readonly AppDbContext _dbContext;

        public TesteFiosCabos()
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
            var FiosCabos = new[]
            {
            new FiosCabo {
                Id = 1,
                Espessura = 3,
                Material = "Plástico",
                PedidoId = 1},
            new FiosCabo {
                Id = 2,
                Espessura = 3,
                Material = "Plástico",
                PedidoId = 1},
            };

            _dbContext.FiosCabos.AddRange(FiosCabos);
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);

            // Act
            var result = await controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<FiosCabo>>(okResult.Value);

            Assert.NotNull(model);
            Assert.NotEmpty(model);

            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);

            var FiosCabo = new FiosCabo
            {
                // Objeto "model" com os dados pra teste
                Id = 3,
                Espessura = 3,
                Material = "Ferro",
                PedidoId = 1
            };

            // Act
            var result = await controller.Create(FiosCabo);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdFiosCabo = Assert.IsAssignableFrom<FiosCabo>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedModel = await _dbContext.FiosCabos.FirstOrDefaultAsync(p => p.Id == createdFiosCabo.Id);
            Assert.NotNull(savedModel);

        }

        [Fact]
        public async Task GetById_ReturnsOkResult()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);
            var id = 1; // ID de um FiosCabo de teste existente

            // Act
            var result = await controller.GetById(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<FiosCabo>(okResult.Value);
            Assert.Equal(id, model.Id);
        }

        [Fact]
        public async Task GetById_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);
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
            var controller = new FiosCabosController(_dbContext);
            var id = 1; // ID de um FiosCabo de teste existente

            var modelForUpdate = _dbContext.FiosCabos.SingleOrDefault(p => p.Id == id);

            Assert.NotNull(modelForUpdate);

            modelForUpdate.Material = "Aço";

            // Act
            var result = await controller.Update(id, modelForUpdate);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se os dados foram atualizados no banco de dados
            var updatedModelDb = await _dbContext.FiosCabos.FindAsync(id);
            Assert.NotNull(updatedModelDb);
            Assert.Equal(modelForUpdate.Material, updatedModelDb.Material);

        }

        [Fact]
        public async Task Update_ReturnsBadRequestResult()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);
            var id = 1; // ID de um FiosCabo de teste existente
            var updatedFiosCabo = new FiosCabo
            {
                Id = 5,
                Espessura = 3,
                Material = "Plástico",
                PedidoId = 1
            }; // ID inválido

            // Act
            var result = await controller.Update(id, updatedFiosCabo);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados
            var updatedFiosCabo = new FiosCabo
            {
                Id = id
            };

            // Act
            var result = await controller.Update(id, updatedFiosCabo);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se o modelo foi removido do banco de dados
            var deletedModel = await _dbContext.FiosCabos.FindAsync(id);
            Assert.Null(deletedModel);
        }

        [Fact]
        public async Task Delete_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new FiosCabosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}