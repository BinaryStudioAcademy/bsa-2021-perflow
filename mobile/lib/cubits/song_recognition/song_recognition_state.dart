part of 'song_recognition_cubit.dart';

@freezed
class SongRecognitionState with _$SongRecognitionState {
  factory SongRecognitionState.loading() = SongRecognitionLoading;
  factory SongRecognitionState.error(String message) = SongRecognitionError;
  factory SongRecognitionState.missingPermissions() = SongRecognitionMissingPermissions;
  factory SongRecognitionState.ready(Song? lastQuery) = SongRecognitionReady;
  factory SongRecognitionState.recording(int tryNumber) = SongRecognitionRecording;
  factory SongRecognitionState.fail() = SongRecognitionFail;
}
