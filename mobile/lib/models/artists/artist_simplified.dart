import 'package:json_annotation/json_annotation.dart';

part 'artist_simplified.g.dart';

@JsonSerializable()
class ArtistSimplified {
  final int id;
  final String userName;
  final String? iconURL;

  const ArtistSimplified({
    required this.id,
    required this.userName,
    this.iconURL,
  });

  factory ArtistSimplified.fromJson(Map<String, dynamic> json) => _$ArtistSimplifiedFromJson(json);

  Map<String, dynamic> toJson() => _$ArtistSimplifiedToJson(this);
}
