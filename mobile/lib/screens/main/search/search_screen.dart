import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
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
        appBar: AppBar(
          title: searchBar(context),
          backgroundColor: Perflow.surfaceColor,
        ),
        body: SafeArea(
          child: Column(
            children: [
              SingleChildScrollView(
                child: Column(
                  children: [
                    _topNavmenu(),
                  ],
                ),
              ),
              Expanded(child: child)
            ],
          ),
        ),
      ),
    );
  }

  Widget searchBar(BuildContext context) {
    return TextField(
      onChanged: (text) {
        if (SearchTextEditService().onTextEdit != null) {
          SearchTextEditService().onTextEdit!.call(text);
        }
        SearchTextEditService().text = text;
      },
      decoration: Perflow.inputDecoration,
    );
  }

  Widget _topNavmenu() {
    return Container(
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
      ),
      decoration: const BoxDecoration(boxShadow: [
        BoxShadow(
          color: Color(0x3421292D),
          spreadRadius: 7,
          blurRadius: 5,
          offset: Offset(0, 0), // changes position of shadow
        ),
      ], color: Perflow.surfaceColor),
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
