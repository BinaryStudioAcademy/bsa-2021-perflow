import 'package:flutter/material.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/theme.dart';

class SongDialogAction extends StatelessWidget {
  final IconData icon;
  final Widget title;
  final void Function()? onTap;

  const SongDialogAction({
    required this.icon,
    required this.title,
    this.onTap,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return InkWell(
      onTap: onTap ?? () {},
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 12
            ),
            child: Icon(
              icon,
              size: 28,
            ),
          ),
          DefaultTextStyle(
            style: textTheme.subtitle1 ?? Perflow.textTheme.headline1!,
            child: title,
          )
        ],
      ),
    );
  }
}
