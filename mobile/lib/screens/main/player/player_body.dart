import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/helpers/math/clamp.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/playback/playback_repeat_mode.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/main/player/player_functions_mixin.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

class PlayerBody extends StatelessWidget {
  const PlayerBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        const SizedBox(height: 4),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const IconButton(
                iconSize: 26,
                onPressed: null,
                icon: Icon(Icons.devices),
              ),
              IconButton(
                iconSize: 26,
                onPressed: () => context.vRouter.to(Routes.queue),
                icon: const Icon(Icons.playlist_play),
              ),
            ],
          ),
        ),
        const _PlayerProgressBar(),
        const _PlayerActionButtons(),
        const SizedBox(height: 4)
      ],
    );
  }
}

class _PlayerProgressBar extends StatefulWidget {
  const _PlayerProgressBar({Key? key}) : super(key: key);

  @override
  _PlayerProgressBarState createState() => _PlayerProgressBarState();
}

class _PlayerProgressBarState extends State<_PlayerProgressBar> {
  late double? dragValue;

  @override
  void initState() {
    super.initState();
    dragValue = null;
  }

  @override
  Widget build(BuildContext context) {
    return BlocSelector<PlaybackCubit, PlaybackState, PlaybackDuration?>(
      selector: (state) => state.map(
          none: (_) => null,
          playing: (state) => state.data.duration
      ),
      builder: (context, duration) {
        if(duration == null) {
          return const _PlayerLoadingProgressbar();
        }

        return StreamBuilder<Duration>(
          initialData: duration.timeChanges.valueOrNull ?? Duration.zero,
          stream: duration.timeChanges,
          builder: (context, snapshot) {
            return _PlayerProgressBarValue(
              onChange: _onDrag,
              onChangeEnd: _onDragEnd,
              currentValue: dragValue == null
                ? snapshot.requireData
                : duration.max * (dragValue ?? 0),
              maxValue: duration.max,
            );
          }
        );
      },
    );
  }

  void _onDrag(double value) {
    setState(() {
      dragValue = value;
    });
  }

  void _onDragEnd(double value) async {
    await getService<PlaybackHandler>().seekPercent(value);
    setState(() {
      dragValue = null;
    });
  }
}

class _PlayerProgressBarValue extends StatelessWidget {
  final Duration currentValue;
  final Duration maxValue;
  final FocusNode? focusNode;
  final void Function(double value)? onChange;
  final void Function(double value)? onChangeStart;
  final void Function(double value)? onChangeEnd;

  const _PlayerProgressBarValue({
    required this.currentValue,
    required this.maxValue,
    this.onChange,
    this.focusNode,
    this.onChangeStart,
    this.onChangeEnd,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Stack(
      children: [
        Slider(
          activeColor: Perflow.primaryColor,
          inactiveColor: Perflow.primaryColor.withOpacity(0.3),
          value: clamp(currentValue.inMilliseconds / max(maxValue.inMilliseconds, 1)),
          onChangeStart: onChangeStart,
          onChangeEnd: onChangeEnd,
          onChanged: onChange ?? (_) {},
          focusNode: focusNode,
          autofocus: true,
        ),
        Positioned(
          top: 32,
          left: 24,
          child: Text(
            _durationToText(currentValue),
            style: textTheme.caption,
          )
        ),
        Positioned(
          top: 32,
          right: 24,
          child: Text(
            _durationToText(maxValue),
            style: textTheme.caption,
          )
        )
      ],
    );
  }

  String _durationToText(Duration duration) {
    return '${(duration.inSeconds / 60).floor()}:${(duration.inSeconds % 60).toString().padLeft(2, '0')}';
  }
}


class _PlayerLoadingProgressbar extends StatelessWidget {
  const _PlayerLoadingProgressbar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return SizedBox(
      height: 48,
      child: Stack(
        children: [
          const Padding(
            padding: EdgeInsets.all(16),
            child: LinearProgressIndicator(
              color: Perflow.primaryColor,
            ),
          ),
          Positioned(
            top: 32,
            left: 24,
            child: Text(
              '0:00',
              style: textTheme.caption,
            )
          ),
          Positioned(
            top: 32,
            right: 24,
            child: Text(
              '0:00',
              style: textTheme.caption,
            )
          )
        ],
      ),
    );
  }
}


class _PlayerActionButtons extends StatelessWidget with PlayerFunctionsMixin {
  const _PlayerActionButtons({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocSelector<PlaybackCubit, PlaybackState, PlaybackActions?>(
      selector: (state) => state.map(
        none: (_) => null,
        playing: (state) => state.data.actions
      ),
      builder: (context, actions) {
        if(actions == null) {
          return const IconButton(
            iconSize: 36,
            onPressed: null,
            icon: Icon(Icons.play_arrow),
          );
        }

        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              color: actions.shuffleEnabled ? Perflow.primaryLightColor : null,
              onPressed: () => updateShuffle(actions),
              icon: const Icon(Icons.shuffle),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  iconSize: 36,
                  onPressed: skipToPrevious,
                  icon: const Icon(Icons.skip_previous),
                ),
                IconButton(
                  iconSize: 36,
                  onPressed: () => setPlaying(!actions.playing),
                  icon: actions.playing ? const Icon(Icons.pause) : const Icon(Icons.play_arrow),
                ),
                IconButton(
                  iconSize: 36,
                  onPressed: skipToNext,
                  icon: const Icon(Icons.skip_next),
                ),
              ],
            ),
            IconButton(
              color: actions.repeatMode == RepeatMode.none ? null : Perflow.primaryLightColor,
              onPressed: () => updateRepeat(actions),
              icon: Icon(actions.repeatMode == RepeatMode.item ? Icons.repeat_one : Icons.repeat),
            ),
          ],
        );
      },
    );
  }
}

