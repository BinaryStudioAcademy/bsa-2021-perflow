import 'package:flutter/material.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/playback/playback_service.dart';
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

    String? iconUrl = song.album.iconURL;

    if(iconUrl != null && !iconUrl.startsWith('http')) {
      iconUrl = 'http://bsa2021perflow.blob.core.windows.net/images/$iconUrl';
    }

    return InkWell(
      onTap: () => getService<PlaybackService>().setSongById(song.id),
      child: SizedBox(
        height: height,
        child: Row(
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if(iconUrl != null)
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 4
                ),
                child: AspectRatio(
                  aspectRatio: 1,
                  child: Image.network(
                    iconUrl,
                    fit: BoxFit.cover,
                    width: height,
                    height: height,
                  )
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
