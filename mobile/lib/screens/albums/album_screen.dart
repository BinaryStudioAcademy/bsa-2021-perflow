import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:perflow/cubits/albums/album_info_cubit.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/cubits/main_navigation/main_navigation_cubit.dart';
import 'package:perflow/models/albums/album_info.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/screens/albums/album_header.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';
import 'package:perflow/widgets/songs/song_row.dart';
import 'package:vrouter/vrouter.dart';

class AlbumScreen extends StatelessWidget {
  final int albumId;

  const AlbumScreen({
    required this.albumId,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final headerExpandedHeight = MediaQuery.of(context).size.height * 0.6;

    return VWidgetGuard(
      afterEnter: (context, from, to) => context.read<MainNavigationCubit>().setOther(),
      child: Scaffold(
        body: MultiBlocProvider(
          providers: [
            BlocProvider<AlbumInfoCubit>(
              create: (context) => AlbumInfoCubit(albumId),
            ),
          ],
          child: CustomScrollView(
            slivers: [
              const SliverToBoxAdapter(),
              BlocBuilder<AlbumInfoCubit, ApiCallState<AlbumInfo>>(
                builder: (context, state) => state.map(
                  loading: (_) => _buildDefaultSliverAppbar(
                    context: context,
                    title: const CircularProgressIndicator(),
                    expandedHeight: headerExpandedHeight
                  ),
                  error: (error) => _buildDefaultSliverAppbar(
                    context: context,
                    title: Text(error.message),
                    expandedHeight: headerExpandedHeight
                  ),
                  data: (value) => SliverPersistentHeader(
                    pinned: true,
                    delegate: AlbumHeaderDelegate(
                      expandedHeight: headerExpandedHeight,
                      info: value.data
                    ),
                  ),
                ),
              ),
              BlocBuilder<AlbumInfoCubit, ApiCallState<AlbumInfo>>(
                builder: _buildSongsList
              ),
            ],
          ),
        )
      ),
    );
  }

  Widget _buildDefaultSliverAppbar({
    required BuildContext context,
    required Widget title,
    required double expandedHeight
  }) {
    return SliverAppBar(
      elevation: 2,
      backgroundColor: Perflow.backgroundColor,
      expandedHeight: expandedHeight - RootMediaQuery.value.padding.top,
      pinned: true,
      leading: const PerflowBackButton(),
      flexibleSpace: FlexibleSpaceBar(
        centerTitle: true,
        background: const DecoratedBox(
          decoration: BoxDecoration(
            gradient: Perflow.secondaryGradient
          )
        ),
        title: title,
      ),
    );
  }

  Widget _buildSongsList(BuildContext context, ApiCallState<AlbumInfo> state) {
    return state.map(
      loading: (_) => const SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: CircularProgressIndicator()
        )
      ),
      error: (error) => SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: Text(error.message)
        )
      ),
      data: (value) => SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final song = value.data.songs[index];
            return SongRow(song: song);
          },
          childCount: value.data.songs.length
        )
      )
    );
  }
}
