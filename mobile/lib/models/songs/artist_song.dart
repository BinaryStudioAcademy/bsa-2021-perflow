import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/groups/group_simplified.dart';
import 'package:perflow/models/songs/song.dart';

part 'artist_song.g.dart';

@JsonSerializable()
class ArtistSong implements Song{
  @override
  final int id;

  @override
  final String name;

  @override
  final ArtistSimplified? artist;

  @override
  final GroupSimplified? group;

  @override
  final AlbumSimplified album;

  @override
  final int duration;

  @override
  final bool isLiked;

  @override
  String? get blobId => null;

  const ArtistSong({
    required this.id,
    required this.name,
    this.artist,
    this.group,
    required this.album,
    required this.duration,
    required this.isLiked,
  });

  factory ArtistSong.fromJson(Map<String, dynamic> json) => _$ArtistSongFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ArtistSongToJson(this);
}