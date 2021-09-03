import 'package:json_annotation/json_annotation.dart';

part 'album_by_artist.g.dart';

@JsonSerializable()
class AlbumByArtist {
  final int id;
  final String name;
  final String? iconURL;
  final int? releaseYear;
  final String authorName;

  const AlbumByArtist({
    required this.id,
    required this.name,
    this.releaseYear,
    this.iconURL,
    required this.authorName
  });

  factory AlbumByArtist.fromJson(Map<String, dynamic> json) => _$AlbumByArtistFromJson(json);

  Map<String, dynamic> toJson() => _$AlbumByArtistToJson(this);
}
