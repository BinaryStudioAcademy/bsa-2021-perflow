import 'package:json_annotation/json_annotation.dart';

part 'artist_info.g.dart';

@JsonSerializable()
class ArtistInfo {
  final int id;
  final String userName;
  final String? iconURL;
  final bool isLiked;

  const ArtistInfo({
    required this.id,
    required this.userName,
    required this.isLiked,
    this.iconURL,
  });

  factory ArtistInfo.fromJson(Map<String, dynamic> json) => _$ArtistInfoFromJson(json);

  Map<String, dynamic> toJson() => _$ArtistInfoToJson(this);
}
