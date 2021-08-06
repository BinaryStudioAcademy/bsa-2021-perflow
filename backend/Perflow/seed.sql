BEGIN TRANSACTION;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Roles]'))
    SET IDENTITY_INSERT [Roles] ON;
INSERT INTO [Roles] ([Id], [Name])
VALUES (1, N'Moderator'),
(2, N'Artist'),
(3, N'User');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name') AND [object_id] = OBJECT_ID(N'[Roles]'))
    SET IDENTITY_INSERT [Roles] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'CreatedAt') AND [object_id] = OBJECT_ID(N'[Groups]'))
    SET IDENTITY_INSERT [Groups] ON;
INSERT INTO [Groups] ([Id], [Name], [CreatedAt])
VALUES (1, N'Maroon 5', '1940-10-09T00:00:00.0000000+03:00'),
(2, N'Imagine Dragons', '1940-10-09T00:00:00.0000000+03:00');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'CreatedAt') AND [object_id] = OBJECT_ID(N'[Groups]'))
    SET IDENTITY_INSERT [Groups] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Birthday', N'Country', N'CreatedAt', N'Description', N'Email', N'Gender', N'GroupId', N'IconURL', N'Password', N'Salt', N'UserName') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] ON;
INSERT INTO [Users] ([Id], [Birthday], [Country], [CreatedAt], [Description], [Email], [Gender], [GroupId], [IconURL], [Password], [Salt], [UserName])
VALUES (1, '1999-03-02T00:00:00.0000000+02:00', N'Ukraine', '2021-07-29T00:00:00.0000000+03:00', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', N'user@gmail.com', CAST(1 AS bit), NULL, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU', N'2w4tdavyRWnzPwjhzJJseAcm3kkrRQaTvuzAXBloRZs=', N'2W+y0GwQIbcSl5vUC6DAyo6I+opkO3E9NlSa+hU7huA=', N'user'),
(2, '1940-10-09T00:00:00.0000000+03:00', N'Great Britain', '2021-07-28T00:00:00.0000000+03:00', N' Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s.', N'artist@gmail.com', CAST(1 AS bit), NULL, N'https://cdn.ananasposter.ru/image/cache/catalog/poster/music/85/8817-1000x830.jpg', N'xNzTPir2trd17vYgGnQyv6xs6tKVoFbloHMN9wXSi2E=', N'K2M0pMRA8JCJmVqY69nhwbEW7cXnFvqhj3K8A9WqpCo=', N'JohnLennon'),
(3, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'artist2@gmail.com', CAST(1 AS bit), NULL, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', N'xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=', N'n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=', N'PaulMcCartney'),
(4, '1996-02-02T00:00:00.0000000+02:00', N'Poland', '2021-07-26T00:00:00.0000000+03:00', N'It has survived not only five centuries, but also the leap into electronic, remaining essentially unchanged.', N'moderator@gmail.com', CAST(0 AS bit), NULL, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU', N'NVB3ZZEK+rqseACtraFR+RHK4sdReGavKt5IE7mw7gQ=', N'jdEeMqVH6VdFQjdzLTWNT4+vHS2B3MWNQQTUYm9o984=', N'moderator'),
(5, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'artist2@gmail.com', CAST(1 AS bit), NULL, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', N'xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=', N'n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=', N'Ed Sheeran'),
(6, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'artist2@gmail.com', CAST(1 AS bit), NULL, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', N'xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=', N'n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=', N'Paloma Mami'),
(7, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'artist2@gmail.com', CAST(1 AS bit), 1, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', N'xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=', N'n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=', N'Adam Levine'),
(8, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'artist2@gmail.com', CAST(1 AS bit), 2, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', N'xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=', N'n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=', N'Dan Reynolds'),
(9, '1942-06-18T00:00:00.0000000+03:00', N'Great Britain', '2021-07-27T00:00:00.0000000+03:00', N'It was popularised in the 1960s.', N'artist2@gmail.com', CAST(1 AS bit), NULL, N'https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg', N'xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=', N'n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=', N'Oxxxymiron');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Birthday', N'Country', N'CreatedAt', N'Description', N'Email', N'Gender', N'GroupId', N'IconURL', N'Password', N'Salt', N'UserName') AND [object_id] = OBJECT_ID(N'[Users]'))
    SET IDENTITY_INSERT [Users] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AuthorId', N'AuthorType', N'CreatedAt', N'Description', N'GroupId', N'IconURL', N'Name', N'Region', N'ReleaseYear', N'isPublished', N'isSingle') AND [object_id] = OBJECT_ID(N'[Albums]'))
    SET IDENTITY_INSERT [Albums] ON;
INSERT INTO [Albums] ([Id], [AuthorId], [AuthorType], [CreatedAt], [Description], [GroupId], [IconURL], [Name], [Region], [ReleaseYear], [isPublished], [isSingle])
VALUES (1, 2, 0, '2020-09-09T00:00:00.0000000+03:00', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', NULL, N'https://upload.wikimedia.org/wikipedia/ru/6/69/ImagineCover.jpg', N'Imagine', 1, 1971, CAST(1 AS bit), CAST(1 AS bit)),
(2, 2, 0, '2020-09-09T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://upload.wikimedia.org/wikipedia/ru/2/2a/MindGames.jpg', N'Mind Games', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(3, 3, 0, '2020-09-09T00:00:00.0000000+03:00', N'Lorem text of the printing and typesetting industry.', NULL, N'https://upload.wikimedia.org/wikipedia/ru/thumb/e/eb/Mccartney_album.jpg/274px-Mccartney_album.jpg', N'McCartney', 1, 1970, CAST(1 AS bit), CAST(1 AS bit)),
(4, 2, 0, '2021-07-25T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://s3-alpha-sig.figma.com/img/1fb9/07df/8cb83fc1826b60e1ac4136f907838260?Expires=1628467200&Signature=AYz434YZD2rEyIIGCCPLssB3aItrqVCktB59iue5-RQ68UQyUM~Vc5ek7Lc-yoItOaPgcw7r1J6eLz82wSA5zqTI9Hh7Bp7LzgD5uIM5P90QWdpYmgeCxW5u66n~~VxMy51WfAcGL8VQ2C1PTT9OpChOhrT4r9jpzFwfmJCShPZbqdRQslmU3b8oyInIdnR~XFUdf2Demw5X0NbSF4esMgkkWvT5gDdR19Q5RNyDcdG8nh5rQY~LSXRBVFmEcd5aDr8-bRMjdr36BJ0ntsF2CeUaJ1y3tJB64rgZrCZO11deVRMl6XGAlwT3I~BF~wo4vM~-qyGn4HghkFFHh~sxxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA', N'Fresh & Chill', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(5, 2, 0, '2021-07-26T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://i.ibb.co/4SHq8NX/Ellipse-42-3.png', N'Relax Work', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(6, 2, 0, '2021-07-24T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://i.ibb.co/7r5Ft4n/Ellipse-42.png', N'Tropical chaos', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(7, 2, 0, '2021-07-27T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://i.ibb.co/sK5hcbn/Ellipse-42-4.png', N'Beautiful People', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(8, 2, 0, '2021-07-23T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://i.ibb.co/4SHq8NX/Ellipse-42-3.png', N'Relax Work', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(9, 2, 0, '2021-07-28T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://i.ibb.co/7r5Ft4n/Ellipse-42.png', N'Tropical chaos', 1, 1973, CAST(1 AS bit), CAST(0 AS bit)),
(10, 2, 0, '2021-07-20T00:00:00.0000000+03:00', N'Lorem printing and typesetting industry.', NULL, N'https://i.ibb.co/sK5hcbn/Ellipse-42-4.png', N'Beautiful People', 1, 1973, CAST(1 AS bit), CAST(0 AS bit));
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AuthorId', N'AuthorType', N'CreatedAt', N'Description', N'GroupId', N'IconURL', N'Name', N'Region', N'ReleaseYear', N'isPublished', N'isSingle') AND [object_id] = OBJECT_ID(N'[Albums]'))
    SET IDENTITY_INSERT [Albums] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessType', N'AuthorId', N'CreatedAt', N'Description', N'IconURL', N'Name') AND [object_id] = OBJECT_ID(N'[Playlists]'))
    SET IDENTITY_INSERT [Playlists] ON;
INSERT INTO [Playlists] ([Id], [AccessType], [AuthorId], [CreatedAt], [Description], [IconURL], [Name])
VALUES (2, 2, 1, '2020-02-01T00:00:00.0000000+02:00', N'It is a page when looking at its layout.', N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Almost the Beatles'),
(3, 0, 1, '2020-12-01T00:00:00.0000000+02:00', N'It is a some page when looking at its layout.', N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'JohnLennon'),
(1, 2, 4, '2020-10-19T00:00:00.0000000+03:00', N'It is a long established fact readable content of a page when looking at its layout.', N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Rock');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AccessType', N'AuthorId', N'CreatedAt', N'Description', N'IconURL', N'Name') AND [object_id] = OBJECT_ID(N'[Playlists]'))
    SET IDENTITY_INSERT [Playlists] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'RolesId', N'UsersId') AND [object_id] = OBJECT_ID(N'[RoleUser]'))
    SET IDENTITY_INSERT [RoleUser] ON;
INSERT INTO [RoleUser] ([RolesId], [UsersId])
VALUES (3, 1),
(2, 2),
(2, 3),
(1, 4);
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'RolesId', N'UsersId') AND [object_id] = OBJECT_ID(N'[RoleUser]'))
    SET IDENTITY_INSERT [RoleUser] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AlbumId', N'ArtistId', N'AuthorType', N'CreatedAt', N'Duration', N'GroupId', N'HasCensorship', N'IconURL', N'Name') AND [object_id] = OBJECT_ID(N'[Songs]'))
    SET IDENTITY_INSERT [Songs] ON;
INSERT INTO [Songs] ([Id], [AlbumId], [ArtistId], [AuthorType], [CreatedAt], [Duration], [GroupId], [HasCensorship], [IconURL], [Name])
VALUES (1, 1, 3, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'That Would Be Something'),
(2, 2, 2, 0, '2020-09-09T00:00:00.0000000+03:00', 4, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Mind Games'),
(3, 2, 2, 0, '2020-09-09T00:00:00.0000000+03:00', 2, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Imagine'),
(4, 3, 2, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(5, 5, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(6, 5, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(7, 5, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(8, 5, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(9, 5, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(10, 6, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(11, 6, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(12, 6, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(13, 6, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(14, 6, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(15, 7, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(16, 7, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(17, 7, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(18, 7, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(19, 7, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(20, 8, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(21, 8, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(22, 8, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(23, 8, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(24, 8, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(25, 9, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(26, 9, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(27, 9, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(28, 9, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(29, 9, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(30, 10, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(31, 10, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(32, 10, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(33, 10, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(34, 10, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(35, 4, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(36, 4, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(37, 4, 5, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(38, 4, 6, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(39, 4, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 1, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(40, 4, null, 1, '2020-09-09T00:00:00.0000000+03:00', 3, 2, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People'),
(41, 4, 9, 0, '2020-09-09T00:00:00.0000000+03:00', 3, NULL, CAST(0 AS bit), N'https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg', N'Only People');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'AlbumId', N'ArtistId', N'AuthorType', N'CreatedAt', N'Duration', N'GroupId', N'HasCensorship', N'IconURL', N'Name') AND [object_id] = OBJECT_ID(N'[Songs]'))
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
