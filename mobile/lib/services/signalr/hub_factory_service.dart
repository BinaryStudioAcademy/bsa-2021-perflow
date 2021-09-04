import 'package:injectable/injectable.dart';
import 'package:logger/logger.dart';
import 'package:perflow/api_urls.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:signalr_core/signalr_core.dart';

@Singleton()
class HubFactoryService {
  final _logger = Logger();
  final AuthService _authService;

  final _hubConnections = <String, HubConnection>{};

  HubFactoryService(this._authService);

  Future<HubConnection> createHub(String url) async {
    if(!_authService.isAuthenticated) {
      await _authService.authStateChanges
        .firstWhere((state) => state != null);
    }

    if(_hubConnections.containsKey(url)) {
      return _hubConnections[url]!;
    }

    final connection = HubConnectionBuilder()
      .withUrl(
        '${ApiUrls.base}/content-sync',
        HttpConnectionOptions(
          skipNegotiation: true,
          transport: HttpTransportType.webSockets,
          logging: (level, message) {
            if(level == LogLevel.error || level == LogLevel.critical) {
              _logger.log(Level.error, message);
            }
          },
          accessTokenFactory: _authService.getToken
        )
      )
      .withAutomaticReconnect()
      .build();

    _hubConnections[url] = connection;
    return connection;
  }
}
