import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/helpers/math/linear_clamp.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/screens/playlists/playlist_header_info.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';

class PlaylistHeaderDelegate extends SliverPersistentHeaderDelegate {
  final double expandedHeight;
  final PlaylistInfo info;

  const PlaylistHeaderDelegate({
    required this.expandedHeight,
    required this.info
  });

  @override
  double get maxExtent => expandedHeight;

  @override
  double get minExtent => kToolbarHeight + RootMediaQuery.value.padding.top;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) =>
    minExtent != oldDelegate.minExtent || maxExtent != oldDelegate.maxExtent;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final textTheme = Theme.of(context).textTheme;

    final double percent = shrinkOffset / expandedHeight;

    if(percent > 0.85) {
      return AppBar(
        centerTitle: true,
        backgroundColor: Perflow.backgroundColor,
        title: Text(
          info.name,
          style: textTheme.headline6,
        ),
        leading: const PerflowBackButton(),
      );
    }

    final double backgroundOpacity = linearClamp(
      t: percent,
      upperThreshold: 0.85
    );

    final double imageOpacity = 1 - linearClamp(
      t: percent,
      lowerThreshold: 0.4,
      upperThreshold: 0.7
    );

    final double titleOpacity = linearClamp(
      t: percent,
      lowerThreshold: 0.6,
      upperThreshold: 0.85
    );

    final double detailsOpacity = 1 - linearClamp(
      t: percent,
      lowerThreshold: 0.2,
      upperThreshold: 0.3
    );

    final image = info.iconURL != null ? NetworkImage(info.iconURL!) : null;

    return Stack(
      fit: StackFit.expand,
      clipBehavior: Clip.none,
      children: [
        DecoratedBox(
          decoration: BoxDecoration(
            gradient: Perflow.secondaryGradient.lerpTo(
              const LinearGradient(colors: [Perflow.backgroundColor, Perflow.backgroundColor]),
              backgroundOpacity
            ),
            image: image != null ? DecorationImage(
              image: image,
              fit: BoxFit.cover,
              colorFilter: ColorFilter.mode(
                Colors.black.withOpacity((1 - backgroundOpacity) * 0.3),
                BlendMode.dstATop
              )
            ) : null
          ),
        ),
        SafeArea(
          child: Stack(
            fit: StackFit.expand,
            clipBehavior: Clip.none,
            children: [
              const Align(
                child: PerflowBackButton(),
                alignment: Alignment.topLeft,
              ),
              Align(
                alignment: Alignment.topCenter,
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  child: Container(
                    constraints: BoxConstraints(maxWidth: expandedHeight * 0.5),
                    decoration: const BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: Color(0x3421292D),
                          spreadRadius: 4,
                          blurRadius: 6,
                          offset: Offset(0, 0)
                        )
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: AspectRatio(
                        aspectRatio: 1,
                        child: Opacity(
                          opacity: imageOpacity,
                          child: Image(
                            image: image!,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              if(detailsOpacity > 0)
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Opacity(
                      opacity: detailsOpacity,
                      child: PlaylistHeaderInfo(info: info)
                    ),
                  ),
                ),
              Center(
                child: Text(
                  info.name,
                  style: textTheme.headline6!.copyWith(
                    color: Perflow.textColor.withOpacity(titleOpacity)
                  )
                ),
              )
            ],
          )
        ),
      ],
    );
  }
}
