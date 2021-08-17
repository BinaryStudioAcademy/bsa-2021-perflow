import 'package:animations/animations.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/screens/auth/login_form.dart';
import 'package:perflow/screens/auth/register_form.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({Key? key}) : super(key: key);

  @override
  _AuthScreenState createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _loginKey = const ValueKey('Login');
  final _registerKey = const ValueKey('Register');

  bool _isLogin = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: BlocBuilder<AuthCubit, AuthState>(
        buildWhen: (previous, current) => current is! AuthStateError,
        builder: (context, state) => state.maybeMap(
          initial: (_) => const Center(child: CircularProgressIndicator()),
          orElse: () => Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
            child: AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              transitionBuilder: (child, animation) => FadeScaleTransition(
                animation: animation,
                child: child,
              ),
              child: _isLogin
                ? LoginForm(key: _loginKey, onRegister: _switchToRegister)
                : RegisterForm(key: _registerKey, onLogin: _switchToLogin),
            ),
          ),
        ),
      ),
    );
  }

  void _switchToLogin() {
    setState(() => _isLogin = true);
  }

  void _switchToRegister() {
    setState(() => _isLogin = false);
  }
}
