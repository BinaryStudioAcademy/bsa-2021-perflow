import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/search/search_songs_cubit.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/widgets/songs/song_row.dart';

class SearchPlaylistsScreen extends StatelessWidget {
  const SearchPlaylistsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text("Coming soon..."),
    );

    return BlocBuilder<SearchSongsCubit, ApiCallState<List<Song>>>(
        builder: _buildSongsList);
  }

  Widget _buildSongsList(BuildContext context, ApiCallState<List<Song>> state) {
    return state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(child: Text(error.message)),
      data: (value) => ListView.builder(
        itemBuilder: (context, index) {
          return SongRow(song: value.data[index]);
        },
        itemCount: value.data.length,
        shrinkWrap: true,
        physics: const ClampingScrollPhysics(),
      ),
    );
  }
}
