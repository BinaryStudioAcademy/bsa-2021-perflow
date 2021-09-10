import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/song_recognition/song_recognition_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/services/playback/playback_queue.dart';
import 'package:perflow/services/reactions/song_reactions_api.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';
import 'package:perflow/widgets/buttons/perflow_elevated_button.dart';
import 'package:perflow/widgets/song_dialog/song_dialog.dart';
import 'package:perflow/widgets/songs/song_row.dart';

class SongRecognitionScreen extends StatelessWidget {
  const SongRecognitionScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Perflow.surfaceColor,
        centerTitle: true,
        leading: const PerflowBackButton(),
        title: const Text('Recognize song'),
      ),
      body: BlocProvider<SongRecognitionCubit>(
        create: (_) => SongRecognitionCubit(),
        child: const _SongRecognitionBody(),
      )
    );
  }
}

class _SongRecognitionBody extends StatelessWidget {
  const _SongRecognitionBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final mainButtonSize = RootMediaQuery.value.size.width * 0.6;

    return BlocConsumer<SongRecognitionCubit, SongRecognitionState>(
      listener: (context, state) {
        if(state is SongRecognitionReady && state.lastQuery != null) {
          final song = state.lastQuery!;
          SongDialog.show(
            context,
            song,
            [
              Padding(
                padding: const EdgeInsets.only(
                  bottom: 128,
                  left: 12,
                  right: 12
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Expanded(
                      child: PerflowElevatedButton.text(
                        onPressed: () => getService<PlaybackQueue>().setSong(song),
                        text: 'Play'
                      ),
                    ),
                    IconButton(
                      onPressed: () {},
                      icon: song.isLiked
                        ? const Icon(Icons.favorite)
                        : const Icon(Icons.favorite_border)
                    )
                  ],
                ),
              )
            ]
          );

          return;
        }

        if(_isNotificationState(state)) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              backgroundColor: Perflow.surfaceColor,
              behavior: SnackBarBehavior.floating,
              content: Text(
                "Couldn't process your song. Try again later",
                style: TextStyle(color: Perflow.textColor),
              )
            )
          );
        }
      },
      buildWhen: (previous, current) => !_isNotificationState(current),
      builder: (context, state) => state.maybeMap(
        loading: (_) => const Center(
          child: CircularProgressIndicator(),
        ),

        missingPermissions: (_) => const _GrantPermissionsBody(),

        ready: (state) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _MainButton(
                size: mainButtonSize,
                onTap: () => context.read<SongRecognitionCubit>().startRecognizing(),
                child: const Icon(
                  Icons.local_fire_department,
                  size: 84,
                ),
              ),
              if(state.lastQuery != null)
                _QueryResult(song: state.lastQuery!)
            ],
          ),
        ),

        recording: (_) => Center(
          child: _MainButton(
            size: mainButtonSize,
            child: SizedBox(
              width: mainButtonSize * 0.4,
              height: mainButtonSize * 0.4,
              child: const CircularProgressIndicator(
                strokeWidth: 6,
                color: Colors.white,
              ),
            ),
          ),
        ),

        orElse: () => const Center(
          child: Text('Unexpected error occurred'),
        ),
      ),
    );
  }

  bool _isNotificationState(SongRecognitionState state) {
    return state is SongRecognitionError || state is SongRecognitionFail;
  }
}

class _MainButton extends StatelessWidget {
  final double size;
  final Widget child;
  final void Function()? onTap;

  const _MainButton({
    required this.size,
    required this.child,
    this.onTap,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        height: size,
        width: size,
        child: ClipOval(
          child: DecoratedBox(
            position: DecorationPosition.background,
            decoration: const BoxDecoration(
              gradient: Perflow.primaryGradient,
              shape: BoxShape.circle
            ),
            child: Material(
              type: MaterialType.transparency,
              child: InkWell(
                onTap: onTap,
                child: Center(
                  child: child,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _GrantPermissionsBody extends StatelessWidget {
  const _GrantPermissionsBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            width: RootMediaQuery.value.size.width * 0.7,
            child: Text(
              'Perflow needs some permissions in order for song recognition to work',
              style: Perflow.textTheme.headline6,
              textAlign: TextAlign.center,
            )
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => context.read<SongRecognitionCubit>().askForPermissions(),
            child: const Text('Grant permissions')
          )
        ],
      ),
    );
  }
}

class _QueryResult extends StatelessWidget {
  final Song song;

  const _QueryResult({
    required this.song,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(
        horizontal: 8
      ),
      color: Perflow.surfaceColor,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Align(
            alignment: Alignment.topLeft,
            child: Padding(
              padding: const EdgeInsets.only(
                top: 8,
                left: 10,
                bottom: 8
              ),
              child: Text(
                'Result:',
                style: Perflow.textTheme.subtitle1,
              ),
            ),
          ),
          SongRow(song: song)
        ],
      ),
    );
  }
}


