import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:vrouter/vrouter.dart';

import '../../routes.dart';
import '../../theme.dart';

class PlaylistRow extends StatelessWidget {
  static const double height = 80;

  final PlaylistSimplified playlist;
  final bool isUsers;

  const PlaylistRow({required this.playlist, required this.isUsers, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    String? iconUrl = playlist.iconURL;

    if (iconUrl != null &&
        !iconUrl.startsWith('http') &&
        !iconUrl.startsWith('.')) {
      iconUrl = 'http://bsa2021perflow.blob.core.windows.net/images/$iconUrl';
    }

    if (iconUrl != null && iconUrl.startsWith('.')) {
      iconUrl =
          'https://perflow.westeurope.cloudapp.azure.com/assets/images/playlist_default.jpg';
    }

    return InkWell(
      onTap: () {
        context.vRouter.to(Routes.playlist(playlist.id));
      },
      child: SizedBox(
        height: height,
        width: height,
        child: Row(
          children: [
            if (iconUrl != null)
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                child: AspectRatio(
                  aspectRatio: 1,
                  child: Image.network(
                    iconUrl,
                    fit: BoxFit.cover,
                    width: height,
                    height: height,
                  ),
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
                      playlist.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.subtitle2,
                    ),
                    const Spacer(flex: 1),
                    Text(
                      'Playlist',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.caption,
                    ),
                    const Spacer(flex: 2)
                  ],
                ),
              ),
            ),
            if (!isUsers)
              IconButton(
                onPressed: () {},
                iconSize: 18,
                splashRadius: 22,
                color: Perflow.primaryLightColor,
                icon: const Icon(Icons.favorite),
              ),
            IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
          ],
        ),
      ),
    );
  }
}
