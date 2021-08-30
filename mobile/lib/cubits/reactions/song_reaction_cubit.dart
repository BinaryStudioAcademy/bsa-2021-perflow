import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_song_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/song_reactions_api.dart';

part 'song_reaction_state.dart';
part 'song_reaction_cubit.freezed.dart';

class SongReactionCubit extends Cubit<SongReactionState> {
  final _songReactionsApi = getService<SongsReactionsApi>();
  final _authService = getService<AuthService>();

  SongReactionCubit() : super(SongReactionState.initial());

  Future<void> likeSong(int songId) async {
    emit(SongReactionState.loading());

    final reaction = NewSongReaction(
        songId: songId, userId: _authService.currentAuthState!.id);

    try {
      await _songReactionsApi.likeSong(reaction);

      emit(SongReactionState.liked());
    } catch (error) {
      emit(
        SongReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikeSong(int songId) async {
    emit(SongReactionState.loading());

    final reaction = NewSongReaction(
        songId: songId, userId: _authService.currentAuthState!.id);

    try {
      await _songReactionsApi.unlikeSong(reaction);

      emit(SongReactionState.unliked());
    } catch (error) {
      emit(
        SongReactionState.error(
          error.toString(),
        ),
      );
    }
  }
}
