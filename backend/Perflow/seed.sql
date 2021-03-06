BEGIN TRANSACTION;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CreatedAt', N'Name') AND [object_id] = OBJECT_ID(N'[Groups]'))
    SET IDENTITY_INSERT [Groups] ON;
INSERT INTO [Groups] ([Id], [CreatedAt], [Name])
VALUES (1, '0001-01-01T00:00:00.0000000+00:00', N'Maroon 5'),
(2, '0001-01-01T00:00:00.0000000+00:00', N'Imagine Dragons');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CreatedAt', N'Name') AND [object_id] = OBJECT_ID(N'[Groups]'))
    SET IDENTITY_INSERT [Groups] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Birthday', N'Country', N'CreatedAt', N'Description', N'Email', N'FirebaseId', N'Gender', N'GroupId', N'IconURL', N'Role', N'UserName') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] ON;
INSERT INTO [Users] ([Id], [Birthday], [Country], [CreatedAt], [Description], [Email], [FirebaseId], [Gender], [GroupId], [IconURL], [Role], [UserName])
VALUES (1, '1999-03-02T00:00:00.0000000+02:00', N'Ukraine', '2021-07-29T00:00:00.0000000+03:00', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', N'user@mail.com', N'Y6sm8RLdUQQZG0FPfUYQz5OoxG53', CAST(1 AS bit), NULL, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU', 0, N'user'),
(2, '1940-10-09T00:00:00.0000000+03:00', N'Great Britain', '2021-07-28T00:00:00.0000000+03:00', N' Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s.', N'artist@mail.com', N'cPknpzguENTOBGdc7LMO5t84ABj2', CAST(1 AS bit), NULL, N'https://cdn.ananasposter.ru/image/cache/catalog/poster/music/85/8817-1000x830.jpg', 1, N'artist'),
(3, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'moderator@mail.com', N'w7Ww4Ep1sxRKpu73CuiMZDM3bjr2', CAST(1 AS bit), NULL, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', 2, N'moderator');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Birthday', N'Country', N'CreatedAt', N'Description', N'Email', N'FirebaseId', N'Gender', N'GroupId', N'IconURL', N'Role', N'UserName') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AuthorId', N'AuthorType', N'CreatedAt', N'Description', N'GroupId', N'IconURL', N'IsPublished', N'IsSingle', N'Name', N'Region', N'ReleaseYear') AND [object_id] = OBJECT_ID(N'[Albums]'))
    SET IDENTITY_INSERT [Albums] ON;
INSERT INTO [Albums] ([Id], [AuthorId], [AuthorType], [CreatedAt], [Description], [GroupId], [IconURL], [IsPublished], [IsSingle], [Name], [Region], [ReleaseYear])
VALUES (1, 2, 0, '2020-09-09T00:00:00.0000000+03:00', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', NULL, N'https://upload.wikimedia.org/wikipedia/ru/6/69/ImagineCover.jpg', CAST(1 AS bit), CAST(1 AS bit), N'Imagine', 1, 1971),
(2, 2, 0, '2020-09-09T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://upload.wikimedia.org/wikipedia/ru/2/2a/MindGames.jpg', CAST(1 AS bit), CAST(0 AS bit), N'Mind Games', 1, 1973),
(3, 3, 0, '2020-09-09T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://upload.wikimedia.org/wikipedia/ru/thumb/e/eb/Mccartney_album.jpg/274px-Mccartney_album.jpg', CAST(1 AS bit), CAST(1 AS bit), N'McCartney', 1, 1970),
(4, 3, 0, '2021-07-29T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/XbxfLQ9/Ellipse-42-5.png', CAST(1 AS bit), CAST(1 AS bit), N'Fresh & Chill', 1, 2015),
(5, 3, 0, '2021-07-27T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/4SHq8NX/Ellipse-42-3.png', CAST(1 AS bit), CAST(1 AS bit), N'Relax Work', 1, 2015),
(6, 3, 0, '2021-07-28T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/7r5Ft4n/Ellipse-42.png', CAST(1 AS bit), CAST(1 AS bit), N'Tropical chaos', 1, 2015),
(7, 3, 0, '2021-07-26T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/sK5hcbn/Ellipse-42-4.png', CAST(1 AS bit), CAST(1 AS bit), N'Beautiful People', 1, 2015),
(8, 3, 0, '2021-07-25T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/4SHq8NX/Ellipse-42-3.png', CAST(1 AS bit), CAST(1 AS bit), N'Relax Work', 1, 2015),
(9, 3, 0, '2021-07-23T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/7r5Ft4n/Ellipse-42.png', CAST(1 AS bit), CAST(1 AS bit), N'Tropical chaos', 1, 2015),
(10, 3, 0, '2021-07-24T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://i.ibb.co/sK5hcbn/Ellipse-42-4.png', CAST(1 AS bit), CAST(1 AS bit), N'Beautiful People', 1, 2015);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AuthorId', N'AuthorType', N'CreatedAt', N'Description', N'GroupId', N'IconURL', N'IsPublished', N'IsSingle', N'Name', N'Region', N'ReleaseYear') AND [object_id] = OBJECT_ID(N'[Albums]'))
    SET IDENTITY_INSERT [Albums] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessType', N'AuthorId', N'CreatedAt', N'Description', N'IconURL', N'Name') AND [object_id] = OBJECT_ID(N'[Playlists]'))
    SET IDENTITY_INSERT [Playlists] ON;
INSERT INTO [Playlists] ([Id], [AccessType], [AuthorId], [CreatedAt], [Description], [IconURL], [Name])
VALUES (2, 2, 1, '2020-02-01T00:00:00.0000000+02:00', N'It is a page when looking at its layout.', N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Almost the Beatles'),
(3, 0, 1, '2020-12-01T00:00:00.0000000+02:00', N'It is a some page when looking at its layout.', N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'JohnLennon'),
(1, 2, 2, '2020-10-19T00:00:00.0000000+03:00', N'It is a long established fact readable content of a page when looking at its layout.', N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Rock');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessType', N'AuthorId', N'CreatedAt', N'Description', N'IconURL', N'Name') AND [object_id] = OBJECT_ID(N'[Playlists]'))
    SET IDENTITY_INSERT [Playlists] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AlbumId', N'ArtistId', N'AuthorType', N'CreatedAt', N'Duration', N'GroupId', N'HasCensorship', N'Name') AND [object_id] = OBJECT_ID(N'[Songs]'))
    SET IDENTITY_INSERT [Songs] ON;
INSERT INTO [Songs] ([Id], [AlbumId], [ArtistId], [AuthorType], [CreatedAt], [Duration], [GroupId], [HasCensorship], [Name])
VALUES (1, 1, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'That Would Be Something'),
(2, 1, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(1 AS bit), N'Mind Games'),
(3, 1, 2, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Imagine'),
(4, 1, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'Only People'),
(5, 4, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Shape Of You'),
(6, 5, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(1 AS bit), N'Perfect'),
(7, 6, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Thinking Out Loud'),
(8, 7, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'Photograph'),
(9, 8, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(1 AS bit), N'Fingías'),
(10, 9, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(0 AS bit), N'For Ya'),
(11, 10, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(1 AS bit), N'No Te Enamores'),
(12, 4, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit),  N'Not Steady'),
(13, 5, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Payphone'),
(14, 6, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(0 AS bit), N'This Love'),
(15, 7, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(1 AS bit), N'Animals'),
(16, 8, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'Sugar'),
(17, 9, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Believer'),
(18, 10, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(0 AS bit), N'Bad Liar'),
(19, 4, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Thunder'),
(20, 5, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(1 AS bit), N'Radioactive'),
(21, 6, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'KONSTRUKT'),
(22, 7, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(0 AS bit), N'Fata Morgana'),
(23, 8, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'Russky Cockney'),
(24, 9, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(1 AS bit), N'XXX Shop'),
(25, 10, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'REALITY'),
(26, 4, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(0 AS bit), N'Happier'),
(27, 5, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(1 AS bit), N'No Te Debí Besar'),
(28, 6, 1, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'Wait');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AlbumId', N'ArtistId', N'AuthorType', N'CreatedAt', N'Duration', N'GroupId', N'HasCensorship', N'Name') AND [object_id] = OBJECT_ID(N'[Songs]'))
    SET IDENTITY_INSERT [Songs] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CreatedAt', N'PlaylistId', N'SongId') AND [object_id] = OBJECT_ID(N'[PlaylistSong]'))
    SET IDENTITY_INSERT [PlaylistSong] ON;
INSERT INTO [PlaylistSong] ([Id], [CreatedAt], [PlaylistId], [SongId])
VALUES (1, '2020-10-19T00:00:00.0000000+03:00', 1, 1),
(4, '2020-02-01T00:00:00.0000000+02:00', 2, 1),
(2, '2020-10-19T00:00:00.0000000+03:00', 1, 2),
(5, '2020-02-01T00:00:00.0000000+02:00', 2, 2),
(7, '2020-12-01T00:00:00.0000000+02:00', 3, 2),
(3, '2020-10-19T00:00:00.0000000+03:00', 1, 3),
(6, '2020-02-01T00:00:00.0000000+02:00', 2, 3),
(8, '2020-12-01T00:00:00.0000000+02:00', 3, 3),
(9, '2020-12-01T00:00:00.0000000+02:00', 3, 4);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CreatedAt', N'PlaylistId', N'SongId') AND [object_id] = OBJECT_ID(N'[PlaylistSong]'))
    SET IDENTITY_INSERT [PlaylistSong] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'SongId', N'UserId') AND [object_id] = OBJECT_ID(N'[SongReactions]'))
    SET IDENTITY_INSERT [SongReactions] ON;
INSERT INTO [SongReactions] ([Id], [SongId], [UserId])
VALUES (1, 1, 1),
(2, 3, 1),
(3, 4, 1);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'SongId', N'UserId') AND [object_id] = OBJECT_ID(N'[SongReactions]'))
    SET IDENTITY_INSERT [SongReactions] OFF;
GO

COMMIT;
GO