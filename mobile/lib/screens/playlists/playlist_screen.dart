import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/cubits/playlists/playlist_info_cubit.dart';
import 'package:perflow/cubits/playlists/playlist_songs_cubit.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/models/songs/playlist_song.dart';
import 'package:perflow/screens/details/default_sliver_bar.dart';
import 'package:perflow/screens/details/header.dart';
import 'package:perflow/widgets/songs/song_row.dart';
import 'package:vrouter/vrouter.dart';

class PlaylistScreen extends StatelessWidget {
  final int playlistId;

  const PlaylistScreen({required this.playlistId, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final headerExpandedHeight = MediaQuery.of(context).size.height * 0.6;
    final textTheme = Theme.of(context).textTheme;

    return VWidgetGuard(
      afterEnter: (context, from, to) =>
          context.read<MainNavigationCubit>().setOther(),
      child: Scaffold(
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
                loading: (_) => DefaultSliverBar(
                    context: context,
                    title: const CircularProgressIndicator(),
                    expandedHeight: headerExpandedHeight),
                error: (error) => DefaultSliverBar(
                    context: context,
                    title: Text(error.message),
                    expandedHeight: headerExpandedHeight),
                data: (value) => SliverPersistentHeader(
                  pinned: true,
                  delegate: HeaderDelegate(
                    expandedHeight: headerExpandedHeight,
                    iconUrl: getValidUrl(value.data.iconURL),
                    primaryText: Text(
                      value.data.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.headline5,
                    ),
                    secondaryTextMain: Text(
                      value.data.author.userName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.subtitle1,
                    ),
                    secondaryTextOther: Text(
                      ' | ' '10' ' songs | 40 m 15 s',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.caption,
                    ),
                  ),
                ),
              ),
            ),
            BlocBuilder<PlaylistSongsCubit, ApiCallState<List<PlaylistSong>>>(
                builder: _buildSongsList),
          ],
        ),
      )),
    );
  }

  Widget _buildSongsList(
      BuildContext context, ApiCallState<List<PlaylistSong>> state) {
    return state.map(
        loading: (_) => const SliverFillRemaining(
            hasScrollBody: false,
            child: Center(child: CircularProgressIndicator())),
        error: (error) => SliverFillRemaining(
            hasScrollBody: false, child: Center(child: Text(error.message))),
        data: (songs) => SliverList(
                delegate: SliverChildBuilderDelegate((context, index) {
              final song = songs.data[index];
              return SongRow(song: song);
            }, childCount: songs.data.length)));
  }
}
