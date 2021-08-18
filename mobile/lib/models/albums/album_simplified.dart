import 'package:json_annotation/json_annotation.dart';

part 'album_simplified.g.dart';

@JsonSerializable()
class AlbumSimplified {
  final int id;
  final String name;
  final String? iconURL;

  const AlbumSimplified({
    required this.id,
    required this.name,
    this.iconURL,
  });

  factory AlbumSimplified.fromJson(Map<String, dynamic> json) => _$AlbumSimplifiedFromJson(json);

  Map<String, dynamic> toJson() => _$AlbumSimplifiedToJson(this);
}
