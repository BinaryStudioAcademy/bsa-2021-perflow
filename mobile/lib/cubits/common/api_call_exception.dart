import 'package:flutter/foundation.dart';

@immutable
class ApiCallException {
  final String errorMessage;

  const ApiCallException(this.errorMessage);
}
