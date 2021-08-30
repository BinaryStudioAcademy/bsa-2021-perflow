import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_album_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/albums_reactions_api.dart';

part 'album_reaction_state.dart';
part 'album_reaction_cubit.freezed.dart';

class AlbumReactionCubit extends Cubit<AlbumReactionState> {
  final _albumReactionsApi = getService<AlbumsReactionsApi>();
  final _authService = getService<AuthService>();

  AlbumReactionCubit() : super(AlbumReactionState.initial());

  Future<void> likeAlbum(int albumId) async {
    emit(AlbumReactionState.loading());

    final reaction = NewAlbumReaction(
        albumId: albumId, userId: _authService.currentAuthState!.id);

    try {
      await _albumReactionsApi.likeAlbum(reaction);

      emit(AlbumReactionState.liked());
    } catch (error) {
      emit(
        AlbumReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikeAlbum(int albumId) async {
    emit(AlbumReactionState.loading());

    final reaction = NewAlbumReaction(
        albumId: albumId, userId: _authService.currentAuthState!.id);

    try {
      await _albumReactionsApi.unlikeAlbum(reaction);

      emit(AlbumReactionState.unliked());
    } catch (error) {
      emit(
        AlbumReactionState.error(
          error.toString(),
        ),
      );
    }
  }
}
