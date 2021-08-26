import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/library_navigation/library_navigation_cubit.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

class LibraryScreen extends StatelessWidget {
  final Widget child;

  const LibraryScreen({required this.child, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
    );
  }

  Widget _topNavmenu() {
    return Container(
        child: BlocBuilder<LibraryNavigationCubit, LibraryNavigationState>(
            builder: (context, state) {
          return Row(
            children: [
              _LibraryNavButton(
                onTap: () {
                  context.vRouter.to(Routes.libraryAll);
                },
                title: "All",
                selected: state is LibraryNavigationAll,
              ),
              _LibraryNavButton(
                onTap: () {
                  context.vRouter.to(Routes.libraryAlbums);
                },
                title: "Albums",
                selected: state is LibraryNavigationAlbums,
              ),
              _LibraryNavButton(
                onTap: () {
                  context.vRouter.to(Routes.libraryArtists);
                },
                title: "Artists",
                selected: state is LibraryNavigationArtists,
              ),
            ],
          );
        }),
        decoration: const BoxDecoration(boxShadow: [
          BoxShadow(
            color: Color(0x3421292D),
            spreadRadius: 7,
            blurRadius: 5,
            offset: Offset(0, 0), // changes position of shadow
          ),
        ], color: Perflow.surfaceColor));
  }
}

class _LibraryNavButton extends StatelessWidget {
  final bool selected;
  final String title;
  final void Function() onTap;

  const _LibraryNavButton({
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
                color: color, fontSize: 15, fontFamily: Perflow.title, fontWeight: FontWeight.normal),
          ),
        ),
      ),
    );
  }
}
