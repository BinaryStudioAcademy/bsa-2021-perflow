import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/songs/liked_songs_cubit.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/widgets/songs/song_row.dart';

class LibrarySongsScreen extends StatelessWidget {
  const LibrarySongsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<LikedSongsCubit>(
      create: (context) => LikedSongsCubit(),
      child: BlocBuilder<LikedSongsCubit, ApiCallState<List<Song>>>(
        builder: _buildSongsList,
      ),
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
