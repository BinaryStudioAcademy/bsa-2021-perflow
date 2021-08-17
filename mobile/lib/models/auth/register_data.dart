import 'package:json_annotation/json_annotation.dart';

part 'register_data.g.dart';

@JsonSerializable()
class RegisterData {
  final String userName;
  final String email;
  final String password;

  RegisterData({
    required this.userName,
    required this.email,
    required this.password
  });

  factory RegisterData.fromJson(Map<String, dynamic> json) => _$RegisterDataFromJson(json);
  Map<String, dynamic> toJson() => _$RegisterDataToJson(this);
}
