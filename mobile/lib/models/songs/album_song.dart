import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/songs/song.dart';

part 'album_song.g.dart';

@JsonSerializable()
class AlbumSong implements Song{
  @override
  final int id;

  @override
  final String name;

  @override
  final ArtistSimplified artist;

  @override
  final AlbumSimplified album;

  @override
  final int duration;

  @override
  final bool isLiked;

  @override
  String? get blobId => null;

  const AlbumSong({
    required this.id,
    required this.name,
    required this.artist,
    required this.album,
    required this.duration,
    required this.isLiked,
  });

  factory AlbumSong.fromJson(Map<String, dynamic> json) => _$AlbumSongFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$AlbumSongToJson(this);
}