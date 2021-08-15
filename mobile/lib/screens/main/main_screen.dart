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
      bottomNavigationBar: ClipRRect(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(15.0),
          topRight: Radius.circular(15.0),
        ),
        child: BlocBuilder<MainNavigationCubit, MainNavigationState>(
          builder: (context, state) {
            return BottomNavigationBar(
              backgroundColor: Perflow.surfaceColor,
              selectedItemColor: Perflow.primaryLightColor,
              currentIndex: _getCurrentIndex(state),
              onTap: (index) => _handleNav(index, context.read<MainNavigationCubit>()),
              items: const [
                BottomNavigationBarItem(
                  icon: Icon(Icons.local_fire_department),
                  label: 'Home'
                ),
                BottomNavigationBarItem(
                    icon: Icon(Icons.search),
                    label: 'Search'
                ),
                BottomNavigationBarItem(
                    icon: Icon(Icons.music_note),
                    label: 'Library'
                ),
              ],
            );
          }
        ),
      ),
    );
  }

  int _getCurrentIndex(MainNavigationState state) {
    return state.map(
      home: (_) => 0,
      search: (_) => 1,
      library: (_) => 2
    );
  }

  void _handleNav(int index, MainNavigationCubit navCubit) {
    switch(index) {
      case 1:
        navCubit.goToSearch();
        break;
      case 2:
        navCubit.goToLibrary();
        break;
      default:
        navCubit.goToHome();
        break;
    }
  }
}
