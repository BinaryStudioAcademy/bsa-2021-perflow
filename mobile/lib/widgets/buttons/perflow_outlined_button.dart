import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';

class PerflowOutlinedButton extends StatelessWidget {
  final void Function()? onPressed;
  final Widget child;
  final double height;
  final double borderRadius;

  const PerflowOutlinedButton({
    required this.onPressed,
    required this.child,
    this.height = 52,
    this.borderRadius = 30,
    Key? key
  }) : super(key: key);

  PerflowOutlinedButton.text({
    required this.onPressed,
    required String text,
    this.height = 52,
    this.borderRadius = 30,
    Key? key
  }) :
    child = Text(text),
    super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          primary: Perflow.textColor,
          side: const BorderSide(color: Perflow.textColor),
          shape: const StadiumBorder(),
        ),
        child: Center(child: child),
      ),
    );
  }
}
