import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/playback_queue/playback_queue_cubit.dart';
import 'package:perflow/screens/main/queue/queue_list.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';

class QueueScreen extends StatelessWidget {
  const QueueScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Perflow.surfaceColor,
        centerTitle: true,
        leading: const PerflowBackButton(),
        title: const Text('Queue'),
      ),
      body: BlocBuilder<PlaybackQueueCubit, PlaybackQueueState>(
        builder: (context, state) => state.map(
          empty: (_) => const Center(
            child: Text('No songs currently playing'),
          ),
          playing: (playing) => QueueList(
            data: playing.data
          )
        ),
      ),
    );
  }
}
