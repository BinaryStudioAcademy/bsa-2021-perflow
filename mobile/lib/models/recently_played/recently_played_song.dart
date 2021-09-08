import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/groups/group_simplified.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';

import 'package:freezed_annotation/freezed_annotation.dart';

part 'recently_played_song.g.dart';

@JsonSerializable()
class RecentlyPlayedSong {
  final int id;
  final String name;
  final ArtistSimplified? artist;
  final GroupSimplified? group;
  final AlbumSimplified album;
  final PlaylistSimplified? playlist;

  RecentlyPlayedSong(
      {required this.id,
      required this.name,
      required this.artist,
      required this.group,
      required this.album,
      required this.playlist});

  factory RecentlyPlayedSong.fromJson(Map<String, dynamic> json) =>
      _$RecentlyPlayedSongFromJson(json);

  Map<String, dynamic> toJson() => _$RecentlyPlayedSongToJson(this);
}
