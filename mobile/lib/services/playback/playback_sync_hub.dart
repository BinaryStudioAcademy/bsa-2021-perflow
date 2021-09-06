import 'package:injectable/injectable.dart';
import 'package:perflow/models/playback_sync/playback_sync_data.dart';
import 'package:perflow/services/signalr/base_hub_service.dart';
import 'package:perflow/services/signalr/hub_factory_service.dart';
import 'package:rxdart/subjects.dart';

@Singleton()
class PlaybackSyncHub extends BaseHubService {
  final syncDataChanges = ReplaySubject<PlaybackSyncData>(maxSize: 1);
  PlaybackSyncData? _currentSyncData;

  PlaybackSyncHub(HubFactoryService hubFactory) : super(hubFactory);

  PlaybackSyncData? get currentSyncData => _currentSyncData;

  @override
  String get hubUrl => 'content-sync';

  @override
  Future<void> onStart() async {
    connection.on('ReceiveSynchronization', onMessageReceived);
  }

  void onMessageReceived(List<dynamic>? arguments) {
    if(arguments == null) {
      return;
    }

    _currentSyncData = PlaybackSyncData.fromJson(arguments.first);

    syncDataChanges.add(_currentSyncData!);
  }

  Future<void> sendSyncData(PlaybackSyncData? syncData) async {
    if(syncData == null) {
      return;
    }

    _currentSyncData = syncData;

    await connection.invoke('SendSynchronization', args: <dynamic>[syncData.toJson()]);
  }
}
