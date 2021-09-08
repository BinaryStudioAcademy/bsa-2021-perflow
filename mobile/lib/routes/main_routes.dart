import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/cubits/library_navigation/library_navigation_cubit.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/cubits/playback_queue/playback_queue_cubit.dart';
import 'package:perflow/cubits/search/search_albums_cubit.dart';
import 'package:perflow/cubits/search/search_artists_cubit.dart';
import 'package:perflow/cubits/search/search_playlists_cubit.dart';
import 'package:perflow/cubits/search/search_songs_cubit.dart';
import 'package:perflow/cubits/search_navigation/search_navigation_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/models/songs/song.dart';
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
import 'package:perflow/screens/main/queue/queue_screen.dart';
import 'package:perflow/screens/main/search/search_base_screen.dart';
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
          VNester(
            path: null,
            widgetBuilder: _buildSearchRoot,
            nestedRoutes: [
              VWidget(
                path: Routes.searchSongs,
                widget: const SearchCommonScreen<SearchSongsCubit, Song>(),
              ),
              VWidget(
                path: Routes.searchAlbums,
                widget: const SearchCommonScreen<SearchAlbumsCubit,
                    AlbumSimplified>(),
              ),
              VWidget(
                path: Routes.searchArtists,
                widget: const SearchCommonScreen<SearchArtistsCubit,
                    ArtistSimplified>(),
              ),
              VWidget(
                path: Routes.searchPlaylists,
                widget: const SearchCommonScreen<SearchPlaylistsCubit,
                    PlaylistSimplified>(),
              ),
            ],
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
          VWidget(
            path: Routes.player,
            widget: const PlayerScreen()
          ),
          VWidget(
            path: Routes.queue,
            widget: const QueueScreen()
          ),
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

  Widget _buildSearchRoot(Widget child) {
    return BlocProvider<SearchNavigationCubit>(
      create: (_) => SearchNavigationCubit(),
      child: VWidgetGuard(
        afterUpdate: _matchSearchRoute,
        afterEnter: _matchSearchRoute,
        child: SearchScreen(
          child: child,
        ),
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
            create: (_) => MainNavigationCubit()
          ),
          BlocProvider<PlaybackCubit>(
            create: (_) => PlaybackCubit()
          ),
          BlocProvider<PlaybackQueueCubit>(
            lazy: false,
            create: (_) => PlaybackQueueCubit()
          )
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

  void _matchSearchRoute(BuildContext context, String? from, String to) {
    final navCubit = context.read<SearchNavigationCubit>();

    switch (to) {
      case Routes.searchSongs:
        navCubit.setSongs();
        break;
      case Routes.searchArtists:
        navCubit.setArtists();
        break;
      case Routes.searchAlbums:
        navCubit.setAlbums();
        break;
      case Routes.searchPlaylists:
        navCubit.setPlaylists();
        break;
      default:
        navCubit.setSongs();
        break;
    }
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
      case Routes.searchSongs:
      case Routes.searchAlbums:
      case Routes.searchArtists:
      case Routes.searchPlaylists:
        navCubit.setSearch();
        break;
      case Routes.libraryAll:
      case Routes.libraryAlbums:
      case Routes.libraryArtists:
      case Routes.librarySongs:
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
