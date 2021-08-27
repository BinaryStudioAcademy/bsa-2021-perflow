import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:vrouter/vrouter.dart';

import '../../routes.dart';
import '../../theme.dart';

class ArtistRow extends StatelessWidget {
  static const double height = 80;

  final ArtistSimplified artist;

  const ArtistRow({required this.artist, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    String? iconUrl = artist.iconURL;

    if (iconUrl != null && !iconUrl.startsWith('http')) {
      iconUrl = 'http://bsa2021perflow.blob.core.windows.net/images/$iconUrl';
    }

    return InkWell(
      onTap: () {
        context.vRouter.to(Routes.artist(artist.id));
      },
      child: SizedBox(
        height: height,
        width: height,
        child: Row(
          children: [
            if (iconUrl != null)
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                child: CircleAvatar(
                  radius: height/2,
                  backgroundImage: NetworkImage(
                    iconUrl,
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
                      artist.userName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.subtitle2,
                    ),
                    const Spacer(flex: 1),
                    Text(
                      'Artist',
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
