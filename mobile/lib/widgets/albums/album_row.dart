import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:vrouter/vrouter.dart';

import '../../routes.dart';
import '../../theme.dart';

class AlbumRow extends StatelessWidget {
  static const double height = 80;

  final AlbumSimplified album;

  const AlbumRow({required this.album, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    String? iconUrl = album.iconURL;

    if (iconUrl != null && !iconUrl.startsWith('http')) {
      iconUrl = 'http://bsa2021perflow.blob.core.windows.net/images/$iconUrl';
    }

    return InkWell(
      onTap: () {
        context.vRouter.to(Routes.album(album.id));
      },
      child: SizedBox(
        height: height,
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
                      album.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.subtitle2,
                    ),
                    const Spacer(flex: 1),
                    Text(
                      album.author == null ? 'fff' : album.author!.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.caption,
                    ),
                    const Spacer(flex: 2)
                  ],
                ),
              ),
            ),
            IconButton(
                onPressed: () {},
                iconSize: 18,
                splashRadius: 22,
                color: Perflow.primaryLightColor,
                icon: const Icon(Icons.favorite)),
            IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
          ],
        ),
      ),
    );
  }
}
