import 'package:flutter/material.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/widgets/songs/song_row.dart';

class SearchAlbumsScreen extends StatelessWidget {
  const SearchAlbumsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text("Coming soon..."),
    );
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
