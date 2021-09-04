import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/reactions/reaction_state.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_song_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/song_reactions_api.dart';

class SongReactionCubit extends Cubit<ReactionState> {
  final _songReactionsApi = getService<SongsReactionsApi>();
  final _authService = getService<AuthService>();

  SongReactionCubit() : super(ReactionState.loading());

  Future<void> likeSong(int songId) async {
    emit(ReactionState.loading());

    final reaction = NewSongReaction(
        songId: songId, userId: _authService.currentAuthState!.id);

    try {
      await _songReactionsApi.likeSong(reaction);

      emit(ReactionState.liked());
    } catch (error) {
      emit(
        ReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikeSong(int songId) async {
    emit(ReactionState.loading());

    final reaction = NewSongReaction(
        songId: songId, userId: _authService.currentAuthState!.id);

    try {
      await _songReactionsApi.unlikeSong(reaction);

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
