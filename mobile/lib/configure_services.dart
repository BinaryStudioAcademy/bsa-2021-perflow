import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/configure_services.config.dart';

final getIt = GetIt.instance;

@InjectableInit(
  initializerName: r'$configureServices',
  preferRelativeImports: false,
  asExtension: false,
  usesNullSafety: true
)
void configureServices() => $configureServices(getIt);
