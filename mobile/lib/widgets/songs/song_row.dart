import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/reactions/reaction_state.dart';
import 'package:perflow/cubits/reactions/song_reaction_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/playback/playback_service.dart';
import 'package:perflow/widgets/common/content_row.dart';

class SongRow extends StatelessWidget {
  final Song song;

  const SongRow({required this.song, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<SongReactionCubit>(
      create: (context) => SongReactionCubit(),
      child: BlocBuilder<SongReactionCubit, ReactionState>(
        builder: (context, state) => _buildRow(context, state),
      ),
    );
  }

  ContentRow _buildRow(BuildContext context, ReactionState state) {
    final textTheme = Theme.of(context).textTheme;

    return ContentRow(
      height: 64,
      iconUrl: getValidUrl(song.album.iconURL),
      primaryText: Text(
        song.name,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.subtitle2,
      ),
      secondaryText: Text(
        song.artist == null ? song.group!.name : song.artist!.userName,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.caption,
      ),
      contentType: RowType.album,
      isLikeAvailable: true,
      isLiked: state.maybeMap(
        liked: (_) => true,
        unliked: (_) => false,
        orElse: () => song.isLiked,
      ),
      onTap: () async {
        final playbackService = getService<PlaybackService>();
        await playbackService.setSongById(song.id);
        playbackService.play();
      },
      onLikePressed: () {
        context.read<SongReactionCubit>().likeSong(song.id);
      },
      onUnlikePressed: () {
        context.read<SongReactionCubit>().unlikeSong(song.id);
      },
    );
  }
}
