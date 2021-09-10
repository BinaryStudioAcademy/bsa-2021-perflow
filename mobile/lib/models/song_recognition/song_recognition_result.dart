import 'package:json_annotation/json_annotation.dart';

part 'song_recognition_result.g.dart';

@JsonSerializable()
class SongRecognitionResult {
  final int songId;

  SongRecognitionResult({required this.songId});

  factory SongRecognitionResult.fromJson(Map<String, dynamic> json) => _$SongRecognitionResultFromJson(json);

  Map<String, dynamic> toJson() => _$SongRecognitionResultToJson(this);
}
