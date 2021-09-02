import 'package:json_annotation/json_annotation.dart';

part 'new_artist_reaction.g.dart';

@JsonSerializable()
class NewArtistReaction {
  final int userId;
  final int artistId;

  const NewArtistReaction({required this.userId, required this.artistId});

  factory NewArtistReaction.fromJson(Map<String, dynamic> json) => _$NewArtistReactionFromJson(json);

  Map<String, dynamic> toJson() => _$NewArtistReactionToJson(this);
}
