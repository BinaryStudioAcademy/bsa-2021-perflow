import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/albums/album_info_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/reactions/album_reaction_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/helpers/time/time_convert.dart';
import 'package:perflow/models/albums/album_info.dart';
import 'package:perflow/screens/details/default_sliver_bar.dart';
import 'package:perflow/screens/details/header.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/widgets/songs/song_row.dart';

class AlbumScreen extends StatelessWidget {
  final int albumId;

  const AlbumScreen({required this.albumId, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final headerExpandedHeight = MediaQuery.of(context).size.height * 0.6;
    final textTheme = Theme.of(context).textTheme;
    final _authService = getService<AuthService>();

    return Scaffold(
      body: MultiBlocProvider(
        providers: [
          BlocProvider<AlbumInfoCubit>(
            create: (context) => AlbumInfoCubit(albumId),
          ),
          BlocProvider<AlbumReactionCubit>(
            create: (context) => AlbumReactionCubit(),
          )
        ],
        child: CustomScrollView(
          slivers: [
            const SliverToBoxAdapter(),
            BlocBuilder<AlbumInfoCubit, ApiCallState<AlbumInfo>>(
              builder: (context, state) => state.map(
                loading: (_) => DefaultSliverBar(
                    context: context,
                    title: const CircularProgressIndicator(),
                    expandedHeight: headerExpandedHeight),
                error: (error) => DefaultSliverBar(
                    context: context,
                    title: Text(error.message),
                    expandedHeight: headerExpandedHeight),
                data: (value) =>
                    BlocBuilder<AlbumReactionCubit, AlbumReactionState>(
                  builder: (context, state) => SliverPersistentHeader(
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
                        value.data.artist != null
                            ? value.data.artist!.userName
                            : value.data.group!.name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.subtitle1,
                      ),
                      secondaryTextOther: Text(
                        ' | ' +
                            value.data.songs.length.toString() +
                            ' songs | ' +
                            timeConvert(
                              Duration(
                                seconds: value.data.songs
                                    .map((e) => e.duration)
                                    .reduce(
                                        (value, element) => value + element),
                              ),
                            ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.caption,
                      ),
                      isLikeAvailable: (value.data.artist != null
                          ? value.data.artist!.id !=
                              _authService.currentAuthState!.id
                          : value.data.group!.id !=
                              _authService.currentAuthState!.id),
                      isLiked: state.maybeMap(
                        initial: (_) => value.data.isLiked,
                        liked: (_) => true,
                        unliked: (_) => false,
                        orElse: () => value.data.isLiked,
                      ),
                      onLikePress: () {
                        context
                            .read<AlbumReactionCubit>()
                            .likeAlbum(value.data.id);
                      },
                      onUnlikePress: () {
                        context
                            .read<AlbumReactionCubit>()
                            .unlikeAlbum(value.data.id);
                      },
                    ),
                  ),
                ),
              ),
            ),
            BlocBuilder<AlbumInfoCubit, ApiCallState<AlbumInfo>>(
              builder: _buildSongsList,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSongsList(BuildContext context, ApiCallState<AlbumInfo> state) {
    return state.map(
      loading: (_) => const SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: CircularProgressIndicator(),
        ),
      ),
      error: (error) => SliverFillRemaining(
          hasScrollBody: false, child: Center(child: Text(error.message))),
      data: (value) => SliverList(
        delegate: SliverChildBuilderDelegate((context, index) {
          final song = value.data.songs[index];
          return SongRow(song: song);
        }, childCount: value.data.songs.length),
      ),
    );
  }
}
