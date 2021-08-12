import 'package:flutter/material.dart';
import 'package:perflow/configure_services.dart';
import 'package:perflow/perflow_app.dart';

void main() {
  configureServices();

  runApp(const PerflowApp());
}
