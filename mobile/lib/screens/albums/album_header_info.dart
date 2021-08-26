import 'package:flutter/material.dart';
import 'package:perflow/models/albums/album_info.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_elevated_button.dart';
import 'package:perflow/widgets/buttons/perflow_outlined_button.dart';
import 'package:perflow/helpers/time/time_convert.dart';

class AlbumHeaderInfo extends StatelessWidget {
  final AlbumInfo info;

  const AlbumHeaderInfo({required this.info, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final likeButton = info.isLiked
        ? IconButton(
            visualDensity: VisualDensity.compact,
            onPressed: () {},
            color: Perflow.primaryLightColor,
            icon: const Icon(Icons.favorite))
        : IconButton(
            visualDensity: VisualDensity.compact,
            onPressed: () {},
            icon: const Icon(Icons.favorite_border));

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
                        onPressed: () {}, icon: const Icon(Icons.more_vert))
                  ],
                ),
              )
            ],
          ),
          Row(
            children: [
              GestureDetector(
                onTap: () {},
                child: Center(
                  child: Text(
                    info.artist?.userName ?? info.group?.name ?? '---',
                    style: textTheme.subtitle1,
                  ),
                ),
              ),
              Text(
                ' | ' + info.songs.length.toString() + ' songs',
                style:
                    textTheme.subtitle1?.copyWith(color: Perflow.textGrayColor),
              ),
              Text(
                ' | ' +
                    timeConvert(Duration(
                        seconds: info.songs
                            .map((e) => e.duration)
                            .reduce((value, element) => value + element))),
                style:
                    textTheme.subtitle1?.copyWith(color: Perflow.textGrayColor),
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
                        // onPressed: () => context.read<PlaylistSongsCubit>().play(),
                        onPressed: () {},
                        text: 'Play'),
                  ),
                  Expanded(
                    flex: 2,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: PerflowOutlinedButton.text(
                          onPressed: () {}, text: 'Add songs'),
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
