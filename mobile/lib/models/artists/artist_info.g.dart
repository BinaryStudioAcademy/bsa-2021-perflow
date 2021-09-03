// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artist_info.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ArtistInfo _$ArtistInfoFromJson(Map<String, dynamic> json) {
  return ArtistInfo(
    id: json['id'] as int,
    userName: json['userName'] as String,
    isLiked: json['isLiked'] as bool,
    iconURL: json['iconURL'] as String?,
  );
}

Map<String, dynamic> _$ArtistInfoToJson(ArtistInfo instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userName': instance.userName,
      'iconURL': instance.iconURL,
      'isLiked': instance.isLiked,
    };
