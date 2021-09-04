import 'dart:async';
import 'package:perflow/services/signalr/hub_factory_service.dart';
import 'package:signalr_core/signalr_core.dart';

abstract class BaseHubService {
  final HubFactoryService _hubFactory;

  late final HubConnection connection;

  String get hubUrl;

  BaseHubService(this._hubFactory) {
    _start();
  }

  Future<void> _start() async {
    connection = await _hubFactory.createHub(hubUrl);

    await connection.start();

    await onStart();
  }

  Future<void> onStart();

  Future<void> stop() async {
    await connection.stop();
  }
}
