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
    public class UsuarioTeste
    {
        private readonly AppDbContext _dbContext;

        public UsuarioTeste()
        {
            // Banco de dados in memory (só pra testar)
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "Reciclai_database")
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _dbContext = new AppDbContext(options);

            SeedTestData();
        }

        [Fact]
        public void Dispose()
        {
            _dbContext.Dispose();
        }

        private void SeedTestData()
        {
            // Inserir dados de teste no banco de dados
            var usuarios = new[]
            {
            new Usuario {
                Id = 1,
                Nome = "Douglas",
                Email = "douglas@pucminas.com",
                Senha = "pucminas",
                Endereco = "avenida tres, caramuru",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Eletrodomestico},
            new Usuario {
                Id = 2,
                Nome = "Karen",
                Email = "karen@pucminas.br",
                Senha = "noguti",
                Endereco = "Rua Japão",
                Perfil = Perfil.Solicitante,
                TipoLixo = TipoLixo.Monitores},
            new Usuario {
                Id = 3,
                Nome = "Cláudia",
                Email = "claudia@pucminas.br",
                Senha = "pucminas",
                Endereco = "Avenida Rio Branco",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao }
            };

            _dbContext.Usuarios.AddRange(usuarios);
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResultWithData()
        {
            // Arrange
            var dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var dbContext = new AppDbContext(dbContextOptions);

            var controller = new UsuariosController(dbContext);

            // Act
            var result = await controller.GetAllUsers();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Usuario>>(okResult.Value);

           
            var unexpectedItemId = 99;
            var itemDoesNotExist = model.All(p => p.Id != unexpectedItemId);
            Assert.True(itemDoesNotExist);
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);

            var model = new Usuario
            {
                // Objeto "model" com os dados pra teste
                Id = 1,
                Nome = "Cláudia",
                Email = "claudia@pucminas.br",
                Senha = "pucminas",
                Endereco = "Avenida Rio Branco",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao
            };

            // Act
            var result = await controller.CreateUser(model);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdModel = Assert.IsAssignableFrom<Pedido>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedModel = await _dbContext.Pedidos.FirstOrDefaultAsync(p => p.Id == createdModel.Id);
            Assert.NotNull(savedModel);

        }

        [Fact]
        public async Task GetById_ReturnsOkResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.GetUserById(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Pedido>(okResult.Value);
            Assert.Equal(id, model.Id);
        }

        [Fact]
        public async Task GetById_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.GetById(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsOkResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 2; // ID de um pedido de teste existente
            var updatedModel = new Usuario
            {
                Id = id,
                Nome = "Cláudia",
                Email = "claudia@pucminas.br",
                Senha = "pucminas",
                Endereco = "Avenida Rio Branco",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao
            };

            // Act
            var result = await controller.UpdateUser(id, updatedModel);

            // Assert
            Assert.IsType<OkObjectResult>(result);

            // Verificando se os dados foram atualizados no banco de dados
            var updatedModelDb = await _dbContext.Pedidos.FindAsync(id);
            Assert.Equal(updatedModel.Id, updatedModelDb.Id);

        }

        [Fact]
        public async Task Update_ReturnsBadRequestResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente
            var updatedModel = new Usuario { 
                Id = 999,
                Email = "puc@pucminas.com",
                Senha = "pucminas2",
                Endereco = "Avenida Rio Branco",
                Perfil = Perfil.Solicitante,
                TipoLixo = TipoLixo.Iluminacao
            }; // ID inválido

            // Act
            var result = await controller.UpdateUser(id, updatedModel);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados
            var updatedModel = new Usuario { Id = id, /* Lembrar de preencher com os outros atributos de Pedido */ };

            // Act
            var result = await controller.UpdateUser(id, updatedModel);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.DeleteUser(id);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Verificando se o modelo foi removido do banco de dados
            var deletedModel = await _dbContext.Pedidos.FindAsync(id);
            Assert.Null(deletedModel);
        }



        [Fact]
        public async Task Delete_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.DeleteUser(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
}
