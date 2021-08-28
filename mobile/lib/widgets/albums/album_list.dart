import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/albums/liked_albums_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/widgets/albums/album_row.dart';

class AlbumsList extends StatelessWidget {
  const AlbumsList({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LikedAlbumsCubit, ApiCallState<List<AlbumSimplified>>>(
      builder: (builder, state) => state.map(
        loading: (_) => const Center(
          child: CircularProgressIndicator(),
        ),
        error: (error) => Center(
          child: Text(error.message),
        ),
        data: (albums) => ListView.builder(
          itemBuilder: (context, index) {
            //return AlbumRow(album: albums.data[index]);
            return AlbumRow(album: albums.data[index]);
          },
          itemCount: albums.data.length,
          shrinkWrap: true,
          physics: const ClampingScrollPhysics(),
        ),
      ),
    );
  }
}
