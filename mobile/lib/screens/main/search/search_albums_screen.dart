import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/search/search_albums_cubit.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/services/search/search_text_edit_service.dart';
import 'package:perflow/widgets/albums/album_row.dart';

class SearchAlbumsScreen extends StatefulWidget {
  const SearchAlbumsScreen({Key? key}) : super(key: key);

  @override
  _SearchAlbumsScreenState createState() => _SearchAlbumsScreenState();
}

class _SearchAlbumsScreenState extends State<SearchAlbumsScreen> {
  Function()? onScrollEnd;
  List<AlbumSimplified> albums = <AlbumSimplified>[];
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
            albums.clear();
            if (!context.read<SearchAlbumsCubit>().isLoading) {
              context.read<SearchAlbumsCubit>().loadInfo(searchParams);
            }
          },
        );
      };

      context.read<SearchAlbumsCubit>().loadInfo(searchParams);

      isFirstCall = false;
    }

    return BlocListener<SearchAlbumsCubit, ApiCallState<List<AlbumSimplified>>>(
      listener: (context, state) => _getAlbums(context, state),
      child: ListView.builder(
        controller: _scrollController,
        itemCount: albums.length,
        itemBuilder: (context, index) {
          return AlbumRow(album: albums[index]);
        },
      ),
    );
  }

  void _getAlbums(
      BuildContext context, ApiCallState<List<AlbumSimplified>> state) {
    state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(child: Text(error.message)),
      data: (value) => setState(
        () => {
          albums.addAll(value.data),
          onScrollEnd = () {
            searchParams.page += 1;
            context.read<SearchAlbumsCubit>().loadInfo(searchParams);
          },
        },
      ),
    );
  }
}
