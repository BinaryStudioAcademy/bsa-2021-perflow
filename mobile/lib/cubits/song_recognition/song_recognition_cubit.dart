import 'dart:async';
import 'dart:convert';
import 'package:bloc/bloc.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:http_parser/http_parser.dart';
import 'package:perflow/api_urls.dart';
import 'package:meta/meta.dart';
import 'package:path_provider/path_provider.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:http/http.dart';
import 'package:perflow/models/song_recognition/song_recognition_result.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/songs/songs_api.dart';
import 'package:permission_handler/permission_handler.dart';

part 'song_recognition_state.dart';
part 'song_recognition_cubit.freezed.dart';

class SongRecognitionCubit extends Cubit<SongRecognitionState> {
  final _songsApi = getService<SongsApi>();
  final _audioRecorder = getService<FlutterSoundRecorder>();

  SongRecognitionCubit() : super(SongRecognitionState.loading()) {
    _initialize();
  }

  Future<void> _initialize() async {
    await _audioRecorder.openAudioSession();
    await askForPermissions();
  }

  Future<void> askForPermissions() async {
    emit(SongRecognitionState.loading());

    final permissions = [
      Permission.microphone,
      Permission.storage
    ];

    for(final permission in permissions) {
      if(!await permission.request().isGranted) {
        emit(SongRecognitionState.missingPermissions());
        return;
      }
    }

    emit(SongRecognitionState.ready(null));
  }

  void t() {
    final tt = state;
    emit(SongRecognitionState.loading());
    emit(tt);
  }

  Future<void> startRecognizing() async {
    for(int i = 0; i < 5; ++i) {
      emit(SongRecognitionState.recording(i));

      try {
        var song = await _tryRecognize(const Duration(seconds: 6));

        if(song != null) {
          emit(SongRecognitionState.ready(song));
          return;
        }
      }
      catch(e) {
        emit(SongRecognitionState.error(e.toString()));
        emit(SongRecognitionState.ready(null));
        return;
      }
    }

    emit(SongRecognitionState.fail());
    emit(SongRecognitionState.ready(null));
  }

  Future<Song?> _tryRecognize(Duration queryDuration) async {
    if(_audioRecorder.isRecording) {
      return null;
    }

    final tempDirectoryPath = await getTemporaryDirectory();
    var recordingPath = "${tempDirectoryPath.path}/query-${DateTime.now().toIso8601String().toString()}.wav";

    await _audioRecorder.startRecorder(
      sampleRate: 44100,
      toFile: recordingPath
    );

    await Future<void>.delayed(queryDuration);

    await _audioRecorder.stopRecorder();

    final queryFile = await MultipartFile.fromPath(
      'query',
        recordingPath,
      contentType:  MediaType('audio', 'mpeg')
    );

    final url = Uri.parse("${ApiUrls.base}/api/songRecognition");
    final request =  MultipartRequest("POST", url);
    request.files.add(queryFile);

    final streamedResponse = await request.send();
    final response = await Response.fromStream(streamedResponse);

    if(response.statusCode != 200) {
      return null;
    }

    final result = SongRecognitionResult.fromJson(jsonDecode(response.body));

    final songResponse = await _songsApi.get(result.songId);

    if(songResponse.statusCode != 200) {
      return null;
    }

    return Song.fromJson(songResponse.body);
  }

  @override
  Future<void> close() {
    _audioRecorder.closeAudioSession();
    return super.close();
  }
}
