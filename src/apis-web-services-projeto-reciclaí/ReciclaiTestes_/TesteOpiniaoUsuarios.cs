using apis_web_services_projeto_reciclai.Controllers;
using apis_web_services_projeto_reciclai.Models;
using apis_web_services_projeto_reciclai.Services;
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
    public class OpiniaoUsuarios : IDisposable
    {
        private readonly AppDbContext _dbContext;
        //private readonly OpiniaoUsuarioService _opiniaoUsuarioService;

        //private DbContextOptions<AppDbContext> GetInMemoryDatabaseOptions(string Reciclai_database)
        //{
        //    return new DbContextOptionsBuilder<AppDbContext>()
        //        .UseInMemoryDatabase(databaseName: Reciclai_database)
        //        .Options;
        //}

        public OpiniaoUsuarios()
        {
            //Banco de dados in memory
            var serviceProvider = new ServiceCollection()
               .AddEntityFrameworkInMemoryDatabase()
               .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "Reciclai_database")
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _dbContext = new AppDbContext(options);

            ReciclaiDatabase();

            //var dbContextOptions = GetInMemoryDatabaseOptions(Reciclai_database);
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        private void ReciclaiDatabase()
        {
            
        }

        //[Fact]
        //public async Task Get_ReturnsUserOpinion()
        //{
        //    // Arrange
        //    //var controller = new OpiniaoUsuariosController(new OpiniaoUsuarioService(_dbContext)); //De onde devo puxar a base de dados?

        //    var validId = "validId";
        //    var expectedOpiniaoUsuario = new OpiniaoUsuario { /* colocar os dados */ };

        //    // Act
        //    var result = await controller.Get(validId);

        //    // Assert
        //    var okResult = Assert.IsType<ActionResult<OpiniaoUsuario>>(result);
        //    Assert.Equal(expectedOpiniaoUsuario, okResult.Value);
        //}

        //Get_ReturnsListOfUserOpinion

        //Post_ReturnsCreatedAtAction

        //Update_ReturnsNotFound

        //Update_ReturnsNoContent

        //Delete_ReturnsNotFound

        //Delete_ReturnsNoContent
    }
}