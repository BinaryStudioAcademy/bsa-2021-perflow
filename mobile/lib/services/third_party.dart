import 'package:flutter_sound/flutter_sound.dart';
import 'package:injectable/injectable.dart';
import 'package:logger/logger.dart';

@module
abstract class RegisterThirdPartyServices {
  @LazySingleton()
  FlutterSoundRecorder get soundRecorder => FlutterSoundRecorder(logLevel: Level.error);
}
