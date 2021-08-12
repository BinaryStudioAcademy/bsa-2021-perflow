import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/home/home_screen.dart';
import 'package:perflow/screens/main/main_screen.dart';
import 'package:perflow/screens/playlists/playlists_screen.dart';
import 'package:perflow/screens/search/search_screen.dart';
import 'package:vrouter/vrouter.dart';

class MainRoutes extends VRouteElementBuilder {
  @override
  List<VRouteElement> buildRoutes() {
    return [
      VNester.builder(
        path: null,
        widgetBuilder: _buildMainRoot,
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
            path: Routes.playlists,
            widget: const PlaylistsScreen(),
            buildTransition: (_, __, child) => child,
            transitionDuration: Duration.zero,
            reverseTransitionDuration: Duration.zero
          ),
        ]
      ),
    ];
  }

  Widget _buildMainRoot(BuildContext context, VRouterData data, Widget child) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<MainNavigationCubit>(
          create: (_) => MainNavigationCubit(context.vRouter),
        )
      ],
      child: MainScreen(
        child: child,
      )
    );
  }
}
