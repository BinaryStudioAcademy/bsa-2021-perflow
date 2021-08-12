import 'package:flutter/material.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/routes/auth_routes.dart';
import 'package:perflow/routes/main_routes.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

class PerflowApp extends StatelessWidget {
  const PerflowApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return VRouter(
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.dark,
      theme: Perflow.theme,
      title: Perflow.title,
      initialUrl: Routes.home,
      routes: [
        AuthRoutes(),
        MainRoutes()
      ],
    );
  }
}
