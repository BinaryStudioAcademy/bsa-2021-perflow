import 'package:flutter/material.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/theme.dart';

class SongRow extends StatelessWidget {
  static const double height = 64;

  final Song song;

  const SongRow({
    required this.song,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final image = song.album.iconURL != null
      ? Image.network(
        song.album.iconURL!,
        fit: BoxFit.cover,
        width: height,
        height: height,
      )
      : const SizedBox(
        height: height,
        width: height,
        child: Icon(Icons.all_inclusive),
      );

    return InkWell(
      onTap: () => context.read<PlaybackCubit>().setById(song.id),
      child: SizedBox(
        height: height,
        child: Row(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 4
              ),
              child: AspectRatio(
                aspectRatio: 1,
                child: image
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: 2),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Spacer(flex: 2),
                    Text(
                      song.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.subtitle2,
                    ),
                    const Spacer(flex: 1),
                    Text(
                      song.artist.userName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.caption,
                    ),
                    const Spacer(flex: 2)
                  ],
                ),
              )
            ),
            if(song.isLiked)
              IconButton(
                onPressed: () {},
                iconSize: 18,
                splashRadius: 22,
                color: Perflow.primaryLightColor,
                icon: const Icon(Icons.favorite)
              ),
            IconButton(
              onPressed: () {},
              icon: const Icon(Icons.more_vert)
            )
          ],
        ),
      ),
    );
  }
}
