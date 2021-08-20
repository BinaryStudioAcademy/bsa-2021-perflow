import 'package:animations/animations.dart';
import 'package:flutter/material.dart';
import 'package:perflow/root_media_query.dart';
import 'package:perflow/routes.dart';
import 'package:perflow/routes/auth_routes.dart';
import 'package:perflow/routes/main_routes.dart';
import 'package:perflow/routes/root_routes.dart';
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
      initialUrl: Routes.auth,
      onPop: _handlePop,
      onSystemPop: _handlePop,
      routes: [
        RootRoutes([
          AuthRoutes(),
          MainRoutes()
        ]),
      ],
      builder: (context, child) {
        RootMediaQuery.value = MediaQuery.of(context);
        return child;
      },
      buildTransition: (animation, secondaryAnimation, child) => FadeThroughTransition(
        animation: animation,
        secondaryAnimation: secondaryAnimation,
        child: child
      ),
    );
  }

  Future<void> _handlePop(VRedirector redirector) async {
    if(redirector.historyCanBack()) {
      redirector.historyBack();
    }
  }
}
