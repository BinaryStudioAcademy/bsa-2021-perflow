part of 'auth_cubit.dart';

@freezed
class AuthState with _$AuthState {
  factory AuthState.initial() = AuthStateInitial;
  factory AuthState.loading() = AuthStateLoading;
  factory AuthState.error(String errorMessage) = AuthStateError;
  factory AuthState.signedOut() = AuthStateSignedOut;
  factory AuthState.signedIn(AuthUser user) = AuthStateSignedIn;
}
