import 'package:json_annotation/json_annotation.dart';

part 'login_data.g.dart';

@JsonSerializable()
class LoginData {
  final String accessToken;
  final String firebaseId;
  final String email;
  final String userName;

  LoginData({
    required this.accessToken,
    required this.firebaseId,
    required this.email,
    required this.userName
  });

  factory LoginData.fromJson(Map<String, dynamic> json) => _$LoginDataFromJson(json);
	Map<String, dynamic> toJson() => _$LoginDataToJson(this);
}
