import 'package:json_annotation/json_annotation.dart';

part 'new_album_reaction.g.dart';

@JsonSerializable()
class NewAlbumReaction {
  final int userId;
  final int albumId;

  const NewAlbumReaction({required this.userId, required this.albumId});

  factory NewAlbumReaction.fromJson(Map<String, dynamic> json) => _$NewAlbumReactionFromJson(json);

  Map<String, dynamic> toJson() => _$NewAlbumReactionToJson(this);
}
