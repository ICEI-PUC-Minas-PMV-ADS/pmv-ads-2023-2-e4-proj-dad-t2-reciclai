﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apis_web_services_projeto_reciclai.Models;

#nullable disable

namespace apis_web_services_projeto_reciclai.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Eletrodomestico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<decimal>("Peso")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Tamanho")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("Eletrodomesticos", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Eletroportatil", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Material")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("Eletroportateis", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.FiosCabo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Espessura")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Material")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("FiosCabos", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Iluminacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("Iluminacoes", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Monitor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Led")
                        .HasColumnType("bit");

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<decimal>("Tamanho")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("Monitores", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.PainelFotovoltaico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<int>("Potencia")
                        .HasColumnType("int");

                    b.Property<int>("Tempo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("PainelFotovoltaicos", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataColeta")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("HorarioColeta")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdColetor")
                        .HasColumnType("int");

                    b.Property<int>("IdSolicitante")
                        .HasColumnType("int");

                    b.Property<bool>("LixoPerigoso")
                        .HasColumnType("bit");

                    b.Property<string>("NomeSolicitante")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QtdLixo")
                        .HasColumnType("int");

                    b.Property<int>("TipoLixo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Pedidos", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.PedidoUsuarios", b =>
                {
                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("PedidoId", "UsuarioId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("PedidoUsuarios", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.PilhasBateria", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Composicao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("PilhasBaterias", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.TiTelecomunicacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Estrutura")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PedidoId")
                        .HasColumnType("int");

                    b.Property<double>("Tamanho")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.ToTable("TiTelecomunicacoes", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Perfil")
                        .HasColumnType("int");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TipoLixo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Usuario", (string)null);
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Eletrodomestico", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("Eletrodomesticos")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Eletroportatil", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("Eletroportateis")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.FiosCabo", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("FiosCabos")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Iluminacao", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("Iluminacoes")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Monitor", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("Monitores")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.PainelFotovoltaico", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("PainelFotovoltaicos")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.PedidoUsuarios", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("Usuarios")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("apis_web_services_projeto_reciclai.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.PilhasBateria", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("PilhasBaterias")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.TiTelecomunicacao", b =>
                {
                    b.HasOne("apis_web_services_projeto_reciclai.Models.Pedido", "Pedido")
                        .WithMany("TiTelecomunicacoes")
                        .HasForeignKey("PedidoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");
                });

            modelBuilder.Entity("apis_web_services_projeto_reciclai.Models.Pedido", b =>
                {
                    b.Navigation("Eletrodomesticos");

                    b.Navigation("Eletroportateis");

                    b.Navigation("FiosCabos");

                    b.Navigation("Iluminacoes");

                    b.Navigation("Monitores");

                    b.Navigation("PainelFotovoltaicos");

                    b.Navigation("PilhasBaterias");

                    b.Navigation("TiTelecomunicacoes");

                    b.Navigation("Usuarios");
                });
#pragma warning restore 612, 618
        }
    }
}
