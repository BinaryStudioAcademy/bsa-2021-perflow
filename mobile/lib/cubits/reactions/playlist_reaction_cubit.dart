import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_playlist_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/playlists_reactions_api.dart';

part 'playlist_reaction_state.dart';
part 'playlist_reaction_cubit.freezed.dart';

class PlaylistReactionCubit extends Cubit<PlaylistReactionState> {
  final _playlistReactionsApi = getService<PlaylistsReactionsApi>();
  final _authService = getService<AuthService>();

  PlaylistReactionCubit() : super(PlaylistReactionState.initial());

  Future<void> likePlaylist(int playlistId) async {
    emit(PlaylistReactionState.loading());

    final reaction = NewPlaylistReaction(
        playlistId: playlistId, userId: _authService.currentAuthState!.id);

    try {
      await _playlistReactionsApi.likePlaylist(reaction);

      emit(PlaylistReactionState.liked());
    } catch (error) {
      emit(
        PlaylistReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikePlaylist(int playlistId) async {
    emit(PlaylistReactionState.loading());

    final reaction = NewPlaylistReaction(
        playlistId: playlistId, userId: _authService.currentAuthState!.id);

    try {
      await _playlistReactionsApi.unlikePlaylist(reaction);

      emit(PlaylistReactionState.unliked());
    } catch (error) {
      emit(
        PlaylistReactionState.error(
          error.toString(),
        ),
      );
    }
  }
}
