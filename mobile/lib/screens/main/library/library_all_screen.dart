import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/albums/liked_albums_cubit.dart';
import 'package:perflow/cubits/artists/liked_artists_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/playlists/liked_playlists_cubit.dart';
import 'package:perflow/cubits/playlists/users_playlists_cubit.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/screens/main/library/library_albums_screen.dart';
import 'package:perflow/screens/main/library/library_artists_screen.dart';
import 'package:perflow/widgets/playlists/playlist_row.dart';

class LibraryAllScreen extends StatelessWidget {
  const LibraryAllScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<UsersPlaylistsCubit>(
          create: (context) => UsersPlaylistsCubit(),
        ),
        BlocProvider<LikedPlaylistsCubit>(
          create: (context) => LikedPlaylistsCubit(),
        ),
        BlocProvider<LikedAlbumsCubit>(
          create: (context) => LikedAlbumsCubit(),
        ),
        BlocProvider<LikedArtistsCubit>(
          create: (context) => LikedArtistsCubit(),
        ),
      ],
      child: CustomScrollView(
        slivers: [
          const SliverToBoxAdapter(),
          BlocBuilder<UsersPlaylistsCubit,
              ApiCallState<List<PlaylistSimplified>>>(
            builder: (builder, state) => PlaylistsList(
                context: context, state: state, isUsersPlaylist: true),
          ),
          BlocBuilder<LikedPlaylistsCubit,
              ApiCallState<List<PlaylistSimplified>>>(
            builder: (builder, state) => PlaylistsList(
                context: context, state: state, isUsersPlaylist: false),
          ),
          BlocBuilder<LikedAlbumsCubit, ApiCallState<List<AlbumSimplified>>>(
            builder: (builder, state) =>
                AlbumsList(context: context, state: state),
          ),
          BlocBuilder<LikedArtistsCubit, ApiCallState<List<ArtistSimplified>>>(
            builder: (builder, state) =>
                ArtistsList(context: context, state: state),
          ),
        ],
      ),
    );
  }
}

class PlaylistsList extends StatelessWidget {
  const PlaylistsList({
    Key? key,
    required this.context,
    required this.state,
    required this.isUsersPlaylist,
  }) : super(key: key);

  final BuildContext context;
  final ApiCallState<List<PlaylistSimplified>> state;
  final bool isUsersPlaylist;

  @override
  Widget build(BuildContext context) {
    return state.map(
      loading: (_) => const SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: CircularProgressIndicator(),
        ),
      ),
      error: (error) => SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: Text(error.message),
        ),
      ),
      data: (playlists) => SliverList(
        delegate: SliverChildBuilderDelegate((context, index) {
          // return Play(album: albums.data[index]);
          return PlaylistRow(
            playlist: playlists.data[index],
            isUsers: isUsersPlaylist,
          );
        }, childCount: playlists.data.length),
      ),
    );
  }
}
