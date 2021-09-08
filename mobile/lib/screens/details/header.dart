import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/helpers/math/linear_clamp.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/screens/details/header_info.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';
import 'package:perflow/widgets/buttons/perflow_outlined_button.dart';

class HeaderDelegate extends SliverPersistentHeaderDelegate {
  final double expandedHeight;
  final Text primaryText;
  final Text secondaryTextMain;
  final Text? secondaryTextOther;
  final String iconUrl;
  final Widget? likeButton;
  final PerflowOutlinedButton? secondaryButton;
  final void Function()? onPlayPressed;

  const HeaderDelegate({
    required this.primaryText,
    required this.secondaryTextMain,
    this.secondaryTextOther,
    required this.iconUrl,
    this.likeButton,
    this.secondaryButton,
    required this.expandedHeight,
    this.onPlayPressed
  });

  @override
  double get maxExtent => expandedHeight;

  @override
  double get minExtent => kToolbarHeight + RootMediaQuery.value.padding.top;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) =>
      minExtent != oldDelegate.minExtent || maxExtent != oldDelegate.maxExtent;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    final textTheme = Theme.of(context).textTheme;

    final double percent = shrinkOffset / expandedHeight;

    if (percent > 0.85) {
      return AppBar(
        centerTitle: true,
        backgroundColor: Perflow.backgroundColor,
        title: primaryText,
        leading: const PerflowBackButton(),
      );
    }

    final double backgroundOpacity =
        linearClamp(t: percent, upperThreshold: 0.85);

    final double imageOpacity =
        1 - linearClamp(t: percent, lowerThreshold: 0.4, upperThreshold: 0.7);

    final double titleOpacity =
        linearClamp(t: percent, lowerThreshold: 0.6, upperThreshold: 0.85);

    final double detailsOpacity =
        1 - linearClamp(t: percent, lowerThreshold: 0.2, upperThreshold: 0.3);

    final image = NetworkImage(iconUrl);

    return _StackedHeader(
      backgroundOpacity: backgroundOpacity,
      image: image,
      expandedHeight: expandedHeight,
      imageOpacity: imageOpacity,
      detailsOpacity: detailsOpacity,
      iconUrl: iconUrl,
      likeButton: likeButton,
      primaryText: primaryText,
      secondaryTextMain: secondaryTextMain,
      secondaryTextOther: secondaryTextOther,
      textTheme: textTheme,
      secondaryButton: secondaryButton,
      titleOpacity: titleOpacity,
      onPlayPressed: onPlayPressed
    );
  }
}

class _StackedHeader extends StatelessWidget {
  const _StackedHeader({
    Key? key,
    required this.backgroundOpacity,
    required this.image,
    required this.expandedHeight,
    required this.imageOpacity,
    required this.detailsOpacity,
    required this.textTheme,
    required this.titleOpacity,
    required this.primaryText,
    required this.secondaryTextMain,
    this.secondaryTextOther,
    required this.iconUrl,
    this.likeButton,
    this.secondaryButton,
    this.onPlayPressed
  }) : super(key: key);

  final double backgroundOpacity;
  final NetworkImage image;
  final double expandedHeight;
  final double imageOpacity;
  final double detailsOpacity;
  final TextTheme textTheme;
  final double titleOpacity;

  final Text primaryText;
  final Text secondaryTextMain;
  final Text? secondaryTextOther;
  final String iconUrl;
  final Widget? likeButton;
  final PerflowOutlinedButton? secondaryButton;
  final void Function()? onPlayPressed;

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      clipBehavior: Clip.none,
      children: [
        DecoratedBox(
          decoration: BoxDecoration(
            gradient: Perflow.secondaryGradient.lerpTo(
                const LinearGradient(
                    colors: [Perflow.backgroundColor, Perflow.backgroundColor]),
                backgroundOpacity),
            image: DecorationImage(
              image: image,
              fit: BoxFit.cover,
              colorFilter: ColorFilter.mode(
                  Colors.black.withOpacity((1 - backgroundOpacity) * 0.3),
                  BlendMode.dstATop),
            ),
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
                            offset: Offset(0, 0))
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: AspectRatio(
                        aspectRatio: 1,
                        child: Opacity(
                          opacity: imageOpacity,
                          child: Image(
                            image: image,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              if (detailsOpacity > 0)
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Opacity(
                      opacity: detailsOpacity,
                      child: HeaderInfo(
                        iconUrl: iconUrl,
                        primaryText: primaryText,
                        secondaryTextMain: secondaryTextMain,
                        secondaryTextOther: secondaryTextOther,
                        likeButton: likeButton,
                        secondaryButton: secondaryButton,
                        onPlayPressed: onPlayPressed,
                      ),
                    ),
                  ),
                ),
              Center(
                child: Text(primaryText.data.toString(),
                    style: textTheme.headline6!.copyWith(
                        color: Perflow.textColor.withOpacity(titleOpacity))),
              )
            ],
          ),
        ),
      ],
    );
  }
}
