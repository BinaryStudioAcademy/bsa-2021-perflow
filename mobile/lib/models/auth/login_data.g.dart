// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login_data.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LoginData _$LoginDataFromJson(Map<String, dynamic> json) {
  return LoginData(
    accessToken: json['accessToken'] as String,
    firebaseId: json['firebaseId'] as String,
    email: json['email'] as String,
    userName: json['userName'] as String,
  );
}

Map<String, dynamic> _$LoginDataToJson(LoginData instance) => <String, dynamic>{
      'accessToken': instance.accessToken,
      'firebaseId': instance.firebaseId,
      'email': instance.email,
      'userName': instance.userName,
    };
