import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/groups/group_simplified.dart';

part 'song.g.dart';

@JsonSerializable()
class Song {
  final int id;
  final String name;
  final ArtistSimplified? artist;
  final AlbumSimplified album;
  final GroupSimplified? group;
  final int duration;
  final bool isLiked;

  const Song({
    required this.id,
    required this.name,
    this.artist,
    required this.album,
    this.group,
    required this.duration,
    required this.isLiked,
  });

  factory Song.fromJson(Map<String, dynamic> json) => _$SongFromJson(json);

  Map<String, dynamic> toJson() => _$SongToJson(this);
}
