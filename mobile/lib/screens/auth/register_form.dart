import 'package:flutter/material.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/helpers/validators/auth_validators.dart';
import 'package:perflow/models/auth/register_data.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/perflow_elevated_button.dart';
import 'package:perflow/widgets/perflow_outlined_button.dart';

class RegisterForm extends StatefulWidget {
  final void Function()? onLogin;

  const RegisterForm({
    this.onLogin,
    Key? key
  }) : super(key: key);

  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final _formKey = GlobalKey<FormState>();

  late final TextEditingController _userNameController;
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;
  late final TextEditingController _confirmPasswordController;

  @override
  void initState() {
    super.initState();
    _userNameController = TextEditingController();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    _confirmPasswordController = TextEditingController();
  }

  @override
  void dispose() {
    _userNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthCubit, AuthState>(
      listenWhen: (previous, current) => current is AuthStateError,
      listener: (context, state) => ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Couldn't sign up. " + (state as AuthStateError).errorMessage))
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
                  Text("Don't have an account?", style: Perflow.textTheme.headline6),
                  Text('Sign up for free', style: Perflow.textTheme.headline4),
                ]
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: _userNameController,
                  decoration: Perflow.inputDecoration.copyWith(labelText: 'User name'),
                  validator: userNameValidator,
                ),
                const SizedBox(height: 12),
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
                const SizedBox(height: 12),
                TextFormField(
                  controller: _confirmPasswordController,
                  obscureText: true,
                  decoration: Perflow.inputDecoration.copyWith(labelText: 'Confirm password'),
                  validator: _confirmPasswordValidator,
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
                        onPressed: _register,
                        text: 'Sign up'
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text('Or', style: Perflow.textTheme.caption!.copyWith(color: Perflow.textDarkColor)),
                      ),
                      PerflowOutlinedButton.text(
                        onPressed: widget.onLogin,
                        text: 'Log in',
                      ),
                    ],
                  )
                );
              }
            ),
          ],
        )
      )
    );
  }

  String? _confirmPasswordValidator(String? password) {
    if(password != _passwordController.text) {
      return 'Passwords must match';
    }
    return null;
  }

  void _register() {
    if(!_formKey.currentState!.validate()) {
      return;
    }

    final registerData = RegisterData(
      userName: _userNameController.text,
      email: _emailController.text,
      password: _passwordController.text
    );

    context.read<AuthCubit>().registerWithEmail(registerData);
  }
}
