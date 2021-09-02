import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_playlist_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/playlists_reactions_api.dart';
import 'package:perflow/cubits/reactions/reaction_state.dart';

class PlaylistReactionCubit extends Cubit<ReactionState> {
  final _playlistReactionsApi = getService<PlaylistsReactionsApi>();
  final _authService = getService<AuthService>();

  PlaylistReactionCubit() : super(ReactionState.loading());

  Future<void> likePlaylist(int playlistId) async {
    emit(ReactionState.loading());

    final reaction = NewPlaylistReaction(
        playlistId: playlistId, userId: _authService.currentAuthState!.id);

    try {
      await _playlistReactionsApi.likePlaylist(reaction);

      emit(ReactionState.liked());
    } catch (error) {
      emit(
        ReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikePlaylist(int playlistId) async {
    emit(ReactionState.loading());

    final reaction = NewPlaylistReaction(
        playlistId: playlistId, userId: _authService.currentAuthState!.id);

    try {
      await _playlistReactionsApi.unlikePlaylist(reaction);

      emit(ReactionState.unliked());
    } catch (error) {
      emit(
        ReactionState.error(
          error.toString(),
        ),
      );
    }
  }
}
