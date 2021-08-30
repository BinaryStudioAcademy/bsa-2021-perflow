part of 'artist_reaction_cubit.dart';

@freezed
class ArtistReactionState with _$ArtistReactionState {
  factory ArtistReactionState.initial() = ArtistReactionStateInitial;
  factory ArtistReactionState.loading() = ArtistReactionStateLoading;
  factory ArtistReactionState.error(String errorMessage) = ArtistReactionStateError;
  factory ArtistReactionState.liked() = ArtistReactionStateLiked;
  factory ArtistReactionState.unliked() = ArtistReactionStateUnliked;
}
