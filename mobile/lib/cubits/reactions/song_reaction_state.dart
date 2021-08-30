part of 'song_reaction_cubit.dart';

@freezed
class SongReactionState with _$SongReactionState {
  factory SongReactionState.initial() = SongReactionStateInitial;
  factory SongReactionState.loading() = SongReactionStateLoading;
  factory SongReactionState.error(String errorMessage) = SongReactionStateError;
  factory SongReactionState.liked() = SongReactionStateLiked;
  factory SongReactionState.unliked() = SongReactionStateUnliked;
}
