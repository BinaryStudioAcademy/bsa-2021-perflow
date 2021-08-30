import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/artists/artist_albums_cubit.dart';
import 'package:perflow/cubits/artists/artist_info_cubit.dart';
import 'package:perflow/cubits/artists/artist_songs_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/reactions/artist_reaction_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/albums/album_by_artist.dart';
import 'package:perflow/models/artists/artist_info.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/models/songs/artist_song.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/details/default_sliver_bar.dart';
import 'package:perflow/screens/details/header.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/widgets/common/content_row.dart';
import 'package:perflow/widgets/songs/song_row.dart';
import 'package:vrouter/vrouter.dart';

class ArtistScreen extends StatelessWidget {
  final int artistId;

  const ArtistScreen({required this.artistId, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final headerExpandedHeight = MediaQuery.of(context).size.height * 0.6;
    final textTheme = Theme.of(context).textTheme;
    final _authService = getService<AuthService>();

    return Scaffold(
      body: MultiBlocProvider(
        providers: [
          BlocProvider<ArtistInfoCubit>(
            create: (context) => ArtistInfoCubit(artistId),
          ),
          BlocProvider<ArtistSongsCubit>(
            create: (context) => ArtistSongsCubit(artistId),
          ),
          BlocProvider<ArtistAlbumsCubit>(
            create: (context) => ArtistAlbumsCubit(artistId),
          ),
          BlocProvider<ArtistReactionCubit>(
            create: (context) => ArtistReactionCubit(),
          ),
        ],
        child: CustomScrollView(
          slivers: [
            const SliverToBoxAdapter(),
            BlocBuilder<ArtistInfoCubit, ApiCallState<ArtistInfo>>(
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
                    BlocBuilder<ArtistReactionCubit, ArtistReactionState>(
                  builder: (context, state) => SliverPersistentHeader(
                    pinned: true,
                    delegate: HeaderDelegate(
                      expandedHeight: headerExpandedHeight,
                      iconUrl: getValidUrl(value.data.iconURL),
                      primaryText: Text(
                        value.data.userName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.headline5,
                      ),
                      secondaryTextMain: Text(
                        'Artist',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: textTheme.subtitle1,
                      ),
                      isLikeAvailable:
                          (value.data.id != _authService.currentAuthState!.id),
                      isLiked: state.maybeMap(
                        initial: (_) => value.data.isLiked,
                        liked: (_) => true,
                        unliked: (_) => false,
                        orElse: () => value.data.isLiked,
                      ),
                      onLikePress: () {
                        context
                            .read<ArtistReactionCubit>()
                            .likeArtist(value.data.id);
                      },
                      onUnlikePress: () {
                        context
                            .read<ArtistReactionCubit>()
                            .unlikeArtist(value.data.id);
                      },
                    ),
                  ),
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.only(top: 10, bottom: 5, left: 10),
                child: Text(
                  "Top songs",
                  style: textTheme.headline6,
                ),
              ),
            ),
            BlocBuilder<ArtistSongsCubit, ApiCallState<List<ArtistSong>>>(
              builder: _buildSongsList,
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.only(top: 10, bottom: 5, left: 10),
                child: Text(
                  "Albums",
                  style: textTheme.headline6,
                ),
              ),
            ),
            BlocBuilder<ArtistAlbumsCubit, ApiCallState<List<AlbumByArtist>>>(
              builder: _buildArtistAlbums,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildArtistAlbums(
      BuildContext context, ApiCallState<List<AlbumByArtist>> state) {
    final textTheme = Theme.of(context).textTheme;
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
          return ContentRow(
              contentType: RowType.album,
              iconUrl: getValidUrl(value.data[index].iconURL),
              primaryText: Text(
                value.data[index].name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: textTheme.subtitle2,
              ),
              secondaryText: Text(
                value.data[index].authorName,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: textTheme.caption,
              ),
              onTap: () {
                context.vRouter.to(
                  Routes.album(value.data[index].id),
                );
              });
        }, childCount: value.data.length),
      ),
    );
  }

  Widget _buildSongsList(
      BuildContext context, ApiCallState<List<ArtistSong>> state) {
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
      data: (value) => SliverList(
        delegate: SliverChildBuilderDelegate((context, index) {
          final song = value.data[index];
          return SongRow(song: song);
        }, childCount: value.data.length),
      ),
    );
  }
}
