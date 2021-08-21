import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';

class MediumContentCard extends StatelessWidget {
  final double cardSize;
  final double titleSize;
  final String? title;
  final String? subtitle;
  final String? imageUrl;
  final void Function()? onTap;

  const MediumContentCard({
    this.cardSize = 142,
    this.titleSize = 64,
    this.title,
    this.subtitle,
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
        width: cardSize,
        height: cardSize,
        image: NetworkImage(imageUrl!)
      )
      : Container(
        height: cardSize,
        width: cardSize,
        color: Perflow.backgroundColor,
        child: const Icon(Icons.all_inclusive),
      );

    Ink.image(
      fit: BoxFit.cover,
      width: cardSize,
      height: cardSize,
      image: NetworkImage(imageUrl!)
    );

    return Card(
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.only(
            left: 8,
            top: 8,
            right: 8
          ),
          child: Column(
            children: [
              image,
              SizedBox(
                width: cardSize,
                height: titleSize,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
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
            ],
          ),
        ),
      ),
    );
  }
}
