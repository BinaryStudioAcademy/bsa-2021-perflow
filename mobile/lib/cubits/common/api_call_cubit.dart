import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:meta/meta.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/cubits/common/api_call_state.dart';

abstract class ApiCallCubit<TData> extends Cubit<ApiCallState<TData>> {
  final bool catchAllErrors;

  ApiCallCubit({
    this.catchAllErrors = true
  }) : super(ApiCallState.loading()) {
    onInit();
  }

  @protected
  void onInit() {}

  @protected
  Future<void> handleApiCall(Future<TData> apiCall) async {
    emit(ApiCallState.loading());

    try {
      var data = await apiCall;
      emit(ApiCallState.data(data));
    }
    on ApiCallException catch(e) {
      if(!catchAllErrors) {
        rethrow;
      }

      emit(ApiCallState.error(e.errorMessage));
    }
    catch(e) {
      if(!catchAllErrors) {
        rethrow;
      }

      final message = kReleaseMode ? "Couldn't load data" : e.toString();

      emit(ApiCallState.error(message));
    }
  }
}
