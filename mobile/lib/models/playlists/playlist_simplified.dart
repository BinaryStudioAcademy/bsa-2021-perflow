import 'package:json_annotation/json_annotation.dart';

part 'playlist_simplified.g.dart';

@JsonSerializable()
class PlaylistSimplified {
  final int id;
  final String name;
  final String? description;
  final String? iconURL;

  const PlaylistSimplified({
    required this.id,
    required this.name,
    this.description,
    this.iconURL
  });

  factory PlaylistSimplified.fromJson(Map<String, dynamic> json) => _$PlaylistSimplifiedFromJson(json);

  Map<String, dynamic> toJson() => _$PlaylistSimplifiedToJson(this);
}
