import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/cubits/playback/playback_status/playback_status_cubit.dart';
import 'package:perflow/models/playback/playback_time.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/theme.dart';

class Player extends StatelessWidget {
  static const double _playerSize = 64;

  const Player({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<PlaybackCubit, PlaybackState>(
      builder: (context, state) => state.map(
          none: (_) => const SizedBox.shrink(),
          playing: (playingState) => Column(
            children: [
              _buildProgressBar(context, playingState.playbackTimeChanges),
              DecoratedBox(
                decoration: const BoxDecoration(
                  color: Perflow.surfaceColor,
                  boxShadow: [
                    BoxShadow(
                        color: Color.fromARGB(52, 0, 0, 0),
                        spreadRadius: 2,
                        blurRadius: 3,
                        offset: Offset(0, 1)
                    )
                  ]
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    _buildLeading(context, playingState.song),
                    _buildMain(context, playingState.song),
                    _buildActions(context)
                  ],
                )
              ),
            ],
          )
        ),
    );
  }

  Widget _buildProgressBar(BuildContext context, Stream<PlaybackTime> timeStream) {
    return StreamBuilder<PlaybackTime>(
      stream: timeStream,
      builder: (context, snapshot) {
        return LinearProgressIndicator(
          value: snapshot.hasData
            ? snapshot.requireData.current.inMilliseconds / snapshot.requireData.max.inMilliseconds
            : null,
          minHeight: 4,
          color: Perflow.primaryColor,
          backgroundColor: Perflow.primaryColor.withOpacity(0.3),
        );
      }
    );
  }

  Widget _buildLeading(BuildContext context, Song song) {
    return song.album.iconURL != null
      ? Image.network(
        song.album.iconURL!,
        height: _playerSize,
        width: _playerSize,
        fit: BoxFit.cover,
      )
      : Image.asset(
        'assets_song_preview',
        height: _playerSize,
        width: _playerSize,
        fit: BoxFit.cover,
      );
  }

  Widget _buildMain(BuildContext context, Song song) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.only(left: 8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              song.name,
              style: Perflow.textTheme.subtitle1!,
            ),
            const SizedBox(height: 4),
            Text(
              song.artist.userName,
              style: Perflow.textTheme.bodyText2!.apply(color: Perflow.textGrayColor),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActions(BuildContext context) {
    return BlocProvider<PlaybackStatusCubit>(
      create: (context) => PlaybackStatusCubit(),
      child: BlocBuilder<PlaybackStatusCubit, PlaybackStatusState>(
        builder: (context, state) {
          return SizedBox(
            height: _playerSize,
            child: Material(
              type: MaterialType.transparency,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  IconButton(
                    onPressed: state is PlaybackStateNone ? null : () {},
                    icon: const Icon(Icons.skip_previous),
                    visualDensity: VisualDensity.compact,
                  ),
                  state.map(
                    none: (_) => const IconButton(
                      onPressed: null,
                      icon: Icon(Icons.play_arrow),
                      visualDensity: VisualDensity.compact,
                    ),
                    paused: (_) => IconButton(
                      onPressed: () => context.read<PlaybackCubit>().play(),
                      icon: const Icon(Icons.play_arrow),
                      visualDensity: VisualDensity.compact,
                    ),
                    playing: (_) => IconButton(
                      onPressed: () => context.read<PlaybackCubit>().pause(),
                      icon: const Icon(Icons.pause),
                      visualDensity: VisualDensity.compact,
                    ),
                  ),
                  IconButton(
                    onPressed: state is PlaybackStateNone ? null : () {},
                    icon: const Icon(Icons.skip_next),
                    visualDensity: VisualDensity.compact,
                  )
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
