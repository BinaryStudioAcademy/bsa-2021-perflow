import 'package:freezed_annotation/freezed_annotation.dart';

enum PlaylistAccessType {
  @JsonValue(0) secret,
  @JsonValue(1) collaborative,
  @JsonValue(2) public
}
