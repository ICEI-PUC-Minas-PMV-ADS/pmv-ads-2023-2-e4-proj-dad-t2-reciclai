using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apis_web_services_projeto_reciclai.Migrations
{
    /// <inheritdoc />
    public partial class M09 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Eletrodomesticos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tamanho = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Peso = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PedidoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eletrodomesticos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Eletrodomesticos_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Eletroportateis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tipo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Material = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PedidoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eletroportateis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Eletroportateis_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FiosCabos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Espessura = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Material = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PedidoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FiosCabos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FiosCabos_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Eletrodomesticos_PedidoId",
                table: "Eletrodomesticos",
                column: "PedidoId");

            migrationBuilder.CreateIndex(
                name: "IX_Eletroportateis_PedidoId",
                table: "Eletroportateis",
                column: "PedidoId");

            migrationBuilder.CreateIndex(
                name: "IX_FiosCabos_PedidoId",
                table: "FiosCabos",
                column: "PedidoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Eletrodomesticos");

            migrationBuilder.DropTable(
                name: "Eletroportateis");

            migrationBuilder.DropTable(
                name: "FiosCabos");
        }
    }
}
