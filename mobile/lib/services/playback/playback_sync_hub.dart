import 'package:injectable/injectable.dart';
import 'package:logger/logger.dart';
import 'package:perflow/models/playback_sync/playback_sync_data.dart';
import 'package:perflow/services/signalr/base_hub_service.dart';
import 'package:perflow/services/signalr/hub_factory_service.dart';
import 'package:rxdart/subjects.dart';

@Singleton()
class PlaybackSyncHub extends BaseHubService {
  final syncDataChanges = ReplaySubject<PlaybackSyncData>(maxSize: 1);

  PlaybackSyncHub(HubFactoryService hubFactory) : super(hubFactory);

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

    syncDataChanges.add(PlaybackSyncData.fromJson(arguments.first));
  }

  Future<void> sendSyncData(PlaybackSyncData? syncData) async {
    if(syncData == null) {
      Logger().i('Post null');
      return;
    }

    Logger().i('Post sync\nid: ${syncData.songId}\ntime: ${syncData.time}');

    await connection.invoke('SendSynchronization', args: <dynamic>[syncData.toJson()]);
  }
}
