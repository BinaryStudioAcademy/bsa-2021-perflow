import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/artists/album_artist_simplified.dart';
import 'package:perflow/models/groups/group_simplified.dart';

part 'album_simplified.g.dart';

@JsonSerializable()
class AlbumSimplified {
  final int id;
  final String name;
  final String? iconURL;
  final int? releaseYear;
  final AlbumArtistSimplified? author;
  final GroupSimplified? group;

  const AlbumSimplified({
    required this.id,
    required this.name,
    this.releaseYear,
    this.iconURL,
    this.author,
    this.group
  });

  factory AlbumSimplified.fromJson(Map<String, dynamic> json) => _$AlbumSimplifiedFromJson(json);

  Map<String, dynamic> toJson() => _$AlbumSimplifiedToJson(this);
}
