import 'dart:async';
import 'dart:io';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:get_it/get_it.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/models/auth/auth_user.dart';
import 'package:perflow/models/auth/login_data.dart';
import 'package:perflow/models/auth/register_data.dart';
import 'package:perflow/models/enums/user_role.dart';
import 'package:perflow/services/auth/auth_api.dart';
import 'package:rxdart/rxdart.dart';

@Singleton(signalsReady: true)
class AuthService {
  final AuthApi _authApi;
  late final FirebaseAuth _auth;

  AuthUser? _currentAuthState;
  final _authStateSubject = ReplaySubject<AuthUser?>(maxSize: 1);
  
  AuthService(
    this._authApi
  ) {
    _initialize();
  }

  Future<void> _initialize() async {
    final app = await Firebase.initializeApp();
    _auth = FirebaseAuth.instanceFor(app: app);

    _auth.authStateChanges().listen(_handleAuthStateChange);

    GetIt.instance.signalReady(this);
  }

  bool get isAuthenticated => _currentAuthState != null;

  AuthUser? get currentAuthState => _currentAuthState;

  Stream<AuthUser?> getAuthStateStream() {
    return _authStateSubject.stream;
  }

  Future<String?> getToken() async {
    if(!isAuthenticated) {
      return null;
    }

    return await _auth.currentUser?.getIdToken();
  }

  Future<void> registerWithEmail(RegisterData registerData) async {
    final registerResponse = await _authApi.register(registerData);

    if(registerResponse.statusCode != HttpStatus.ok) {
      return;
    }

    await signInWithEmail(
      email: registerData.email,
      password: registerData.password
    );
  }

  Future<void> signInWithEmail({
    required String email,
    required String password
  }) {
    return _auth.signInWithEmailAndPassword(email: email, password: password);
  }

  Future<void> signInWithGoogle() async {
    try {
      final googleUser = await GoogleSignIn(
          scopes: ['email', 'profile']
      ).signIn();

      if(googleUser == null) {
        return signOut();
      }

      final googleAuth = await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
          accessToken: googleAuth.accessToken,
          idToken: googleAuth.idToken
      );

      await _auth.signInWithCredential(credential);
    }
    catch (e) {
      signOut();
      rethrow;
    }
  }

  Future<void> signOut() {
    return _auth.signOut();
  }

  Future<void> _handleAuthStateChange(User? firebaseUser) async {
    if(firebaseUser == null) {
      _setAuthState(null);
      return;
    }

    if(firebaseUser.email == null || firebaseUser.displayName == null) {
      await signOut();
      return;
    }

    final loginData = LoginData(
      accessToken: await firebaseUser.getIdToken(),
      firebaseId: firebaseUser.uid,
      userName: firebaseUser.displayName!,
      email: firebaseUser.email!
    );

    try {
      final loginResponse = await _authApi.login(loginData);

      if(loginResponse.statusCode != HttpStatus.ok) {
        await signOut();
        return;
      }

      final tokenResult = await firebaseUser.getIdTokenResult(true);

      final authUser =  AuthUser(
          id: tokenResult.claims!['id'],
          firebaseId: firebaseUser.uid,
          role: UserRole.values[tokenResult.claims!['role']],
          userName: firebaseUser.displayName!,
          email: firebaseUser.email!,
          accessToken: tokenResult.token!,
          refreshToken: firebaseUser.refreshToken!
      );

      _setAuthState(authUser);
    }
    catch (_) {
      signOut();
    }
  }

  void _setAuthState(AuthUser? state) {
    _currentAuthState = state;
    _authStateSubject.add(state);
  }
}
