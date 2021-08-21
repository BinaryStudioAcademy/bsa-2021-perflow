import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/playlists/playlist_access_type.dart';

part 'playlist_info.g.dart';

@JsonSerializable()
class PlaylistInfo {
  final int id;
  final String name;
  final String? description;
  final PlaylistAccessType accessType;
  final ArtistSimplified author;
  final DateTime createdAt;
  final bool isLiked;
  final String? iconURL;

  const PlaylistInfo({
    required this.id,
    required this.name,
    this.description,
    required this.accessType,
    required this.author,
    required this.createdAt,
    required this.isLiked,
    this.iconURL,
  });

  factory PlaylistInfo.fromJson(Map<String, dynamic> json) => _$PlaylistInfoFromJson(json);

  Map<String, dynamic> toJson() => _$PlaylistInfoToJson(this);
}
