import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';

class PlayerHeader extends StatelessWidget {
  const PlayerHeader({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Stack(
      fit: StackFit.passthrough,
      alignment: Alignment.center,
      children: [
        const Positioned.fill(
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: Perflow.secondaryGradient
            )
          )
        ),
        SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                children: [
                  const Expanded(
                    flex: 1,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: PerflowBackButton()
                    )
                  ),
                  Expanded(
                    flex: 3,
                    child: Text(
                      'Playing now',
                      style: textTheme.subtitle1,
                      textAlign: TextAlign.center,
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Align(
                      alignment: Alignment.centerRight,
                      child: IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.more_vert)
                      ),
                    ),
                  )
                ],
              ),
              const Expanded(
                child: _PlayerHeaderImage()
              ),
              const Padding(
                padding: EdgeInsets.only(
                  bottom: 12,
                  top: 8
                ),
                child: _PlayerHeaderInfo()
              ),
            ],
          )
        ),
      ],
    );
  }
}

class _PlayerHeaderImage extends StatelessWidget {
  const _PlayerHeaderImage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1,
      child: BlocSelector<PlaybackCubit, PlaybackState, String?>(
        selector: (state) => state.map(
          none: (_) => null,
          playing: (state) => state.data.song.album.iconURL
        ),
        builder: (context, iconUrl) {
          if(iconUrl == null) {
            return ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: Container(
                color: Perflow.surfaceColor,
                alignment: Alignment.center,
                child: const Icon(Icons.all_inclusive),
              ),
            );
          }

          return Container(
            decoration: const BoxDecoration(
              boxShadow: [
                BoxShadow(
                  color: Color(0x3421292D),
                  spreadRadius: 5,
                  blurRadius: 7,
                  offset: Offset(0, 0)
                )
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: Image.network(
                iconUrl,
                fit: BoxFit.cover,
              ),
            ),
          );
        },
      ),
    );
  }
}

class _PlayerHeaderInfo extends StatelessWidget {
  const _PlayerHeaderInfo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocSelector<PlaybackCubit, PlaybackState, Song?>(
      selector: (state) => state.map(
          none: (_) => null,
          playing: (state) => state.data.song
      ),
      builder: (context, song) {
        if(song == null) {
          return const IconButton(
            onPressed: null,
            icon: Icon(Icons.local_fire_department),
          );
        }

        final textTheme = Theme.of(context).textTheme;

        return Row(
          children: [
            const Spacer(flex: 1),
            Expanded(
              flex: 3,
              child: Column(
                children: [
                  Text(
                    song.name,
                    style: textTheme.headline6,
                    textAlign: TextAlign.center,
                  ),
                  Text(
                    (song.artist == null ? song.group!.name : song.artist!.userName) + ' | ' + song.album.name,
                    style: textTheme.caption,
                  )
                ],
              ),
            ),
            Expanded(
              flex: 1,
              child: Align(
                alignment: Alignment.centerRight,
                child: IconButton(
                  onPressed: () {},
                  color: song.isLiked ? Perflow.primaryColor : null,
                  icon: song.isLiked ? const Icon(Icons.favorite) : const Icon(Icons.favorite_border)
                ),
              ),
            )
          ],
        );
      },
    );
  }
}


