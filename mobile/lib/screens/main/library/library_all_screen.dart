import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/playlists/liked_playlists_cubit.dart';
import 'package:perflow/cubits/playlists/users_playlists_cubit.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/widgets/albums/album_list.dart';
import 'package:perflow/widgets/artists/artist_list.dart';
import 'package:perflow/widgets/playlists/playlist_row.dart';

class LibraryAllScreen extends StatelessWidget {
  const LibraryAllScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        BlocBuilder<UsersPlaylistsCubit,
            ApiCallState<List<PlaylistSimplified>>>(
          builder: (builder, state) =>
              _PlaylistsList(state: state, isUsersPlaylist: true),
        ),
        BlocBuilder<LikedPlaylistsCubit,
            ApiCallState<List<PlaylistSimplified>>>(
          builder: (builder, state) =>
              _PlaylistsList(state: state, isUsersPlaylist: false),
        ),
        const AlbumsList(),
        const ArtistsList(),
      ],
    );
  }
}

class _PlaylistsList extends StatelessWidget {
  const _PlaylistsList({
    Key? key,
    required this.state,
    required this.isUsersPlaylist,
  }) : super(key: key);

  final ApiCallState<List<PlaylistSimplified>> state;
  final bool isUsersPlaylist;

  @override
  Widget build(BuildContext context) {
    return state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(
        child: Text(error.message),
      ),
      data: (playlists) => ListView.builder(
        itemBuilder: (context, index) {
          return PlaylistRow(playlist: playlists.data[index]);
        },
        itemCount: playlists.data.length,
        shrinkWrap: true,
        physics: const ClampingScrollPhysics(),
      ),
    );
  }
}
