import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/reactions/new_artist_reaction.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/artists_reactions_api.dart';
import 'package:perflow/cubits/reactions/reaction_state.dart';

class ArtistReactionCubit extends Cubit<ReactionState> {
  final _artistReactionsApi = getService<ArtistsReactionsApi>();
  final _authService = getService<AuthService>();

  ArtistReactionCubit() : super(ReactionState.loading());

  Future<void> likeArtist(int artistId) async {
    emit(ReactionState.loading());

    final reaction = NewArtistReaction(
        artistId: artistId, userId: _authService.currentAuthState!.id);

    try {
      await _artistReactionsApi.likeArtist(reaction);

      emit(ReactionState.liked());
    } catch (error) {
      emit(
        ReactionState.error(
          error.toString(),
        ),
      );
    }
  }

  Future<void> unlikeArtist(int artistId) async {
    emit(ReactionState.loading());

    final reaction = NewArtistReaction(
        artistId: artistId, userId: _authService.currentAuthState!.id);

    try {
      await _artistReactionsApi.unlikeArtist(reaction);

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
