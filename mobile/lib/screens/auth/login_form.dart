import 'package:flutter/material.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/helpers/validators/auth_validators.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_elevated_button.dart';
import 'package:perflow/widgets/buttons/perflow_outlined_button.dart';

class LoginForm extends StatefulWidget {
  final void Function()? onRegister;

  const LoginForm({
    this.onRegister,
    Key? key
  }) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();

  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthCubit, AuthState>(
      listenWhen: (previous, current) => current is AuthStateError,
      listener: (context, state) => ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Couldn't log in. " + (state as AuthStateError).errorMessage))
      ),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Welcome.', style: Perflow.textTheme.headline6),
                Text('No music, no life', style: Perflow.textTheme.headline4),
              ]
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: _emailController,
                  decoration: Perflow.inputDecoration.copyWith(labelText: 'Email'),
                  validator: emailValidator,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: Perflow.inputDecoration.copyWith(labelText: 'Password'),
                  validator: passwordValidator,
                ),
              ],
            ),
            BlocBuilder<AuthCubit, AuthState>(
              builder: (context, state) {
                return state.maybeMap(
                  loading: (_) => const Center(child: CircularProgressIndicator()),
                  orElse: () => Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      PerflowElevatedButton.text(
                        onPressed: _logInWithEmail,
                        text: 'Log in'
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text('Or', style: Perflow.textTheme.caption!.copyWith(color: Perflow.textDarkColor)),
                      ),
                      PerflowOutlinedButton.text(
                        onPressed: _logInWithGoogle,
                        text: 'Sign in with Google',
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text('Or', style: Perflow.textTheme.caption!.copyWith(color: Perflow.textDarkColor)),
                      ),
                      PerflowOutlinedButton.text(
                        onPressed: widget.onRegister,
                        text: 'Sign up',
                      ),
                    ],
                  )
                );
              }
            )
          ],
        )
      ),
    );
  }

  void _logInWithEmail() {
    if(!_formKey.currentState!.validate()) {
      return;
    }

    context.read<AuthCubit>().signInWithEmail(
      email: _emailController.text,
      password: _passwordController.text
    );
  }

  void _logInWithGoogle() {
    context.read<AuthCubit>().signInWithGoogle();
  }
}
