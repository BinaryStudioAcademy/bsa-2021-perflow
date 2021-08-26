import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';

class LibraryScreen extends StatelessWidget {
  const LibraryScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
            child: SingleChildScrollView(child: _topNavmenu()),
          ),
        ),
      ),
    );
  }

  Widget _topNavmenu() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4),
          child: Row(
            children: [
              TextButton(
                onPressed: () {},
                child: const Text(
                  "All",
                  style: TextStyle(
                      color: Perflow.textColor,
                      fontSize: 18,
                      fontFamily: Perflow.title),
                ),
              ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  "Albums",
                  style: TextStyle(
                      color: Perflow.textColor,
                      fontSize: 18,
                      fontFamily: Perflow.title),
                ),
              ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  "Artists",
                  style: TextStyle(
                      color: Perflow.textColor,
                      fontSize: 18,
                      fontFamily: Perflow.title),
                ),
              ),
            ],
          ),
        ),
        const Center(child: Text('Library screen'))
      ],
    );
  }
}
