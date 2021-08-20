import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';

class PerflowElevatedButton extends StatelessWidget {
  final void Function()? onPressed;
  final Widget child;
  final double height;
  final double borderRadius;
  final Gradient gradient;

  const PerflowElevatedButton({
    required this.onPressed,
    required this.child,
    this.height = 52,
    this.borderRadius = 30,
    this.gradient = Perflow.primaryGradient,
    Key? key
  }) : super(key: key);

  PerflowElevatedButton.text({
    required this.onPressed,
    required String text,
    this.height = 52,
    this.borderRadius = 30,
    this.gradient = Perflow.primaryGradient,
    Key? key
  }) :
    child = Text(text, style: Perflow.textTheme.button),
    super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          shape: const StadiumBorder(),
          padding: const EdgeInsets.all(0.0),
        ),
        child: Ink(
          decoration: BoxDecoration(
            gradient: gradient,
            borderRadius: BorderRadius.circular(borderRadius)
          ),
          child: Center(
            child: child,
          ),
        ),
      ),
    );
  }
}
