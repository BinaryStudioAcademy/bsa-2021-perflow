import 'package:json_annotation/json_annotation.dart';

part 'new_playlist_reaction.g.dart';

@JsonSerializable()
class NewPlaylistReaction {
  final int userId;
  final int playlistId;

  const NewPlaylistReaction({required this.userId, required this.playlistId});

  factory NewPlaylistReaction.fromJson(Map<String, dynamic> json) => _$NewPlaylistReactionFromJson(json);

  Map<String, dynamic> toJson() => _$NewPlaylistReactionToJson(this);
}
