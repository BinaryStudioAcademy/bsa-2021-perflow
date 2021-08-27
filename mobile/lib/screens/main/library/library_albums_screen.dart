import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/albums/liked_albums_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/widgets/albums/album_row.dart';

class LibraryAlbumsScreen extends StatelessWidget {
  const LibraryAlbumsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<LikedAlbumsCubit>(
          create: (context) => LikedAlbumsCubit(),
        ),
      ],
      child: CustomScrollView(
        slivers: [
          const SliverToBoxAdapter(),
          BlocBuilder<LikedAlbumsCubit, ApiCallState<List<AlbumSimplified>>>(
              builder: (builder, state) =>
                  AlbumsList(context: context, state: state)),
        ],
      ),
    );
  }
}

class AlbumsList extends StatelessWidget {
  const AlbumsList({
    Key? key,
    required this.context,
    required this.state,
  }) : super(key: key);

  final BuildContext context;
  final ApiCallState<List<AlbumSimplified>> state;

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
      data: (albums) => SliverList(
        delegate: SliverChildBuilderDelegate((context, index) {
          return AlbumRow(album: albums.data[index]);
        }, childCount: albums.data.length),
      ),
    );
  }
}
