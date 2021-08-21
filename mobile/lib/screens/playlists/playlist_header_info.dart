import 'package:flutter/material.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_elevated_button.dart';
import 'package:perflow/widgets/buttons/perflow_outlined_button.dart';

class PlaylistHeaderInfo extends StatelessWidget {
  final PlaylistInfo info;

  const PlaylistHeaderInfo({
    required this.info,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final likeButton = info.isLiked
      ? IconButton(
        visualDensity: VisualDensity.compact,
        onPressed: () {},
        color: Perflow.primaryLightColor,
        icon: const Icon(Icons.favorite)
      )
      : IconButton(
        visualDensity: VisualDensity.compact,
        onPressed: () {},
        icon: const Icon(Icons.favorite_border)
      );

    return Padding(
      padding: const EdgeInsets.only(left: 12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                info.name,
                style: textTheme.headline5,
              ),
              Padding(
                padding: const EdgeInsets.only(right: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    likeButton,
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.more_vert)
                    )
                  ],
                ),
              )
            ],
          ),
          Row(
            children: [
              GestureDetector(
                onTap: () => print('author tap'),
                child: Center(
                  child: Text(
                    info.author.userName,
                    style: textTheme.subtitle1,
                  ),
                ),
              ),
              Text(
                ' | 10 songs',
                style: textTheme.subtitle1?.copyWith(color: Perflow.textGrayColor),
              ),
              Text(
                ' | 30 min',
                style: textTheme.subtitle1?.copyWith(color: Perflow.textGrayColor),
              )
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(top: 12),
            child: SizedBox(
              height: 42,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Expanded(
                    flex: 1,
                    child: PerflowElevatedButton.text(
                      onPressed: () {},
                      text: 'Play'
                    ),
                  ),
                  Expanded(
                    flex: 2,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: PerflowOutlinedButton.text(
                        onPressed: () {},
                        text: 'Add songs'
                      ),
                    ),
                  ),
                  const Spacer(
                    flex: 2,
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
