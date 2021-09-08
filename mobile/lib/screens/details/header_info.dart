import 'package:flutter/material.dart';
import 'package:perflow/widgets/buttons/perflow_elevated_button.dart';

class HeaderInfo extends StatelessWidget {
  final Widget primaryText;
  final Widget secondaryTextMain;
  final Widget? secondaryTextOther;
  final String iconUrl;
  final Widget? likeButton;
  final Widget? secondaryButton;
  final void Function()? onPlayPressed;

  const HeaderInfo({
    Key? key,
    required this.iconUrl,
    required this.primaryText,
    required this.secondaryTextMain,
    this.secondaryTextOther,
    this.likeButton,
    this.secondaryButton,
    this.onPlayPressed
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(child: primaryText),
              Padding(
                padding: const EdgeInsets.only(right: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (likeButton != null) likeButton!,
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.more_vert),
                    )
                  ],
                ),
              )
            ],
          ),
          Row(
            children: [
              GestureDetector(
                onTap: () {},
                child: Center(
                  child: secondaryTextMain,
                ),
              ),
              if (secondaryTextOther != null) secondaryTextOther!,
            ],
          ),
          Padding(
            padding: const EdgeInsets.only(top: 12),
            child: SizedBox(
              height: 42,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Expanded(
                    flex: 1,
                    child: PerflowElevatedButton.text(
                      onPressed: onPlayPressed ?? () {},
                      text: 'Play',
                    ),
                  ),
                  Expanded(
                    flex: 2,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 8.0),
                      child: secondaryButton,
                    ),
                  ),
                  const Spacer(
                    flex: 2,
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
