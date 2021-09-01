import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/theme.dart';
import 'package:perflow/widgets/buttons/perflow_back_button.dart';

class DefaultSliverBar extends StatelessWidget {
  const DefaultSliverBar({
    Key? key,
    required this.context,
    required this.title,
    required this.expandedHeight,
  }) : super(key: key);

  final BuildContext context;
  final Widget title;
  final double expandedHeight;

  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      elevation: 2,
      backgroundColor: Perflow.backgroundColor,
      expandedHeight: expandedHeight - RootMediaQuery.value.padding.top,
      pinned: true,
      leading: const PerflowBackButton(),
      flexibleSpace: FlexibleSpaceBar(
        centerTitle: true,
        background: const DecoratedBox(
            decoration: BoxDecoration(gradient: Perflow.secondaryGradient)),
        title: title,
      ),
    );
  }
}
