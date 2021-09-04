import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/screens/main/player/player.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

class MainScreen extends StatelessWidget {
  final Widget child;

  const MainScreen({required this.child, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar:
          BlocBuilder<MainNavigationCubit, MainNavigationState>(
              builder: (context, state) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          verticalDirection: VerticalDirection.up,
          children: [
            BottomAppBar(
              color: Perflow.surfaceColor,
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  children: [
                    _BottomNavButton(
                      selected: state is MainNavigationHome,
                      icon: Icons.local_fire_department,
                      title: 'Home',
                      onTap: () => context.vRouter.to(Routes.home),
                    ),
                    _BottomNavButton(
                      selected: state is MainNavigationSearch,
                      icon: Icons.search,
                      title: 'Search',
                      onTap: () => context.vRouter.to(Routes.searchSongs),
                    ),
                    _BottomNavButton(
                      selected: state is MainNavigationLibrary,
                      icon: Icons.music_note,
                      title: 'Library',
                      onTap: () => context.vRouter.to(Routes.libraryAll),
                    ),
                  ],
                ),
              ),
            ),
            Visibility(
                visible: state is! MainNavigationPlayer,
                maintainState: true,
                child: const Player()),
          ],
        );
      }),
    );
  }
}

class _BottomNavButton extends StatelessWidget {
  final bool selected;
  final String title;
  final IconData icon;
  final void Function() onTap;

  const _BottomNavButton({
    required this.selected,
    required this.title,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = selected ? Perflow.primaryLightColor : Colors.white60;

    return Expanded(
      child: InkResponse(
        onTap: onTap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: color,
            ),
            Text(
              title,
              style: TextStyle(color: color),
            )
          ],
        ),
      ),
    );
  }
}
