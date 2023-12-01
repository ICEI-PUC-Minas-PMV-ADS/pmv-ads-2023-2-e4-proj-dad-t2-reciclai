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
using Monitor = apis_web_services_projeto_reciclai.Models.Monitor;

namespace ReciclaiTestes_
{
    public class TesteMonitores : IDisposable
    {
        private readonly AppDbContext _dbContext;

        public TesteMonitores()
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
            var Monitores = new[]
            {
            new Monitor {
                Id = 1,
                Led = true,
                Tamanho = 55,
                PedidoId = 1},
            new Monitor {
                Id = 2,
                Led = true,
                Tamanho = 40,
                PedidoId = 1},
            };

            _dbContext.Monitores.AddRange(Monitores);
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);

            // Act
            var result = await controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<List<Monitor>>(okResult.Value);

            Assert.NotNull(model);
            Assert.NotEmpty(model);

            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);

            var Monitor = new Monitor
            {
                // Objeto "model" com os dados pra teste
                Id = 3,
                Led = true,
                Tamanho = 40,
                PedidoId = 1
            };

            // Act
            var result = await controller.Create(Monitor);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdMonitor = Assert.IsAssignableFrom<Monitor>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedModel = await _dbContext.Monitores.FirstOrDefaultAsync(p => p.Id == createdMonitor.Id);
            Assert.NotNull(savedModel);

        }

        [Fact]
        public async Task GetById_ReturnsOkResult()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);
            var id = 1; // ID de um Monitor de teste existente

            // Act
            var result = await controller.GetById(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Monitor>(okResult.Value);
            Assert.Equal(id, model.Id);
        }

        [Fact]
        public async Task GetById_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);
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
            var controller = new MonitoresController(_dbContext);
            var id = 1; // ID de um Monitor de teste existente

            var modelForUpdate = _dbContext.Monitores.SingleOrDefault(p => p.Id == id);

            Assert.NotNull(modelForUpdate);

            modelForUpdate.Led = false;

            // Act
            var result = await controller.Update(id, modelForUpdate);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se os dados foram atualizados no banco de dados
            var updatedModelDb = await _dbContext.Monitores.FindAsync(id);
            Assert.NotNull(updatedModelDb);
            Assert.Equal(modelForUpdate.Led, updatedModelDb.Led);

        }

        [Fact]
        public async Task Update_ReturnsBadRequestResult()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);
            var id = 1; // ID de um Monitor de teste existente
            var updatedMonitor = new Monitor
            {
                Id = 5,
                Led = true,
                Tamanho = 40,
                PedidoId = 1
            }; // ID inválido

            // Act
            var result = await controller.Update(id, updatedMonitor);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);
            var id = 999; // ID que não existe no banco de dados
            var updatedMonitor = new Monitor
            {
                Id = id
            };

            // Act
            var result = await controller.Update(id, updatedMonitor);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se o modelo foi removido do banco de dados
            var deletedModel = await _dbContext.Monitores.FindAsync(id);
            Assert.Null(deletedModel);
        }

        [Fact]
        public async Task Delete_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new MonitoresController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}