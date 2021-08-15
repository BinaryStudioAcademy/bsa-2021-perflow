import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/auth/auth_screen.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:vrouter/vrouter.dart';

class AuthRoutes extends VRouteElementBuilder {
  final _authService = getService<AuthService>();

  @override
  Future<void> beforeEnter(VRedirector vRedirector) async {
    if(_authService.isAuthenticated) {
      vRedirector.to(Routes.home, isReplacement: true);
    }
  }

  @override
  List<VRouteElement> buildRoutes() {
    return [
      VWidget(
        path: Routes.auth,
        widget: BlocListener<AuthCubit, AuthState>(
          listenWhen: (previous, current) => current is AuthStateSignedIn,
          listener: (context, state) => context.vRouter.to(Routes.home, isReplacement: true),
          child: const AuthScreen()
        )
      )
    ];
  }
}
