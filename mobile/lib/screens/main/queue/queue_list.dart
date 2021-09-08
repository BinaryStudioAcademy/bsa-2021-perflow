import 'dart:math';
import 'package:after_layout/after_layout.dart';
import 'package:flutter/material.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playback/playback_queue_data.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/playback/playback_queue.dart';
import 'package:perflow/widgets/songs/song_row.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

class QueueList extends StatefulWidget {
  final QueueData data;

  const QueueList({
    required this.data,
    Key? key
  }) : super(key: key);

  @override
  _QueueListState createState() => _QueueListState();
}

class _QueueListState extends State<QueueList> with AfterLayoutMixin<QueueList> {
  late final ItemScrollController itemScrollController;

  @override
  void initState() {
    super.initState();
    itemScrollController = ItemScrollController();
  }

  @override
  Widget build(BuildContext context) {
    return ScrollablePositionedList.builder(
      itemCount: widget.data.songs.length,
      itemScrollController: itemScrollController,
      itemBuilder: (context, index) => SongRow(
        song: widget.data.songs[index],
        highlighted: widget.data.currentIndex == index,
        onTap: () => _skipToSong(index),
      ),
    );
  }

  void _skipToSong(int index) async {
    await getService<PlaybackQueue>().skipTo(index);
    await getService<PlaybackHandler>().play();
  }

  @override
  void afterFirstLayout(BuildContext context) {
    final index = max(widget.data.currentIndex - 1, 0);

    itemScrollController.jumpTo(index: index);
  }
}
