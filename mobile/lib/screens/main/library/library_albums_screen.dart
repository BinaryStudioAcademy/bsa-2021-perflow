import 'package:flutter/material.dart';
import 'package:perflow/widgets/albums/album_list.dart';

class LibraryAlbumsScreen extends StatelessWidget {
  const LibraryAlbumsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const AlbumsList(isLikedPage: true,);
  }
}
