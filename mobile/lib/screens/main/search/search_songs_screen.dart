import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/search/search_songs_cubit.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/search/search_text_edit_service.dart';
import 'package:perflow/widgets/songs/song_row.dart';

class SearchSongsScreen extends StatefulWidget {
  const SearchSongsScreen({Key? key}) : super(key: key);

  @override
  _SearchSongsScreenState createState() => _SearchSongsScreenState();
}

class _SearchSongsScreenState extends State<SearchSongsScreen> {
  Function()? onScrollEnd;
  List<Song> songs = <Song>[];
  SearchParams searchParams =
      SearchParams(SearchTextEditService().text ?? '', 1, 12);
  bool isFirstCall = true;
  late final ScrollController _scrollController;

  @override
  void initState() {
    super.initState();

    _scrollController = ScrollController();

    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
              _scrollController.position.maxScrollExtent &&
          onScrollEnd != null) {
        onScrollEnd!.call();
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (isFirstCall) {
      SearchTextEditService().onTextEdit = (String text) {
        setState(
          () {
            searchParams.searchTerm = text;
            searchParams.page = 1;
            songs.clear();
            if (!context.read<SearchSongsCubit>().isLoading) {
              context.read<SearchSongsCubit>().loadInfo(searchParams);
            }
          },
        );
      };

      context.read<SearchSongsCubit>().loadInfo(searchParams);

      isFirstCall = false;
    }

    return BlocListener<SearchSongsCubit, ApiCallState<List<Song>>>(
      listener: (context, state) => _getSongs(context, state),
      child: ListView.builder(
        controller: _scrollController,
        itemCount: songs.length,
        itemBuilder: (context, index) {
          return SongRow(song: songs[index]);
        },
      ),
    );
  }

  void _getSongs(BuildContext context, ApiCallState<List<Song>> state) {
    state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(child: Text(error.message)),
      data: (value) => setState(
        () => {
          songs.addAll(value.data),
          onScrollEnd = () {
            searchParams.page += 1;
            context.read<SearchSongsCubit>().loadInfo(searchParams);
          },
        },
      ),
    );
  }
}
