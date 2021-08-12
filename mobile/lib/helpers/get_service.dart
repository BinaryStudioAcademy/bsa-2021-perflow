import 'package:get_it/get_it.dart';

T getService<T extends Object>() {
  return GetIt.instance.get<T>();
}

Future<T> getServiceAsync<T extends Object>() {
  return GetIt.instance.getAsync<T>();
}
