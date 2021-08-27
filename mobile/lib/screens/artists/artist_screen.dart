import 'package:flutter/cupertino.dart';

class ArtistScreen extends StatelessWidget {
  final int artistId;

  const ArtistScreen({required this.artistId, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "Coming soon...",
        style: TextStyle(fontSize: 30),
      ),
    );
  }
  
}
