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
    public class TestePedidos : IDisposable
    {
        private readonly AppDbContext _dbContext;

        public TestePedidos()
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

            ReciclaiDatabase();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        private void ReciclaiDatabase()
        {
            // Inserir dados de teste no banco de dados
            var usuarios = new[]
            {
            new Usuario {
                Id = 1,
                Nome = "Dodo 1",
                Email = "dodo@dodo.com",
                Senha = "dodo",
                Endereco = "avenida tres, caramuru",
                Estado = "Minas Gerais",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Eletrodomestico},
            new Usuario {
                Id = 2,
                Nome = "Dodo 2",
                Email = "dodo@dodo.com",
                Senha = "dodo",
                Endereco = "avenida tres, ipiranga",
                Estado = "Minas Gerais",
                Perfil = Perfil.Solicitante,
                TipoLixo = TipoLixo.Monitores},
            new Usuario {
                Id = 3,
                Nome = "Dodo 3",
                Email = "dodo@dodo.com",
                Senha = "dodo",
                Endereco = "avenida tres, jorge velho",
                Estado = "Minas Gerais",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao}
            };

            var pedidos = new[]
            {
            new Pedido {
                Id = 1,
                IdSolicitante = 1,
                IdColetor = 2,
                DataColeta = DateTime.Now,
                TipoLixo = 0,
                QtdLixo = 1,
                Descricao = "Test 1",
                Endereco = "testando",
                NomeSolicitante = "Dodo 1",
                LixoPerigoso = true,
                Usuarios = null },
            new Pedido {
                Id = 2,
                IdSolicitante = 3,
                IdColetor = 4,
                DataColeta = DateTime.Now,
                TipoLixo = 0,
                QtdLixo = 1,
                Descricao = "Test 2",
                Endereco = "testando",
                NomeSolicitante = "Dodo 2",
                LixoPerigoso = false,
                Usuarios = null }
            };

            var pedidoUsuarios = new List<PedidoUsuarios>
            {
                new PedidoUsuarios { PedidoId = 1, UsuarioId = 1 },
                new PedidoUsuarios { PedidoId = 1, UsuarioId = 2 },
                new PedidoUsuarios { PedidoId = 2, UsuarioId = 1 },
                new PedidoUsuarios { PedidoId = 2, UsuarioId = 2 }
            };

            _dbContext.Pedidos.AddRange(pedidos);
            _dbContext.Usuarios.AddRange(usuarios);
            _dbContext.PedidoUsuarios.AddRange(pedidoUsuarios);
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);

            // Act
            var result = await controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Pedido>>(okResult.Value);

            // Pensar em mais asserts (esse não corresponde ao método)
            //var unexpectedItemId = 99;
            //var itemDoesNotExist = model.All(p => p.Id != unexpectedItemId);
            //Assert.True(itemDoesNotExist);

            Assert.NotNull(model);
            Assert.NotEmpty(model);

            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);

            var model = new Pedido
            {
                // Objeto "model" com os dados pra teste
                Id = 5,
                IdSolicitante = 0,
                IdColetor = 0,
                DataColeta = DateTime.Now,
                TipoLixo = 0,
                QtdLixo = 1,
                Descricao = "test 3",
                Endereco = "testando",
                NomeSolicitante = "Dodo",
                LixoPerigoso = true,
                Usuarios = null
            };

            // Act
            var result = await controller.Create(model);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdModel = Assert.IsAssignableFrom<Pedido>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedModel = await _dbContext.Pedidos.FirstOrDefaultAsync(p => p.Id == createdModel.Id);
            Assert.NotNull(savedModel);

            // Pensar em mais asserts
        }

        [Fact]
        public async Task GetById_ReturnsOkResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.GetById(id);

            // Assert
            //Assert.NotNull(result);
            //var okResult = Assert.IsType<ObjectResult>(result);
            //var model = Assert.IsAssignableFrom<Pedido>(okResult.Value);
            //Assert.Equal(id, model.Id);

            Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(result); 
            var statusCodeResult = (OkObjectResult)result;
            Assert.Equal(200, statusCodeResult.StatusCode);
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
            var controller = new PedidosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            var modelForUpdate = _dbContext.Pedidos.SingleOrDefault(p => p.Id == id);

            Assert.NotNull(modelForUpdate);


                modelForUpdate.Descricao = "Test 3";

                // Act
                var result = await controller.Update(id, modelForUpdate);

                // Assert
                Assert.IsType<OkObjectResult>(result);

                // Verificando se os dados foram atualizados no banco de dados
                var updatedModelDb = await _dbContext.Pedidos.FindAsync(id);
                Assert.NotNull(updatedModelDb);
                Assert.Equal(modelForUpdate.Descricao, updatedModelDb.Descricao);
            
        }

        [Fact]
        public async Task Update_ReturnsBadRequestResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente
            var updatedModel = new Pedido { Id = 999, /* Lembrar de preencher com os outros atributos de Pedido */ }; // ID inválido

            // Act
            var result = await controller.Update(id, updatedModel);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados
            var updatedModel = new Pedido { Id = id, /* Lembrar de preencher com os outros atributos de Pedido */ };

            // Act
            var result = await controller.Update(id, updatedModel);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_ReturnsNoContent()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente

            // Act
            var result = await controller.Delete(id);

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
            var controller = new PedidosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados

            // Act
            var result = await controller.Delete(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task AddUsuario_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var pedidoId = 5; // ID de um pedido existente
            var usuarioId = 1; // ID de um usuário existente
            var model = new PedidoUsuarios { PedidoId = pedidoId, UsuarioId = usuarioId };

            // Act
            var result = await controller.AddUsuario(pedidoId, model);

            // Assert
            Assert.IsType<CreatedAtActionResult>(result);

            // Verificando se o modelo foi adicionado ao banco de dados
            var addedModel = await _dbContext.PedidoUsuarios.FirstOrDefaultAsync(pu => pu.PedidoId == pedidoId && pu.UsuarioId == usuarioId);
            Assert.NotNull(addedModel);
            Assert.Equal(pedidoId, addedModel.PedidoId);
            Assert.Equal(usuarioId, addedModel.UsuarioId);

            var statusCodeResult = (CreatedAtActionResult)result;
            Assert.Equal(201, statusCodeResult.StatusCode);
        }

        [Fact]
        public async Task AddUsuario_ReturnsNotFoundObjectResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var pedidoId = 1; // ID de um pedido existente
            var usuarioId = 999; // ID que não existe no banco de dados
            var model = new PedidoUsuarios { PedidoId = pedidoId, UsuarioId = usuarioId /* Lembrar de preencher com os outros atributos de PedidoUsuarios */ };

            // Act
            var result = await controller.AddUsuario(pedidoId, model);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);

        }

        [Fact]
        public async Task AddUsuario_ReturnsBadRequestObjectResult()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var pedidoId = 1; // ID de um pedido existente
            var usuarioId = 1; // ID que existe no banco de dados
            var model = new PedidoUsuarios { PedidoId = 2, UsuarioId = usuarioId };

            // Act
            var result = await controller.AddUsuario(pedidoId, model);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);

        }

        [Fact]
        public async Task AddUsuario_ReturnsStatusCode405()
        {
            // Arrange
            var controller = new PedidosController(_dbContext);
            var pedidoId = 1; // ID de um pedido existente
            var usuarioId = 3; // ID de um usuário existente
            var model = new PedidoUsuarios { PedidoId = pedidoId, UsuarioId = usuarioId };

            // Simulando o 405 (Adicionando um PedidosUsuarios com o mesmo perfil)
            _dbContext.PedidoUsuarios.Add(new PedidoUsuarios { PedidoId = pedidoId, UsuarioId = usuarioId });
            _dbContext.SaveChanges();

            // Act
            var result = await controller.AddUsuario(pedidoId, model);

            // Assert
            Assert.IsType<ObjectResult>(result);
            var statusCodeResult = (ObjectResult)result;
            Assert.Equal(405, statusCodeResult.StatusCode);
        }

        [Fact]
        public async Task DeleteUsuario_ReturnsNoContentWhenSuccessfullyDeleted()
        {

            // Arrange
            var controller = new PedidosController(_dbContext);

            // Act
            var result = await controller.DeleteUsuario(1, 1); // IDs válidos

            // Assert
            var noContentResult = Assert.IsType<NoContentResult>(result);
            Assert.Equal(204, noContentResult.StatusCode);

            // Verificando se o PedidosUsuarios foi excluído com sucesso
            var deletedPedidoUsuarios = _dbContext.PedidoUsuarios.FirstOrDefault(pu => pu.PedidoId == 1 && pu.UsuarioId == 1);
            Assert.Null(deletedPedidoUsuarios); // Depois de excluído, tem que ser nulo
        }

        [Fact]
        public async Task DeleteUsuario_ReturnsNotFoundResult()
        {

            var controller = new PedidosController(_dbContext);

            // Act
            var result = await controller.DeleteUsuario(4, 5); // IDs inválidos

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
