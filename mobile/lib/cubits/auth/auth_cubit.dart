import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/auth/auth_user.dart';
import 'package:perflow/models/auth/register_data.dart';
import 'package:perflow/services/auth/auth_service.dart';

part 'auth_state.dart';
part 'auth_cubit.freezed.dart';

class AuthCubit extends Cubit<AuthState> {
  final _authService = getService<AuthService>();
  late final StreamSubscription<AuthUser?> _authSubscription;

  AuthCubit() : super(AuthState.initial()) {
    _initialize();
  }

  Future<void> _initialize() async {
    _authSubscription = _authService.authStateChanges.listen(
      _handleAuthStateChange,
      onError: _handleAuthStateError
    );
  }

  void _handleAuthStateChange(AuthUser? authUser) {
    if(authUser == null) {
      emit(AuthState.signedOut());
      return;
    }

    emit(AuthState.signedIn(authUser));
  }

  void _handleAuthStateError(Object error) {
    emit(AuthState.error('Unexpected error occurred'));
    emit(AuthState.signedOut());
  }

  Future<void> registerWithEmail(RegisterData data) {
    return _handleAuthUpdateFuture(_authService.registerWithEmail(data));
  }

  Future<void> signInWithEmail({
    required String email,
    required String password
  }) {
    return _handleAuthUpdateFuture(_authService.signInWithEmail(email: email, password: password));
  }

  Future<void> signInWithGoogle() {
    return _handleAuthUpdateFuture(_authService.signInWithGoogle());
  }

  Future<void> signOut() {
    return _handleAuthUpdateFuture(_authService.signOut());
  }

  Future<void> _handleAuthUpdateFuture(Future<void> future) async {
    emit(AuthState.loading());
    try {
      await future;
    }
    on FirebaseAuthException catch(e) {
      emit(AuthState.error(_getAuthExceptionMessage(e.code) ?? ''));
      emit(AuthState.signedOut());
    }
  }

  String? _getAuthExceptionMessage(String errorCode) {
    switch(errorCode) {
      case 'invalid-email':
      case 'invalid-password':
      case 'invalid-argument':
      case 'invalid-credential':
      case 'user-not-found': return 'Invalid credentials';
      case 'operation-not-allowed': return 'User disabled';
      default: return null;
    }
  }

  @override
  Future<void> close() {
    _authSubscription.cancel();
    return super.close();
  }
}
