import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';

class PerflowAppbar extends StatelessWidget implements PreferredSizeWidget {
  static const double _appbarHeight = 56;

  const PerflowAppbar({Key? key}) : super(key: key);

  @override
  Size get preferredSize => const Size.fromHeight(_appbarHeight);

  @override
  Widget build(BuildContext context) {
    return PreferredSize(
      preferredSize: preferredSize,
      child: AppBar(
        elevation: 0,
        backgroundColor: Perflow.backgroundColor,
      )
    );
  }
}
