import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/playlists/playlist_info_cubit.dart';
import 'package:perflow/cubits/playlists/playlist_songs_cubit.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/models/songs/playlist_song.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/screens/playlists/playlist_header.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';

import 'package:perflow/widgets/songs/song_row.dart';

class PlaylistScreen extends StatelessWidget {
  final int playlistId;

  const PlaylistScreen({
    required this.playlistId,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final headerExpandedHeight = MediaQuery.of(context).size.height * 0.6;

    return Scaffold(
      body: MultiBlocProvider(
        providers: [
          BlocProvider<PlaylistSongsCubit>(
            create: (context) => PlaylistSongsCubit(playlistId),
          ),
          BlocProvider<PlaylistInfoCubit>(
            create: (context) => PlaylistInfoCubit(playlistId),
          ),
        ],
        child: CustomScrollView(
          slivers: [
            const SliverToBoxAdapter(),
            BlocBuilder<PlaylistInfoCubit, ApiCallState<PlaylistInfo>>(
              builder: (context, state) => state.map(
                loading: (_) => _buildDefaultSliverAppbar(
                  context: context,
                  title: const CircularProgressIndicator(),
                  expandedHeight: headerExpandedHeight
                ),
                error: (error) => _buildDefaultSliverAppbar(
                  context: context,
                  title: Text(error.message),
                  expandedHeight: headerExpandedHeight
                ),
                data: (value) => SliverPersistentHeader(
                  pinned: true,
                  delegate: PlaylistHeaderDelegate(
                    expandedHeight: headerExpandedHeight,
                    info: value.data
                  )
                ),
              ),
            ),
            BlocBuilder<PlaylistSongsCubit, ApiCallState<List<PlaylistSong>>>(
              builder: _buildSongsList
            ),
          ],
        ),
      )
    );
  }

  Widget _buildDefaultSliverAppbar({
    required BuildContext context,
    required Widget title,
    required double expandedHeight
  }) {
    return SliverAppBar(
      elevation: 2,
      backgroundColor: Perflow.backgroundColor,
      expandedHeight: expandedHeight - RootMediaQuery.value.padding.top,
      pinned: true,
      leading: const PerflowBackButton(),
      flexibleSpace: FlexibleSpaceBar(
        centerTitle: true,
        background: const DecoratedBox(
          decoration: BoxDecoration(
            gradient: Perflow.secondaryGradient
          )
        ),
        title: title,
      ),
    );
  }

  Widget _buildSongsList(BuildContext context, ApiCallState<List<PlaylistSong>> state) {
    return state.map(
      loading: (_) => const SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: CircularProgressIndicator()
        )
      ),
      error: (error) => SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: Text(error.message)
        )
      ),
      data: (songs) => SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final song = songs.data[index % songs.data.length];
            return SongRow(song: song);
          },
          childCount: songs.data.length * 3
        )
      )
    );
  }
}
