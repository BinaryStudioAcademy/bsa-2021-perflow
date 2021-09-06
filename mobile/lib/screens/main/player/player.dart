import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/main/player/player_functions_mixin.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

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
            const _PlayerProgressBar(),
            GestureDetector(
              onTap: () => context.vRouter.to(Routes.player),
              child: DecoratedBox(
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
                  children: const [
                    _PlayerImage(size: _playerSize),
                    _PlayerMain(),
                    _PlayerActions(size: _playerSize)
                  ],
                )
              ),
            ),
          ],
        )
      ),
    );
  }
}

class _PlayerImage extends StatelessWidget {
  final double size;

  const _PlayerImage({
    required this.size,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocSelector<PlaybackCubit, PlaybackState, String?>(
      selector: (state) => state.map(
          none: (_) => null,
          playing: (state) => state.data.song.album.iconURL
      ),
      builder: (context, imageUrl) {
        if(imageUrl == null) {
          return Container(
            width: size,
            height: size,
            alignment: Alignment.center,
            child: const Icon(Icons.all_inclusive),
          );
        }

        return Image.network(
          imageUrl,
          height: size,
          width: size,
          fit: BoxFit.cover,
        );
      },
    );
  }
}

class _PlayerMain extends StatelessWidget {
  const _PlayerMain({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.only(left: 8),
        child: BlocSelector<PlaybackCubit, PlaybackState, Song?>(
          selector: (state) => state.map(
              none: (_) => null,
              playing: (state) => state.data.song
          ),
          builder: (context, song) {
            if(song == null) {
              return const Text('Perflow');
            }

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  song.name,
                  style: Perflow.textTheme.subtitle1!,
                ),
                const SizedBox(height: 4),
                Text(
                  (song.artist == null ? song.group!.name : song.artist!.userName),
                  style: Perflow.textTheme.bodyText2!.apply(color: Perflow.textGrayColor),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}


class _PlayerProgressBar extends StatelessWidget {
  const _PlayerProgressBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocSelector<PlaybackCubit, PlaybackState, PlaybackDuration?>(
      selector: (state) => state.map(
        none: (_) => null,
        playing: (state) => state.data.duration
      ),
      builder: (context, duration) {
        if(duration == null) {
          return LinearProgressIndicator(
            minHeight: 4,
            color: Perflow.primaryColor,
            backgroundColor: Perflow.primaryColor.withOpacity(0.3),
          );
        }

        return StreamBuilder<Duration>(
          initialData: duration.timeChanges.valueOrNull ?? Duration.zero,
          stream: duration.timeChanges,
          builder: (context, snapshot) {
            return LinearProgressIndicator(
              value: snapshot.requireData.inMilliseconds / max(duration.max.inMilliseconds, 1),
              minHeight: 4,
              color: Perflow.primaryColor,
              backgroundColor: Perflow.primaryColor.withOpacity(0.3),
            );
          }
        );
      },
    );
  }
}

class _PlayerActions extends StatelessWidget with PlayerFunctionsMixin {
  final double size;

  const _PlayerActions({
    required this.size,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: size,
      child: Material(
        type: MaterialType.transparency,
        child: BlocSelector<PlaybackCubit, PlaybackState, PlaybackActions?>(
          selector: (state) => state.map(
            none: (_) => null,
            playing: (state) => state.data.actions
          ),
          builder: (context, actions) {
            return Material(
              type: MaterialType.transparency,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  IconButton(
                    onPressed: actions == null ? null : skipToPrevious,
                    icon: const Icon(Icons.skip_previous),
                    visualDensity: VisualDensity.compact,
                  ),
                  IconButton(
                    onPressed: actions == null ? null : () => setPlaying(!actions.playing),
                    icon: Icon(actions?.playing == true ? Icons.pause : Icons.play_arrow)
                  ),
                  IconButton(
                    onPressed: actions == null ? null : skipToNext,
                    icon: const Icon(Icons.skip_next),
                    visualDensity: VisualDensity.compact,
                  )
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}

