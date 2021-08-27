import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/artists/liked_artists_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/widgets/artists/artist_row.dart';

class LibraryArtistsScreen extends StatelessWidget {
  const LibraryArtistsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<LikedArtistsCubit>(
          create: (context) => LikedArtistsCubit(),
        ),
      ],
      child: CustomScrollView(
        slivers: [
          const SliverToBoxAdapter(),
          BlocBuilder<LikedArtistsCubit, ApiCallState<List<ArtistSimplified>>>(
              builder: (builder, state) => ArtistsList(context: context, state: state)),
        ],
      ),
    );
  }
}

class ArtistsList extends StatelessWidget {
  const ArtistsList({
    Key? key,
    required this.context,
    required this.state,
  }) : super(key: key);

  final BuildContext context;
  final ApiCallState<List<ArtistSimplified>> state;

  @override
  Widget build(BuildContext context) {
    return state.map(
      loading: (_) => const SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: CircularProgressIndicator(),
        ),
      ),
      error: (error) => SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: Text(error.message),
        ),
      ),
      data: (artists) => SliverList(
        delegate: SliverChildBuilderDelegate((context, index) {
          return ArtistRow(artist: artists.data[index]);
        }, childCount: artists.data.length),
      ),
    );
  }
}