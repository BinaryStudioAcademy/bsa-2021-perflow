import 'package:flutter/material.dart';
import 'package:perflow/models/common/content_info.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_elevated_button.dart';
import 'package:perflow/widgets/buttons/perflow_outlined_button.dart';
import 'package:perflow/helpers/time/time_convert.dart';

class HeaderInfo extends StatelessWidget {
  final ContentInfo info;

  const HeaderInfo({required this.info, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final likeButton = info.isLiked
        ? IconButton(
            visualDensity: VisualDensity.compact,
            onPressed: () {},
            color: Perflow.primaryLightColor,
            icon: const Icon(Icons.favorite),
          )
        : IconButton(
            visualDensity: VisualDensity.compact,
            onPressed: () {},
            icon: const Icon(Icons.favorite_border),
          );

    return Info(info: info, textTheme: textTheme, likeButton: likeButton);
  }
}

class Info extends StatelessWidget {
  const Info({
    Key? key,
    required this.info,
    required this.textTheme,
    required this.likeButton,
  }) : super(key: key);

  final ContentInfo info;
  final TextTheme textTheme;
  final IconButton likeButton;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  info.name,
                  style: textTheme.headline5,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(right: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    likeButton,
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.more_vert),
                    )
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
                    info.author,
                    style: textTheme.subtitle1,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              Text(
                ' | ' + info.songsCount.toString() + ' songs',
                style:
                    textTheme.subtitle1?.copyWith(color: Perflow.textGrayColor),
              ),
              Text(
                ' | ' +
                    timeConvert(
                      info.duration,
                    ),
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
                      text: 'Play',
                    ),
                  ),
                  Expanded(
                    flex: 2,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: PerflowOutlinedButton.text(
                        onPressed: () {},
                        text: 'Add songs',
                        color: Perflow.textColor,
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
