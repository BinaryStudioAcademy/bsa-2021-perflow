import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:perflow/cubits/auth/auth_cubit.dart';
import 'package:perflow/screens/empty_screen.dart';
import 'package:perflow/theme.dart';
import 'package:vrouter/vrouter.dart';

class RootRoutes extends VRouteElementBuilder {
  final List<VRouteElement> nestedRoutes;

  RootRoutes(this.nestedRoutes);

  @override
  List<VRouteElement> buildRoutes() {
    return [
      VNester(
        path: null,
        nestedRoutes: nestedRoutes,
        widgetBuilder: (child) => _buildGetItLoader(
          child: MultiBlocProvider(
            providers: [
              BlocProvider<AuthCubit>(create: (context) => AuthCubit())
            ],
            child: child
          )
        )
      )
    ];
  }

  Widget _buildGetItLoader({ required Widget child }) {
    return FutureBuilder(
      future: GetIt.instance.allReady(),
      builder: (context, snapshot) {
        if(snapshot.hasError) {
          return const EmptyScreen(
            child: Text('Fatal error occurred')
          );
        }

        if(snapshot.hasData) {
          return child;
        }

        return const EmptyScreen(
          child: CircularProgressIndicator(
            color: Perflow.primaryLightColor,
          )
        );
      },
    );
  }
}
