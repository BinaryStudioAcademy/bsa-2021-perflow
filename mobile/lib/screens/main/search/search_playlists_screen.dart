import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/search/search_playlists_cubit.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/services/search/search_text_edit_service.dart';
import 'package:perflow/widgets/playlists/playlist_row.dart';

class SearchPlaylistsScreen extends StatefulWidget {
  const SearchPlaylistsScreen({Key? key}) : super(key: key);

  @override
  _SearchPlaylistsScreenState createState() => _SearchPlaylistsScreenState();
}

class _SearchPlaylistsScreenState extends State<SearchPlaylistsScreen> {
  Function()? onScrollEnd;
  List<PlaylistSimplified> playlists = <PlaylistSimplified>[];
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
            playlists.clear();
            if (!context.read<SearchPlaylistsCubit>().isLoading) {
              context.read<SearchPlaylistsCubit>().loadInfo(searchParams);
            }
          },
        );
      };

      context.read<SearchPlaylistsCubit>().loadInfo(searchParams);

      isFirstCall = false;
    }

    return BlocListener<SearchPlaylistsCubit,
        ApiCallState<List<PlaylistSimplified>>>(
      listener: (context, state) => _getPlaylists(context, state),
      child: ListView.builder(
        controller: _scrollController,
        itemCount: playlists.length,
        itemBuilder: (context, index) {
          return PlaylistRow(playlist: playlists[index]);
        },
      ),
    );
  }

  void _getPlaylists(
      BuildContext context, ApiCallState<List<PlaylistSimplified>> state) {
    state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(child: Text(error.message)),
      data: (value) => setState(
        () => {
          playlists.addAll(value.data),
          onScrollEnd = () {
            searchParams.page += 1;
            context.read<SearchPlaylistsCubit>().loadInfo(searchParams);
          },
        },
      ),
    );
  }
}
