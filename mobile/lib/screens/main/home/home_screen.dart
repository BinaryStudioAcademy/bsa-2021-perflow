import 'package:flutter/material.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/cards/content_row.dart';
import 'package:perflow/widgets/cards/medium_content_card.dart';
import 'package:perflow/widgets/cards/small_content_card.dart';
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
                  _buildSectionHeader(context, 'New songs added'),
                  _buildContentRow(),
                  _buildSectionHeader(context, 'Recently played'),
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
          children: [
            SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997212238495754/f6060f0bc76d055681c44063d8f94824.png',
              title: "Cool playlist",
              onTap: () => context.vRouter.to(Routes.playlist(167)),
            ),
            const SmallContentCard(
              imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877997420305350707/unknown.png',
              title: 'Rock mix',
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
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: const [
        MediumContentCard(
          imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877998016341082132/unknown.png',
          title: 'Daily mix 1',
          subtitle: 'Nothing But Thieves, The Neighbourhood, Black Pistol Fire',
          onTap: f,
        ),
        MediumContentCard(
          imageUrl: 'https://media.discordapp.net/attachments/763282727826227202/877998049207660614/unknown.png',
          title: 'Daily mix 2',
          subtitle: 'Royal Blood, Bring Me The Horizon, Black Pistol Fire',
          onTap: f,
        ),
      ],
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
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
