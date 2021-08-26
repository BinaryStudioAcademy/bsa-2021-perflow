import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/groups/group_simplified.dart';
import 'package:perflow/models/songs/album_song.dart';

part 'album_info.g.dart';

@JsonSerializable()
class AlbumInfo {
  final int id;
  final String name;
  final String? iconURL;
  final ArtistSimplified? artist;
  final GroupSimplified? group;
  final int releaseYear;
  final bool isLiked;
  final List<AlbumSong> songs;

  const AlbumInfo({
    required this.id,
    required this.name,
    required this.releaseYear,
    required this.isLiked,
    required this.songs,
    this.iconURL,
    this.artist,
    this.group
  });

  factory AlbumInfo.fromJson(Map<String, dynamic> json) => _$AlbumInfoFromJson(json);
  Map<String, dynamic> toJson() => _$AlbumInfoToJson(this);
}