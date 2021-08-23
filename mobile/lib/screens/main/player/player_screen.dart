import 'package:flutter/material.dart';
import 'package:perflow/screens/main/player/player_body.dart';
import 'package:perflow/screens/main/player/player_header.dart';

class PlayerScreen extends StatelessWidget {
  const PlayerScreen({
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: const [
          Expanded(
            flex: 7,
            child: PlayerHeader()
          ),
          Expanded(
            flex: 4,
            child: PlayerBody()
          )
        ],
      ),
    );
  }
}



