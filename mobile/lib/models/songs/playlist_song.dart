import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/songs/song.dart';

part 'playlist_song.g.dart';

@JsonSerializable()
class PlaylistSong implements Song {
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

  const PlaylistSong({
    required this.id,
    required this.name,
    required this.artist,
    required this.album,
    required this.duration,
    required this.isLiked,
  });

  factory PlaylistSong.fromJson(Map<String, dynamic> json) => _$PlaylistSongFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$PlaylistSongToJson(this);
}