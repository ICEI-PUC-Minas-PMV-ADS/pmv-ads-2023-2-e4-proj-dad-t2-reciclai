IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230921000548_M01')
BEGIN
    CREATE TABLE [Usuario] (
        [Id] int NOT NULL IDENTITY,
        [Nome] nvarchar(max) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Senha] nvarchar(max) NOT NULL,
        [Endereco] nvarchar(max) NOT NULL,
        [Estado] nvarchar(max) NOT NULL,
        [Perfil] int NOT NULL,
        [TipoLixo] int NOT NULL,
        CONSTRAINT [PK_Usuario] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230921000548_M01')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230921000548_M01', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230923172250_M02')
BEGIN
    CREATE TABLE [Pedidos] (
        [Id] int NOT NULL IDENTITY,
        [IdSolicitante] int NOT NULL,
        [IdColetor] int NOT NULL,
        [DataColeta] datetime2 NOT NULL,
        [TipoLixo] int NOT NULL,
        [QtdLixo] int NOT NULL,
        [Descricao] nvarchar(max) NOT NULL,
        [Endereco] nvarchar(max) NOT NULL,
        [NomeSolicitante] nvarchar(max) NOT NULL,
        [LixoPerigoso] bit NOT NULL,
        [Status] int NOT NULL,
        CONSTRAINT [PK_Pedidos] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230923172250_M02')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230923172250_M02', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230923233551_M03')
BEGIN
    CREATE TABLE [PedidoUsuarios] (
        [PedidoId] int NOT NULL,
        [UsuarioId] int NOT NULL,
        CONSTRAINT [PK_PedidoUsuarios] PRIMARY KEY ([PedidoId], [UsuarioId]),
        CONSTRAINT [FK_PedidoUsuarios_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_PedidoUsuarios_Usuario_UsuarioId] FOREIGN KEY ([UsuarioId]) REFERENCES [Usuario] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230923233551_M03')
BEGIN
    CREATE INDEX [IX_PedidoUsuarios_UsuarioId] ON [PedidoUsuarios] ([UsuarioId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230923233551_M03')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230923233551_M03', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924010209_M04')
BEGIN
    CREATE TABLE [Monitores] (
        [Id] int NOT NULL IDENTITY,
        [Led] bit NOT NULL,
        [Tamanho] decimal(18,2) NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_Monitores] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Monitores_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924010209_M04')
BEGIN
    CREATE INDEX [IX_Monitores_PedidoId] ON [Monitores] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924010209_M04')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230924010209_M04', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924120959_M05')
BEGIN
    CREATE TABLE [PilhasBaterias] (
        [Id] int NOT NULL IDENTITY,
        [Composicao] nvarchar(max) NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_PilhasBaterias] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PilhasBaterias_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924120959_M05')
BEGIN
    CREATE INDEX [IX_PilhasBaterias_PedidoId] ON [PilhasBaterias] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924120959_M05')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230924120959_M05', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924170347_M06')
BEGIN
    CREATE TABLE [PainelFotovoltaicos] (
        [Id] int NOT NULL IDENTITY,
        [Potencia] int NOT NULL,
        [Tempo] int NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_PainelFotovoltaicos] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PainelFotovoltaicos_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924170347_M06')
BEGIN
    CREATE INDEX [IX_PainelFotovoltaicos_PedidoId] ON [PainelFotovoltaicos] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924170347_M06')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230924170347_M06', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924173400_M07')
BEGIN
    CREATE TABLE [TiTelecomunicacoes] (
        [Id] int NOT NULL IDENTITY,
        [Estrutura] nvarchar(max) NOT NULL,
        [Tamanho] float NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_TiTelecomunicacoes] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_TiTelecomunicacoes_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924173400_M07')
BEGIN
    CREATE INDEX [IX_TiTelecomunicacoes_PedidoId] ON [TiTelecomunicacoes] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924173400_M07')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230924173400_M07', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924194528_M08')
BEGIN
    CREATE TABLE [Iluminacoes] (
        [Id] int NOT NULL IDENTITY,
        [Tipo] nvarchar(max) NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_Iluminacoes] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Iluminacoes_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924194528_M08')
BEGIN
    CREATE INDEX [IX_Iluminacoes_PedidoId] ON [Iluminacoes] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230924194528_M08')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230924194528_M08', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    CREATE TABLE [Eletrodomesticos] (
        [Id] int NOT NULL IDENTITY,
        [Tamanho] decimal(18,2) NOT NULL,
        [Peso] decimal(18,2) NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_Eletrodomesticos] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Eletrodomesticos_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    CREATE TABLE [Eletroportateis] (
        [Id] int NOT NULL IDENTITY,
        [Tipo] nvarchar(max) NOT NULL,
        [Material] nvarchar(max) NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_Eletroportateis] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Eletroportateis_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    CREATE TABLE [FiosCabos] (
        [Id] int NOT NULL IDENTITY,
        [Espessura] decimal(18,2) NOT NULL,
        [Material] nvarchar(max) NOT NULL,
        [PedidoId] int NOT NULL,
        CONSTRAINT [PK_FiosCabos] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_FiosCabos_Pedidos_PedidoId] FOREIGN KEY ([PedidoId]) REFERENCES [Pedidos] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    CREATE INDEX [IX_Eletrodomesticos_PedidoId] ON [Eletrodomesticos] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    CREATE INDEX [IX_Eletroportateis_PedidoId] ON [Eletroportateis] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    CREATE INDEX [IX_FiosCabos_PedidoId] ON [FiosCabos] ([PedidoId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925222039_M09')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230925222039_M09', N'7.0.11');
END;
GO

COMMIT;
GO

