import 'package:flutter/material.dart';

class ContentRow extends StatelessWidget {
  final double height;
  final String? title;
  final String? subtitle;
  final String? imageUrl;
  final void Function()? onButtonTap;

  const ContentRow({
    this.height = 64,
    this.title,
    this.subtitle,
    this.imageUrl,
    this.onButtonTap,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final image = imageUrl != null
      ? Image.network(
        imageUrl!,
        fit: BoxFit.cover,
        width: height,
        height: height,
      )
      : SizedBox(
        height: height,
        width: height,
        child: const Icon(Icons.all_inclusive),
      );

    return SizedBox(
      height: height,
      child: Row(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          image,
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(left: 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if(title != null)
                    Text(
                      title!,
                      maxLines: subtitle == null ? 3 : 1,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.subtitle2,
                    ),
                  if(subtitle != null)
                    Text(
                      subtitle!,
                      maxLines: title == null ? 3 : 2,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.caption,
                    ),
                ],
              ),
            )
          ),
          SizedBox(
            width: 64,
            child: IconButton(
              icon: const Icon(Icons.play_arrow),
              onPressed: onButtonTap,
            ),
          )
        ],
      ),
    );
  }
}
