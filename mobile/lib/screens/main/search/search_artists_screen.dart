import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/search/search_artists_cubit.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/services/search/search_text_edit_service.dart';
import 'package:perflow/widgets/artists/artist_row.dart';

class SearchArtistsScreen extends StatefulWidget {
  const SearchArtistsScreen({Key? key}) : super(key: key);

  @override
  _SearchArtistsScreenState createState() => _SearchArtistsScreenState();
}

class _SearchArtistsScreenState extends State<SearchArtistsScreen> {
  Function()? onScrollEnd;
  List<ArtistSimplified> artists = <ArtistSimplified>[];
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
            artists.clear();
            if (!context.read<SearchArtistsCubit>().isLoading) {
              context.read<SearchArtistsCubit>().loadInfo(searchParams);
            }
          },
        );
      };

      context.read<SearchArtistsCubit>().loadInfo(searchParams);

      isFirstCall = false;
    }

    return BlocListener<SearchArtistsCubit,
        ApiCallState<List<ArtistSimplified>>>(
      listener: (context, state) => _getArtists(context, state),
      child: ListView.builder(
        controller: _scrollController,
        itemCount: artists.length,
        itemBuilder: (context, index) {
          return ArtistRow(artist: artists[index]);
        },
      ),
    );
  }

  void _getArtists(
      BuildContext context, ApiCallState<List<ArtistSimplified>> state) {
    state.map(
      loading: (_) => const Center(
        child: CircularProgressIndicator(),
      ),
      error: (error) => Center(child: Text(error.message)),
      data: (value) => setState(
        () => {
          artists.addAll(value.data),
          onScrollEnd = () {
            searchParams.page += 1;
            context.read<SearchArtistsCubit>().loadInfo(searchParams);
          },
        },
      ),
    );
  }
}
