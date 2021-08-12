import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/theme.dart';

class MainScreen extends StatelessWidget {
  final Widget child;

  const MainScreen({
    required this.child,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: BlocBuilder<MainNavigationCubit, MainNavigationState>(
        builder: (context, state) {
          return BottomNavigationBar(
            backgroundColor: Perflow.surfaceColor,
            selectedItemColor: Perflow.primaryLightColor,
            currentIndex: _getCurrentIndex(state),
            onTap: (index) => _handleNav(index, context.read<MainNavigationCubit>()),
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.local_fire_department_rounded),
                label: 'Home'
              ),
              BottomNavigationBarItem(
                  icon: Icon(Icons.search),
                  label: 'Search'
              ),
              BottomNavigationBarItem(
                  icon: Icon(Icons.music_note),
                  label: 'Playlists'
              ),
            ],
          );
        }
      ),
    );
  }

  int _getCurrentIndex(MainNavigationState state) {
    return state.map(
      home: (_) => 0,
      search: (_) => 1,
      playlists: (_) => 2
    );
  }

  void _handleNav(int index, MainNavigationCubit navCubit) {
    switch(index) {
      case 1:
        navCubit.goToSearch();
        break;
      case 2:
        navCubit.goToPlaylists();
        break;
      default:
        navCubit.goToHome();
        break;
    }
  }
}
