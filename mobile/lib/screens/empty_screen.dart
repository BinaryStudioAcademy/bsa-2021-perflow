import 'package:flutter/material.dart';
import 'package:perflow/theme.dart';
import 'package:provider/single_child_widget.dart';

class EmptyScreen extends SingleChildStatelessWidget {
  const EmptyScreen({
    required Widget child,
    Key? key
  }) : super(child: child, key: key);

  @override
  Widget buildWithChild(BuildContext context, Widget? child) {
    return Scaffold(
      backgroundColor: Perflow.backgroundColor,
      body: Center(
        child: child
      ),
    );
  }
}
