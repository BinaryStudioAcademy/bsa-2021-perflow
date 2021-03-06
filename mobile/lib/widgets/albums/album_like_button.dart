import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/reactions/album_reaction_cubit.dart';
import 'package:perflow/cubits/reactions/reaction_state.dart';
import 'package:perflow/theme.dart';

class LikeButtonAlbum extends StatelessWidget {
  final bool isLikedInitial;
  final Function()? onLikePress;
  final Function()? onUnlikePress;

  const LikeButtonAlbum(
      {Key? key,
      required this.isLikedInitial,
      this.onLikePress,
      this.onUnlikePress})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AlbumReactionCubit, ReactionState>(
      builder: (context, state) => state.maybeMap(
        liked: (_) => IconButton(
          visualDensity: VisualDensity.compact,
          onPressed: () {
            if (onUnlikePress != null) {
              onUnlikePress!.call();
            }
          },
          color: Perflow.primaryLightColor,
          icon: const Icon(Icons.favorite),
        ),
        unliked: (_) => IconButton(
          visualDensity: VisualDensity.compact,
          onPressed: () {
            if (onLikePress != null) {
              onLikePress!.call();
            }
          },
          icon: const Icon(Icons.favorite_border),
        ),
        orElse: () => isLikedInitial
            ? IconButton(
                visualDensity: VisualDensity.compact,
                onPressed: () {
                  if (onUnlikePress != null) {
                    onUnlikePress!.call();
                  }
                },
                color: Perflow.primaryLightColor,
                icon: const Icon(Icons.favorite),
              )
            : IconButton(
                visualDensity: VisualDensity.compact,
                onPressed: () {
                  if (onLikePress != null) {
                    onLikePress!.call();
                  }
                },
                icon: const Icon(Icons.favorite_border),
              ),
      ),
    );
  }
}
