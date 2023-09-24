using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apis_web_services_projeto_reciclai.Migrations
{
    /// <inheritdoc />
    public partial class M05 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Perfil",
                table: "PedidoUsuarios",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Perfil",
                table: "PedidoUsuarios");
        }
    }
}
