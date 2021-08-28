import 'package:flutter/material.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/playback/playback_service.dart';
import 'package:perflow/widgets/common/content_row.dart';

class SongRow extends StatelessWidget {
  final Song song;

  const SongRow({required this.song, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return ContentRow(
      height: 64,
      iconUrl: getValidUrl(song.album.iconURL),
      primaryText: Text(
        song.name,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.subtitle2,
      ),
      secondaryText: Text(
        song.artist == null ? song.group!.name : song.artist!.userName,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: textTheme.caption,
      ),
      contentType: RowType.album,
      isLikeAvailable: true,
      onTap: () {
        getService<PlaybackService>().setSongById(song.id);
      },
    );
  }
}
