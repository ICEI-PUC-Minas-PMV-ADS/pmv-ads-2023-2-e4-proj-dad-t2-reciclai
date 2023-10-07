using NUnit.Framework;
using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclai.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework.Internal;
using apis_web_services_projeto_reciclaí.Models;
namespace TestReciclai.UsuarioTest
{
    [TestFixture]
    public class UsuarioControllerTest
    {
        private UsuariosController _usuariosController;
        private DbContextOptions<AppDbContext> _dbContextOptions;

        [SetUp]
        public void Setup()
        {
            _dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var dbContext = new AppDbContext(_dbContextOptions);
            _usuariosController = new UsuariosController(dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            using (var context = new AppDbContext(_dbContextOptions))
            {
                context.Database.EnsureDeleted();
            }
        }

        [Test]
        public async Task GetAllUsers()
        {
            // Arrange:
            using (var context = new AppDbContext(_dbContextOptions))
            {
                context.Usuarios.AddRange(new List<Usuario>
            {
                new Usuario { Id = 1, Nome = "Cláudia" },
                new Usuario { Id = 2, Nome = "Karen" },
            });
                context.SaveChanges();
            }

            // Act
            var result = await _usuariosController.GetAllUsers();

            // Assert
            var okResult = result as OkObjectResult;
            var usuarios = okResult?.Value as List<Usuario>;

            Assert.IsNotNull(okResult);
            Assert.IsNotNull(usuarios);
            Assert.That(usuarios.Count, Is.EqualTo(2));
        }


        [Test]
        public async Task GetUserById_ExistingUser()
        {
            // Arrange: 
            using (var context = new AppDbContext(_dbContextOptions))
            {
                context.Usuarios.Add(new Usuario { Id = 1, Nome = "Cláudia" });
                context.SaveChanges();
            }

            // Act
            var result = await _usuariosController.GetUserById(1);

            // Assert
            var okResult = result as OkObjectResult;
            var usuario = okResult?.Value as Usuario;

            Assert.IsNotNull(okResult);
            Assert.IsNotNull(usuario);
            Assert.That(usuario.Id, Is.EqualTo(1));
        }

        [Test]
        public async Task GetUserById_NonExistingUser()
        {
            // Arrange: 

            // Act
            var result = await _usuariosController.GetUserById(1);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task CreateUser_Success()
        {
            // Arrange: 
            var usuarioDto = new UsuarioDto
            {
                Nome = "Claudia",
                Senha = "12345",
                Email = "claudia@gmail.com",
                Endereco = "Rua Flor de maio",
                Perfil = 0,
                TipoLixo = 0
            };

            // Act
            var result = await _usuariosController.CreateUser(usuarioDto);

            // Assert
            var createdAtActionResult = result as CreatedAtActionResult;
            var usuarioCriado = createdAtActionResult?.Value as Usuario;

            Assert.IsNotNull(createdAtActionResult);
            Assert.IsNotNull(usuarioCriado);
            Assert.AreEqual(usuarioDto.Nome, usuarioCriado.Nome);

        }

        [Test]
        public async Task CreateUser_Error()
        {
            // Arrange: 

            var usuarioDto = new UsuarioDto();

            // Act
            var result = await _usuariosController.CreateUser(usuarioDto);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

    }
}