import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/widgets/common/content_row.dart';
import 'package:vrouter/vrouter.dart';

class AlbumRow extends StatelessWidget {
  final AlbumSimplified album;
  final bool isLiked;

  const AlbumRow({Key? key, required this.album, this.isLiked = false}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return ContentRow(
      height: 80,
      iconUrl: getValidUrl(album.iconURL),
      primaryText: Text(
        album.name,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.subtitle2,
      ),
      secondaryText: Text(
        album.author == null ? album.group!.name : album.author!.name,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.caption,
      ),
      contentType: RowType.album,
      isLikeAvailable: true,
      isLiked: isLiked,
      onTap: () {
        context.vRouter.to(
          Routes.album(album.id),
        );
      },
    );
  }
}
