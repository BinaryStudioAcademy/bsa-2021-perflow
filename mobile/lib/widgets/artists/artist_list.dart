import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/artists/liked_artists_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/widgets/artists/artist_row.dart';

class ArtistsList extends StatelessWidget {
  const ArtistsList({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LikedArtistsCubit, ApiCallState<List<ArtistSimplified>>>(
      builder: (builder, state) => state.map(
        loading: (_) => const Center(
          child: CircularProgressIndicator(),
        ),
        error: (error) => Center(
          child: Text(error.message),
        ),
        data: (artists) => ListView.builder(
          itemBuilder: (context, index) {
            return ArtistRow(artist: artists.data[index]);
          },
          itemCount: artists.data.length,
          shrinkWrap: true,
          physics: const ClampingScrollPhysics(),
        ),
      ),
    );
  }
}
