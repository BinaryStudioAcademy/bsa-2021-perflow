import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/services/playback/playback_queue.dart';
import 'package:perflow/theme.dart';

class SongDialog extends StatelessWidget {
  final Song song;

  const SongDialog({
    required this.song,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Material(
      type: MaterialType.transparency,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: EdgeInsets.only(
                  top: RootMediaQuery.value.padding.top + RootMediaQuery.value.size.height * 0.08
                ),
                width: RootMediaQuery.value.size.width * 0.6,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: AspectRatio(
                    aspectRatio: 1,
                    child: Image(
                      image: NetworkImage(getValidUrl(song.album.iconURL)),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                song.name,
                style: textTheme.subtitle1,
              ),
              const SizedBox(height: 4),
              Text(
                song.artist?.userName ?? song.group?.name ?? 'Artist',
                style: textTheme.caption,
              ),
            ],
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _SongDialogAction(
                icon: Icons.add_circle_outline,
                title: const Text('Add to start of queue'),
                onTap: () => getService<PlaybackQueue>().addToStart(song),
              ),
              _SongDialogAction(
                icon: Icons.play_circle_outline,
                title: const Text('Play next'),
                onTap: () => getService<PlaybackQueue>().addNext(song),
              ),
              _SongDialogAction(
                icon: Icons.add_circle_outline,
                title: const Text('Add to end of queue'),
                onTap: () => getService<PlaybackQueue>().addToEnd(song),
              ),
              SizedBox(height: RootMediaQuery.value.size.height * 0.05),
              GestureDetector(
                onTap: () => Navigator.of(context).pop(),
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Text(
                    'Close',
                    style: textTheme.subtitle1,
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  static void show(BuildContext context, Song song) {
    showGeneralDialog(
      barrierDismissible: true,
      barrierLabel: '',
      barrierColor: Colors.black12,
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (ctx, anim1, anim2) => SongDialog(song: song),
      transitionBuilder: (ctx, anim1, anim2, child) => BackdropFilter(
        filter: ImageFilter.blur(
          sigmaX: 12 * anim1.value,
          sigmaY: 12 * anim1.value,
          tileMode: TileMode.clamp
        ),
        child: FadeTransition(
          child: child,
          opacity: anim1,
        ),
      ),
      context: context,
    );
  }
}

class _SongDialogAction extends StatelessWidget {
  final IconData icon;
  final Widget title;
  final void Function()? onTap;

  const _SongDialogAction({
    required this.icon,
    required this.title,
    this.onTap,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return InkWell(
      onTap: onTap ?? () {},
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 12
            ),
            child: Icon(
              icon,
              size: 28,
            ),
          ),
          DefaultTextStyle(
            style: textTheme.subtitle1 ?? Perflow.textTheme.headline1!,
            child: title,
          )
        ],
      ),
    );
  }
}

