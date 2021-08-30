import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/playlists/liked_playlists_cubit.dart';
import 'package:perflow/cubits/playlists/users_playlists_cubit.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/widgets/albums/album_list.dart';
import 'package:perflow/widgets/artists/artist_list.dart';
import 'package:perflow/widgets/common/content_row.dart';
import 'package:vrouter/vrouter.dart';

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
        const AlbumsList(isLikedPage: true,),
        const ArtistsList(isLikedPage: true,),
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
    final textTheme = Theme.of(context).textTheme;

    return state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(
        child: Text(error.message),
      ),
      data: (playlists) => ListView.builder(
        itemBuilder: (context, index) {
          return ContentRow(
            contentType: RowType.playlist,
            iconUrl: getValidUrl(playlists.data[index].iconURL),
            primaryText: Text(
              playlists.data[index].name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: textTheme.subtitle2,
            ),
            secondaryText: Text(
              "Playlist",
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: textTheme.caption,
            ),
            height: 80,
            isLikeAvailable: !isUsersPlaylist,
            isLiked: true,
            onTap: () {
                context.vRouter.to(
                  Routes.playlist(playlists.data[index].id),
                );
              },
          );
        },
        itemCount: playlists.data.length,
        shrinkWrap: true,
        physics: const ClampingScrollPhysics(),
      ),
    );
  }
}
