import 'package:flutter/material.dart';
import 'package:perflow/widgets/artists/artist_list.dart';

class LibraryArtistsScreen extends StatelessWidget {
  const LibraryArtistsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const ArtistsList(isLikedPage: true,);
  }
}
