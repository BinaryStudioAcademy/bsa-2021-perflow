import 'package:flutter/material.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/home/home_playlists_cubit.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/cards/content_row.dart';
import 'package:perflow/widgets/cards/medium_content_card.dart';
import 'package:perflow/widgets/cards/small_content_card.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:vrouter/vrouter.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 8
            ),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.max,
                children: [
                  _buildHeader(context),
                  _buildSmallCards(context),
                  const _HomeSectionHeader(title: 'New songs added', showMoreLabel: true),
                  _buildContentRow(),
                  const _HomeSectionHeader(title: 'Recently played'),
                  _buildMediumCards(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  static void f() {

  }

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
            icon: const Icon(Icons.logout)
          )
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
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877998049207660614/unknown.png',
              title: "Indie",
              onTap: f,
            ),
            SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997420305350707/unknown.png',
              title: 'Rock',
              onTap: f,
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997441234923571/unknown.png',
              title: 'Club',
              onTap: f,
            ),
            SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997488978665512/unknown.png',
              title: 'Electro',
              onTap: f,
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997505969791006/unknown.png',
              title: 'Relax',
              onTap: f,
            ),
            SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997460193177620/unknown.png',
              title: 'Work',
              onTap: f,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildContentRow() {
    return const ContentRow(
      imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877648551121915984/unknown.png',
      title: 'We are who',
      subtitle: 'Olivia Whodrigo | ONLY WHO',
    );
  }

  Widget _buildMediumCards() {
    return BlocProvider<HomePlaylistsCubit>(
      create: (context) => HomePlaylistsCubit([
        190,
        167,
        187,
      ]),
      child: BlocBuilder<HomePlaylistsCubit, ApiCallState<List<PlaylistInfo>>>(
        builder: (context, state) => state.map(
          loading: (_) => const SizedBox(),
          error: (_) => const SizedBox(),
          data: (state) => SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              children: state.data.map((playlist) =>
                MediumContentCard(
                  cardSize: 142,
                  imageUrl: playlist.iconURL,
                  title: playlist.name,
                  subtitle: playlist.author.userName,
                  onTap: () => context.vRouter.to(Routes.playlist(playlist.id)),
                )
              ).toList(),
            ),
          )
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
          if(showMoreLabel)
            Text(
              'See more',
              style: textTheme.subtitle2!.copyWith(
                color: Perflow.primaryLightColor
              ),
            )
        ],
      ),
    );
  }
}

