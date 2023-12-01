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
    public class TesteUsuario : IDisposable
    {
        private readonly AppDbContext _dbContext;

        public TesteUsuario()
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

            _dbContext.Usuarios.AddRange(usuarios);
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetAll_ReturnsOkResultWithData()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);

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

            var usuarioDto = new UsuarioDto
            {
                // Objeto "model" com os dados pra teste
                Id = 1,
                Nome = "Cláudia",
                Email = "claudia@pucminas.br",
                Senha = "pucminas",
                Estado = "Rio de Janeiro",
                Endereco = "Avenida Rio Branco",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao
            };

            // Act
            var result = await controller.CreateUser(usuarioDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdUsuarioDto = Assert.IsAssignableFrom<Usuario>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedModel = await _dbContext.Usuarios.FirstOrDefaultAsync(p => p.Id == createdUsuarioDto.Id);
            Assert.NotNull(savedModel);

        }

        [Fact]
        public async Task GetById_ReturnsOkResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 1; // ID de um usuário de teste existente

            // Act
            var result = await controller.GetUserById(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<Usuario>(okResult.Value);
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
            var id = 1; // ID de um usuário de teste existente

            var updatedUsuarioDto = new UsuarioDto
            {
                Id = 1,
                Nome = "Cláudia",
                Senha = "pucminas",
                Email = "claudia@pucminas.br",
                Endereco = "Avenida Rio Preto",
                Estado = "Rio de Janeiro",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao
            };


            // Act
            var result = await controller.UpdateUser(id, updatedUsuarioDto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task Update_ReturnsBadRequestResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 1; // ID de um pedido de teste existente
            var updatedUsuarioDto = new UsuarioDto { 
                Id = 999,
                Email = "puc@pucminas.com",
                Senha = "pucminas2",
                Endereco = "Avenida Rio Branco",
                Perfil = Perfil.Solicitante,
                TipoLixo = TipoLixo.Iluminacao
            }; // ID inválido

            // Act
            var result = await controller.UpdateUser(id, updatedUsuarioDto);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNotFoundResult()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);
            var id = 999; // ID que não existe no banco de dados
            var updatedUsuarioDto = new UsuarioDto {
                Id = id
            };

            // Act
            var result = await controller.UpdateUser(id, updatedUsuarioDto);

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

