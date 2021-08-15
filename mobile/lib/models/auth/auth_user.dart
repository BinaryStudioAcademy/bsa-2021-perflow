import 'package:perflow/models/enums/user_role.dart';

class AuthUser {
  final int id;
  final String firebaseId;
  final UserRole role;
  final String email;
  final String userName;
  final String accessToken;
  final String refreshToken;

  AuthUser({
    required this.id,
    required this.firebaseId,
    required this.role,
    required this.email,
    required this.userName,
    required this.accessToken,
    required this.refreshToken
  });
}
