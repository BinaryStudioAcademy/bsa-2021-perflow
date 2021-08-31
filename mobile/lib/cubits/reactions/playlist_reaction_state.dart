part of 'playlist_reaction_cubit.dart';

@freezed
class PlaylistReactionState with _$PlaylistReactionState {
  factory PlaylistReactionState.initial() = PlaylistReactionStateInitial;
  factory PlaylistReactionState.loading() = PlaylistReactionStateLoading;
  factory PlaylistReactionState.error(String errorMessage) = PlaylistReactionStateError;
  factory PlaylistReactionState.liked() = PlaylistReactionStateLiked;
  factory PlaylistReactionState.unliked() = PlaylistReactionStateUnliked;
}
