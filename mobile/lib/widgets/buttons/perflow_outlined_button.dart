import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';

class PerflowOutlinedButton extends StatelessWidget {
  final void Function()? onPressed;
  final Widget child;
  final double height;
  final double borderRadius;
  final Color color;

  const PerflowOutlinedButton({
    required this.onPressed,
    required this.child,
    this.height = 52,
    this.borderRadius = 30,
    this.color = Perflow.primaryLightColor,
    Key? key
  }) : super(key: key);

  PerflowOutlinedButton.text({
    required this.onPressed,
    required String text,
    this.height = 52,
    this.borderRadius = 30,
    this.color = Perflow.primaryLightColor,
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
          primary: color,
          side: BorderSide(color: color),
          shape: const StadiumBorder(),
        ),
        child: Center(child: child),
      ),
    );
  }
}
