import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/search/search_common_cubit.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/search/search_text_edit_service.dart';
import 'package:perflow/widgets/albums/album_row.dart';
import 'package:perflow/widgets/artists/artist_row.dart';
import 'package:perflow/widgets/songs/song_row.dart';
import 'package:perflow/widgets/playlists/playlist_row.dart';

class SearchCommonScreen<CubitType extends SearchCommonCubit<EntityType>,
    EntityType> extends StatefulWidget {
  const SearchCommonScreen({Key? key}) : super(key: key);

  @override
  _SearchAlbumsScreenState createState() =>
      _SearchAlbumsScreenState<CubitType, EntityType>();
}

class _SearchAlbumsScreenState<CubitType extends SearchCommonCubit<EntityType>,
    EntityType> extends State<SearchCommonScreen> {
  Function()? onScrollEnd;
  List<dynamic> entities = <dynamic>[];
  SearchParams searchParams = SearchParams(
      GetIt.instance.get<SearchTextEditService>().text ?? '', 1, 12);
  late final ScrollController _scrollController;

  @override
  void initState() {
    super.initState();

    initTextEdit();

    _scrollController = ScrollController();

    _scrollController.addListener(() {
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        onScrollEnd?.call();
      }
    });
  }

  void initTextEdit() {
    GetIt.instance.get<SearchTextEditService>().onTextEdit = (String text) {
      setState(
        () {
          searchParams.searchTerm = text;
          searchParams.page = 1;
          entities.clear();
          if (!context.read<CubitType>().isLoading) {
            context.read<CubitType>().loadInfo(searchParams);
          }
        },
      );
    };

    context.read<CubitType>().loadInfo(searchParams);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<CubitType, ApiCallState<List<EntityType>>>(
      listener: (context, state) => _getAlbums(context, state),
      child: ListView.builder(
        controller: _scrollController,
        itemCount: entities.length,
        itemBuilder: (context, index) {
          switch (EntityType) {
            case Song:
              return SongRow(song: entities[index]);
            case AlbumSimplified:
              return AlbumRow(album: entities[index]);
            case ArtistSimplified:
              return ArtistRow(artist: entities[index]);
            case PlaylistSimplified:
              return PlaylistRow(playlist: entities[index]);
            default:
              return const SizedBox();
          }
        },
      ),
    );
  }

  void _getAlbums(BuildContext context, ApiCallState<List<EntityType>> state) {
    if (state is ApiCallStateData<List<EntityType>>) {
      setState(
        () => {
          entities.addAll(state.data),
          onScrollEnd = () {
            searchParams.page += 1;
            context.read<CubitType>().loadInfo(searchParams);
          },
        },
      );
    }
  }
}
