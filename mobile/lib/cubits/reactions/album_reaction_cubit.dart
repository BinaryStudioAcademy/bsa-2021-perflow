import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_album_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/albums_reactions_api.dart';
import 'package:perflow/cubits/reactions/reaction_state.dart';

class AlbumReactionCubit extends Cubit<ReactionState> {
  final _albumReactionsApi = getService<AlbumsReactionsApi>();
  final _authService = getService<AuthService>();

  AlbumReactionCubit() : super(ReactionState.loading());

  Future<void> likeAlbum(int albumId) async {
    emit(ReactionState.loading());

    final reaction = NewAlbumReaction(
        albumId: albumId, userId: _authService.currentAuthState!.id);

    try {
      await _albumReactionsApi.likeAlbum(reaction);

      emit(ReactionState.liked());
    } catch (error) {
      emit(
        ReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikeAlbum(int albumId) async {
    emit(ReactionState.loading());

    final reaction = NewAlbumReaction(
        albumId: albumId, userId: _authService.currentAuthState!.id);

    try {
      await _albumReactionsApi.unlikeAlbum(reaction);

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
