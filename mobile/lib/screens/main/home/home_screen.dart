import 'package:flutter/material.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/services/auth/auth_api.dart';
import 'package:perflow/services/playback/playback_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/widgets/perflow_elevated_button.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Row(
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
              const Expanded(
                flex: 1,
                child: Card(
                  child: Center(child: Text('Playlists')),
                ),
              ),
              Expanded(
                flex: 1,
                child: Card(
                  child: SizedBox(
                    width: double.infinity,
                    child: Column(
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        PerflowElevatedButton(
                          onPressed: getService<PlaybackService>().play,
                          child: const Text('Play')
                        ),
                        const SizedBox(height: 8),
                        PerflowElevatedButton(
                            onPressed: getService<PlaybackService>().pause,
                            child: const Text('Stop')
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
