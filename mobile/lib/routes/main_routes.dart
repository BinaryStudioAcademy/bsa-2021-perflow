import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/cubits/library_navigation/library_navigation_cubit.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/routes/content_routes.dart';
import 'package:perflow/screens/main/home/home_screen.dart';
import 'package:perflow/screens/main/library/library_albums_screen.dart';
import 'package:perflow/screens/main/library/library_all_screen.dart';
import 'package:perflow/screens/main/library/library_artists_screen.dart';
import 'package:perflow/screens/main/library/library_screen.dart';
import 'package:perflow/screens/main/library/library_songs_screen.dart';
import 'package:perflow/screens/main/main_screen.dart';
import 'package:perflow/screens/main/player/player_screen.dart';
import 'package:perflow/screens/main/search/search_screen.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:vrouter/vrouter.dart';

class MainRoutes extends VRouteElementBuilder {
  final _authService = getService<AuthService>();

  @override
  Future<void> beforeEnter(VRedirector vRedirector) async {
    if (!_authService.isAuthenticated) {
      vRedirector.to(Routes.auth, isReplacement: true);
    }
  }

  @override
  List<VRouteElement> buildRoutes() {
    return [
      VNester(
        path: null,
        widgetBuilder: _buildMainRoot,
        transitionDuration: Duration.zero,
        reverseTransitionDuration: Duration.zero,
        buildTransition: (animation, secondaryAnimation, child) => child,
        nestedRoutes: [
          VWidget(
            path: Routes.home,
            widget: const HomeScreen(),
          ),
          VWidget(
            path: Routes.search,
            widget: const SearchScreen(),
          ),
          VNester(
            path: null,
            widgetBuilder: _buildLibraryRoot,
            nestedRoutes: [
              VWidget(
                path: Routes.libraryAll,
                widget: const LibraryAllScreen(),
              ),
              VWidget(
                path: Routes.libraryArtists,
                widget: const LibraryArtistsScreen(),
              ),
              VWidget(
                path: Routes.libraryAlbums,
                widget: const LibraryAlbumsScreen(),
              ),
              VWidget(
                path: Routes.librarySongs,
                widget: const LibrarySongsScreen(),
              ),
            ],
          ),
          VWidget(path: Routes.player, widget: const PlayerScreen()),
          ContentRoutes()
        ],
      )
    ];
  }

  Widget _buildLibraryRoot(Widget child) {
    return BlocProvider<LibraryNavigationCubit>(
      create: (_) => LibraryNavigationCubit(),
      child: VWidgetGuard(
        afterUpdate: _matchLibraryRoute,
        child: LibraryScreen(
          child: child,
        ),
        afterEnter: _matchLibraryRoute,
      ),
    );
  }

  Widget _buildMainRoot(Widget child) {
    return BlocListener<AuthCubit, AuthState>(
      listenWhen: (previous, current) => current is AuthStateSignedOut,
      listener: (context, state) =>
          context.vRouter.to(Routes.auth, isReplacement: true),
      child: MultiBlocProvider(
        providers: [
          BlocProvider<MainNavigationCubit>(
            create: (_) => MainNavigationCubit(),
          ),
          BlocProvider<PlaybackCubit>(create: (_) => PlaybackCubit())
        ],
        child: VWidgetGuard(
          afterUpdate: _matchRoute,
          child: MainScreen(
            child: child,
          ),
        ),
      ),
    );
  }

  void _matchLibraryRoute(BuildContext context, String? from, String to) {
    final navCubit = context.read<LibraryNavigationCubit>();

    switch (to) {
      case Routes.libraryAll:
        navCubit.setAll();
        break;
      case Routes.libraryArtists:
        navCubit.setArtists();
        break;
      case Routes.libraryAlbums:
        navCubit.setAlbums();
        break;
      case Routes.librarySongs:
        navCubit.setSongs();
        break;
      default:
        navCubit.setAll();
        break;
    }
  }

  void _matchRoute(BuildContext context, String? from, String to) {
    final navCubit = context.read<MainNavigationCubit>();
    switch (to) {
      case Routes.home:
        navCubit.setHome();
        break;
      case Routes.search:
        navCubit.setSearch();
        break;
      case Routes.libraryAll:
      case Routes.libraryAlbums:
      case Routes.libraryArtists:
        navCubit.setLibrary();
        break;
      case Routes.player:
        navCubit.setPlayer();
        break;
      default:
        navCubit.setOther();
        break;
    }
  }
}
