import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/widgets/common/content_row.dart';
import 'package:vrouter/vrouter.dart';

class ArtistRow extends StatelessWidget {
  final ArtistSimplified artist;
  final bool isLiked;

  const ArtistRow({Key? key, required this.artist, this.isLiked = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return ContentRow(
      height: 80,
      iconUrl: getValidUrl(artist.iconURL),
      primaryText: Text(
        artist.userName,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.subtitle2,
      ),
      contentType: RowType.artist,
      isLikeAvailable: true,
      isLiked: isLiked,
      onTap: () {
        context.vRouter.to(
          Routes.artist(artist.id),
        );
      },
    );
  }
}
