import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/widgets/common/content_row.dart';
import 'package:vrouter/vrouter.dart';

class PlaylistRow extends StatelessWidget {
  final PlaylistSimplified playlist;

  const PlaylistRow({Key? key, required this.playlist}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return ContentRow(
      contentType: RowType.playlist,
      iconUrl: getValidUrl(playlist.iconURL),
      primaryText: Text(
        playlist.name,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.subtitle2,
      ),
      secondaryText: Text(
        "Playlist",
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.caption,
      ),
      height: 80,
      isLikeAvailable: false,
      onTap: () {
        context.vRouter.to(
          Routes.playlist(playlist.id),
        );
      },
    );
  }
}
