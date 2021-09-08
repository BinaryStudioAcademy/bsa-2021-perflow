import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:perflow/cubits/search/search_albums_cubit.dart';
import 'package:perflow/cubits/search/search_artists_cubit.dart';
import 'package:perflow/cubits/search/search_playlists_cubit.dart';
import 'package:perflow/cubits/search/search_songs_cubit.dart';
import 'package:perflow/cubits/search_navigation/search_navigation_cubit.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/services/search/search_text_edit_service.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

class SearchScreen extends StatelessWidget {
  final Widget child;
  const SearchScreen({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<SearchSongsCubit>(
          create: (context) => SearchSongsCubit(),
        ),
        BlocProvider<SearchAlbumsCubit>(
          create: (context) => SearchAlbumsCubit(),
        ),
        BlocProvider<SearchArtistsCubit>(
          create: (context) => SearchArtistsCubit(),
        ),
        BlocProvider<SearchPlaylistsCubit>(
          create: (context) => SearchPlaylistsCubit(),
        ),
      ],
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: searchBar(context),
          backgroundColor: Perflow.surfaceColor,
        ),
        body: SafeArea(
          child: Column(
            children: [
              _topNavmenu(),
              Expanded(child: child)
            ],
          ),
        ),
      ),
    );
  }

  Widget searchBar(BuildContext context) {
    var textEditService = GetIt.instance.get<SearchTextEditService>();
    return TextField(
      controller: TextEditingController()..text = textEditService.text ?? '',
      onChanged: (text) {
        if (textEditService.onTextEdit != null &&
            textEditService.text != text) {
          textEditService.onTextEdit!.call(text);
        }
        textEditService.text = text;
      },
      decoration: Perflow.inputDecoration.copyWith(
        hintText: "Search...",
      ),
    );
  }

  Widget _topNavmenu() {
    return Container(
      color: Perflow.surfaceColor,
      child: BlocBuilder<SearchNavigationCubit, SearchNavigationState>(
        builder: (context, state) {
          return Row(
            children: [
              _SearchNavButton(
                onTap: () {
                  context.vRouter.to(Routes.searchSongs);
                },
                title: "Songs",
                selected: state is SearchNavigationSongs,
              ),
              _SearchNavButton(
                onTap: () {
                  context.vRouter.to(Routes.searchAlbums);
                },
                title: "Albums",
                selected: state is SearchNavigationAlbums,
              ),
              _SearchNavButton(
                onTap: () {
                  context.vRouter.to(Routes.searchArtists);
                },
                title: "Artists",
                selected: state is SearchNavigationArtists,
              ),
              _SearchNavButton(
                onTap: () {
                  context.vRouter.to(Routes.searchPlaylists);
                },
                title: "Playlists",
                selected: state is SearchNavigationPlaylists,
              ),
            ],
          );
        },
      )
    );
  }
}

class _SearchNavButton extends StatelessWidget {
  final bool selected;
  final String title;
  final void Function() onTap;

  const _SearchNavButton({
    required this.selected,
    required this.title,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = selected ? Perflow.primaryLightColor : Perflow.textColor;

    return Expanded(
      child: InkResponse(
        onTap: onTap,
        child: TextButton(
          onPressed: () {
            onTap();
          },
          child: Text(
            title,
            style: TextStyle(
                color: color,
                fontSize: 15,
                fontFamily: Perflow.title,
                fontWeight: FontWeight.normal),
          ),
        ),
      ),
    );
  }
}
