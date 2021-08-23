import 'package:flutter/material.dart';

class SmallContentCard extends StatelessWidget {
  final double? width;
  final double height;
  final String title;
  final String? imageUrl;
  final void Function()? onTap;

  const SmallContentCard({
    required this.title,
    this.width,
    this.height = 56,
    this.imageUrl,
    this.onTap,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final image = imageUrl != null
      ? Ink.image(
        fit: BoxFit.cover,
        width: height,
        height: height,
        image: NetworkImage(imageUrl!)
      )
      : SizedBox(
        height: height,
        width: height,
        child: const Icon(Icons.all_inclusive),
      );

    final card = Card(
      child: InkWell(
        onTap: onTap,
        child: Row(
          children: [
            image,
            Padding(
              padding: const EdgeInsets.only(left: 8),
              child: Text(
                title,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: textTheme.subtitle2,
              ),
            )
          ],
        ),
      ),
    );

    return width == null
      ? Expanded(
        child: card
      )
      : SizedBox(
        width: width,
        child: card
      );
  }
}
