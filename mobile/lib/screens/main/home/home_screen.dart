import 'package:flutter/material.dart';
import 'package:perflow/cubits/albums/new_releases_cubit.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/recently_played/recently_played_cubit.dart';
import 'package:perflow/cubits/songs/songs_cubit.dart';
import 'package:perflow/helpers/icon_url_convert.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/recently_played/recently_played_song.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/cards/medium_content_card.dart';
import 'package:perflow/widgets/cards/small_content_card.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/widgets/songs/song_row.dart';
import 'package:vrouter/vrouter.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.max,
                children: [
                  _buildHeader(context),
                  _buildSmallCards(context),
                  const _HomeSectionHeader(title: 'Recently played'),
                  _buildContentRow(),
                  const _HomeSectionHeader(title: 'New releases'),
                  _buildMediumCards(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  static void f() {}

  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(left: 8.0),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Good morning!',
            style: theme.textTheme.headline6,
          ),
          IconButton(
              onPressed: () => context.read<AuthCubit>().signOut(),
              icon: const Icon(Icons.logout))
        ],
      ),
    );
  }

  Widget _buildSmallCards(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            SmallContentCard(
              imageUrl:
                  'https://media.discordapp.net/attachments/763282727826227202/877998049207660614/unknown.png',
              title: "Indie",
              onTap: f,
            ),
            SmallContentCard(
              imageUrl:
                  'https://media.discordapp.net/attachments/763282727826227202/877997420305350707/unknown.png',
              title: 'Rock',
              onTap: f,
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            SmallContentCard(
              imageUrl:
                  'https://media.discordapp.net/attachments/763282727826227202/877997441234923571/unknown.png',
              title: 'Club',
              onTap: f,
            ),
            SmallContentCard(
              imageUrl:
                  'https://media.discordapp.net/attachments/763282727826227202/877997488978665512/unknown.png',
              title: 'Electro',
              onTap: f,
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            SmallContentCard(
              imageUrl:
                  'https://media.discordapp.net/attachments/763282727826227202/877997505969791006/unknown.png',
              title: 'Relax',
              onTap: f,
            ),
            SmallContentCard(
              imageUrl:
                  'https://media.discordapp.net/attachments/763282727826227202/877997460193177620/unknown.png',
              title: 'Work',
              onTap: f,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildContentRow() {
    return BlocProvider<RecentlyPlayedCubit>(
      create: (context) => RecentlyPlayedCubit(),
      child: BlocBuilder<RecentlyPlayedCubit,
          ApiCallState<List<RecentlyPlayedSong>>>(
        builder: (context, state) => state.map(
          loading: (_) => const SizedBox(),
          error: (_) => const SizedBox(),
          data: (rpSongs) => BlocProvider<SongsCubit>(
            create: (context) => SongsCubit(
              rpSongs.data.map((e) => e.id).toList(),
            ),
            child: BlocBuilder<SongsCubit, ApiCallState<List<Song>>>(
              builder: (context, state) => state.map(
                loading: (_) => const SizedBox(),
                error: (_) => const SizedBox(),
                data: (songs) => SizedBox(
                  child: ListView.builder(
                    itemBuilder: (context, index) => SongRow(
                      song: songs.data[index],
                      isLikeAvailable: false,
                    ),
                    itemCount: songs.data.length,
                    physics: const NeverScrollableScrollPhysics(),
                  ),
                  height: 320,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMediumCards() {
    return BlocProvider<NewReleasesCubit>(
      create: (context) => NewReleasesCubit(),
      child: BlocBuilder<NewReleasesCubit, ApiCallState<List<AlbumSimplified>>>(
        builder: (context, state) => state.map(
          loading: (_) => const SizedBox(),
          error: (_) => const SizedBox(),
          data: (albums) => SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              children: albums.data
                  .map(
                    (album) => MediumContentCard(
                      cardSize: 142,
                      imageUrl: getValidUrl(album.iconURL),
                      title: album.name,
                      subtitle: album.author == null
                          ? album.group!.name
                          : album.author!.name,
                      onTap: () => context.vRouter.to(Routes.album(album.id)),
                    ),
                  )
                  .toList(),
            ),
          ),
        ),
      ),
    );
  }
}

class _HomeSectionHeader extends StatelessWidget {
  final String title;
  final bool showMoreLabel;

  const _HomeSectionHeader({
    required this.title,
    this.showMoreLabel = false,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: textTheme.subtitle1,
          ),
          if (showMoreLabel)
            Text(
              'See more',
              style: textTheme.subtitle2!
                  .copyWith(color: Perflow.primaryLightColor),
            )
        ],
      ),
    );
  }
}
