import 'package:flutter/material.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/playback/playback_cubit.dart';
import 'package:perflow/widgets/perflow_outlined_button.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 8.0),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Good morning!',
                        style: theme.textTheme.headline6,
                      ),
                      IconButton(
                        onPressed: () => context.read<AuthCubit>().signOut(),
                        icon: const Icon(Icons.logout)
                      )
                    ],
                  ),
                ),
                _buildPlayCard(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPlayCard(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 8),
        child: SizedBox(
          width: double.infinity,
          child: Column(
            children: [
              PerflowOutlinedButton(
                onPressed: () => context.read<PlaybackCubit>().setById(32),
                child: const Text('Play - A Promise From Distant Days')
              ),
              const SizedBox(height: 6),
              PerflowOutlinedButton(
                onPressed: () => context.read<PlaybackCubit>().setById(33),
                child: const Text('Play - Stayin alive')
              ),
            ],
          ),
        ),
      ),
    );
  }
}
