import 'package:json_annotation/json_annotation.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';

part 'song.g.dart';

@JsonSerializable()
class Song {
  final int id;
  final String name;
  final ArtistSimplified artist;
  final AlbumSimplified album;
  final int duration;
  final String? blobId;
  final bool isLiked;

  const Song({
    required this.id,
    required this.name,
    required this.artist,
    required this.album,
    required this.duration,
    required this.blobId,
    required this.isLiked,
  });

  factory Song.fromJson(Map<String, dynamic> json) => _$SongFromJson(json);

  Map<String, dynamic> toJson() => _$SongToJson(this);
}
