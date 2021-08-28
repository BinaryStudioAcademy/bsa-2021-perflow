import 'package:flutter/material.dart';
import 'package:perflow/models/common/content_row_type.dart';
import 'package:perflow/theme.dart';

class ContentRow extends StatelessWidget {
  final double height;

  final void Function()? onLikePressed;
  final void Function()? onTap;

  final RowType contentType;
  final String iconUrl;
  final Text primaryText;
  final Text? secondaryText;
  final bool isLikeAvailable;

  const ContentRow(
      {required this.contentType,
      required this.iconUrl,
      required this.primaryText,
      this.secondaryText,
      this.onLikePressed,
      this.onTap,
      this.height = 80,
      this.isLikeAvailable = false,
      Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        if (onTap != null) {
          onTap!.call();
        }
      },
      child: SizedBox(
        height: height,
        width: height,
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              child: Container(
                height: height - 8,
                width: height - 8,
                decoration: BoxDecoration(
                  shape: contentType == RowType.artist ? BoxShape.circle : BoxShape.rectangle,
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: NetworkImage(iconUrl),
                  ),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: 2),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Spacer(flex: 2),
                    primaryText,
                    const Spacer(flex: 1),
                    if (secondaryText != null) secondaryText!,
                    const Spacer(flex: 2)
                  ],
                ),
              ),
            ),
            if (isLikeAvailable)
              IconButton(
                onPressed: () {
                  if (onLikePressed != null) {
                    onLikePressed!.call();
                  }
                },
                iconSize: 18,
                splashRadius: 22,
                color: Perflow.primaryLightColor,
                icon: const Icon(Icons.favorite),
              ),
            IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
          ],
        ),
      ),
    );
  }
}
