import 'package:freezed_annotation/freezed_annotation.dart';

part 'reaction_state.freezed.dart';

@freezed
class ReactionState with _$ReactionState {
  factory ReactionState.loading() = ReactionStateLoading;
  factory ReactionState.error(String errorMessage) = ReactionStateError;
  factory ReactionState.liked() = ReactionStateLiked;
  factory ReactionState.unliked() = ReactionStateUnliked;
}
