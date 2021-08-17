import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:perflow/configure_services.dart';
import 'package:perflow/helpers/dev_http_overrides.dart';
import 'package:perflow/perflow_app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if(kDebugMode || kProfileMode) {
    HttpOverrides.global = DevHttpOverrides();
  }

  configureServices();

  runApp(const PerflowApp());
}
