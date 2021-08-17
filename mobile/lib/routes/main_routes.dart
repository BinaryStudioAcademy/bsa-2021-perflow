import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/main/home/home_screen.dart';
import 'package:perflow/screens/main/library/library_screen.dart';
import 'package:perflow/screens/main/main_screen.dart';
import 'package:perflow/screens/main/search/search_screen.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:vrouter/vrouter.dart';

class MainRoutes extends VRouteElementBuilder {
  final _authService = getService<AuthService>();

  @override
  Future<void> beforeEnter(VRedirector vRedirector) async {
    if(!_authService.isAuthenticated) {
      vRedirector.to(Routes.auth, isReplacement: true);
    }
  }

  @override
  List<VRouteElement> buildRoutes() {
    return [
      VNester.builder(
        path: null,
        widgetBuilder: _buildMainRoot,
        transitionDuration: Duration.zero,
        reverseTransitionDuration: Duration.zero,
        buildTransition: (animation, secondaryAnimation, child) => child,
        nestedRoutes: [
          VWidget(
            path: Routes.home,
            widget: const HomeScreen(),
            buildTransition: (_, __, child) => child,
            transitionDuration: Duration.zero,
            reverseTransitionDuration: Duration.zero
          ),
          VWidget(
            path: Routes.search,
            widget: const SearchScreen(),
            buildTransition: (_, __, child) => child,
            transitionDuration: Duration.zero,
            reverseTransitionDuration: Duration.zero
          ),
          VWidget(
            path: Routes.library,
            widget: const LibraryScreen(),
            buildTransition: (_, __, child) => child,
            transitionDuration: Duration.zero,
            reverseTransitionDuration: Duration.zero
          ),
        ]
      ),
    ];
  }

  Widget _buildMainRoot(BuildContext context, VRouterData data, Widget child) {
    return BlocListener<AuthCubit, AuthState>(
      listenWhen: (previous, current) => current is AuthStateSignedOut,
      listener: (context, state) => context.vRouter.to(Routes.auth, isReplacement: true),
      child: MultiBlocProvider(
        providers: [
          BlocProvider<MainNavigationCubit>(
            create: (_) => MainNavigationCubit(context.vRouter),
          ),
          BlocProvider<PlaybackCubit>(
            create: (_) => PlaybackCubit()
          )
        ],
        child: MainScreen(
          child: child,
        )
      )
    );
  }
}
