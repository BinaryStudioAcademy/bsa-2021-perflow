import 'package:freezed_annotation/freezed_annotation.dart';

part 'api_call_state.freezed.dart';

@freezed
class ApiCallState<TData> with _$ApiCallState<TData> {
  factory ApiCallState.loading() = ApiCallStateLoading;
  factory ApiCallState.error(String message) = ApiCallStateError;
  factory ApiCallState.data(TData data) = ApiCallStateData;
}
