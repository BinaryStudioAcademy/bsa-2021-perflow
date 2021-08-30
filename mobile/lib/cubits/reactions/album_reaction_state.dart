part of 'album_reaction_cubit.dart';

@freezed
class AlbumReactionState with _$AlbumReactionState {
  factory AlbumReactionState.initial() = AlbumReactionStateInitial;
  factory AlbumReactionState.loading() = AlbumReactionStateLoading;
  factory AlbumReactionState.error(String errorMessage) = AlbumReactionStateError;
  factory AlbumReactionState.liked() = AlbumReactionStateLiked;
  factory AlbumReactionState.unliked() = AlbumReactionStateUnliked;
}
