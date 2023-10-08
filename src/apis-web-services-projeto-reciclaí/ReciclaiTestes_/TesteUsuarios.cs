using apis_web_services_projeto_reciclai.Controllers;
using apis_web_services_projeto_reciclai.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BCrypt.Net;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReciclaiTestes_
{
    public class TesteUsuarios : IDisposable
    {
        private readonly AppDbContext _dbContext;
        public TesteUsuarios()
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
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Eletrodomestico},
            new Usuario {
                Id = 2,
                Nome = "Dodo 2",
                Email = "dodo@dodo.com",
                Senha = "dodo",
                Endereco = "avenida tres, ipiranga",
                Perfil = Perfil.Solicitante,
                TipoLixo = TipoLixo.Monitores},
            new Usuario {
                Id = 3,
                Nome = "Dodo 3",
                Email = "dodo@dodo.com",
                Senha = "dodo",
                Endereco = "avenida tres, jorge velho",
                Perfil = Perfil.Coletor,
                TipoLixo = TipoLixo.Iluminacao}
            };

            _dbContext.Usuarios.AddRange(usuarios);
            _dbContext.SaveChanges();
        }

        

        [Fact]
        public async Task CreateUser_ReturnsCreatedAtAction()
        {
            // Arrange
            var controller = new UsuariosController(_dbContext);

            var usuarioDto = new UsuarioDto
            {
                // Objeto "usuarioDto" com os dados pra teste
                Id = 1,
		        Nome = "Dodo 1",
                Senha = "Teste",
		        Email = "dodo@dodo.com",
		        Endereco = "avenida tres, caramuru",
		        Perfil = Perfil.Coletor,
		        TipoLixo = TipoLixo.Iluminacao
            };

            // Act
            var result = await controller.CreateUser(usuarioDto);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createdUser = Assert.IsAssignableFrom<Usuario>(createdAtActionResult.Value);

            // Verificando se o objeto foi adicionado ao banco de dados
            var savedUser = await _dbContext.Usuarios.FirstOrDefaultAsync(p => p.Id == createdUser.Id);
            Assert.NotNull(savedUser);

            // Pensar em mais asserts
        }
    }
}
