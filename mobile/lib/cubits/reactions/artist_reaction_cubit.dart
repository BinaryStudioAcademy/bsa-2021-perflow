import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_artist_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/artists_reactions_api.dart';

part 'artist_reaction_state.dart';
part 'artist_reaction_cubit.freezed.dart';

class ArtistReactionCubit extends Cubit<ArtistReactionState> {
  final _artistReactionsApi = getService<ArtistsReactionsApi>();
  final _authService = getService<AuthService>();

  ArtistReactionCubit() : super(ArtistReactionState.initial());

  Future<void> likeArtist(int artistId) async {
    emit(ArtistReactionState.loading());

    final reaction = NewArtistReaction(
        artistId: artistId, userId: _authService.currentAuthState!.id);

    try {
      await _artistReactionsApi.likeArtist(reaction);
      
      emit(ArtistReactionState.liked());
    } catch (error) {
      emit(
        ArtistReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikeArtist(int artistId) async {
    emit(ArtistReactionState.loading());

    final reaction = NewArtistReaction(
        artistId: artistId, userId: _authService.currentAuthState!.id);

    try {
      await _artistReactionsApi.unlikeArtist(reaction);

      emit(ArtistReactionState.unliked());
    } catch (error) {
      emit(
        ArtistReactionState.error(
          error.toString(),
        ),
      );
    }
  }
}
