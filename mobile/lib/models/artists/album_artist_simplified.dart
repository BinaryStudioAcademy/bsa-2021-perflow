import 'package:json_annotation/json_annotation.dart';

part 'album_artist_simplified.g.dart';

@JsonSerializable()
class AlbumArtistSimplified {
  final int id;
  final String name;
  final String? iconUrl;

  const AlbumArtistSimplified({
    required this.id,
    required this.name,
    this.iconUrl,
  });

  factory AlbumArtistSimplified.fromJson(Map<String, dynamic> json) => _$AlbumArtistSimplifiedFromJson(json);

  Map<String, dynamic> toJson() => _$AlbumArtistSimplifiedToJson(this);
}
