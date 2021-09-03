import 'package:json_annotation/json_annotation.dart';

part 'new_song_reaction.g.dart';

@JsonSerializable()
class NewSongReaction {
  final int userId;
  final int songId;

  const NewSongReaction({required this.userId, required this.songId});

  factory NewSongReaction.fromJson(Map<String, dynamic> json) => _$NewSongReactionFromJson(json);

  Map<String, dynamic> toJson() => _$NewSongReactionToJson(this);
}
