import 'package:injectable/injectable.dart';

@Singleton()
class SearchTextEditService {
  Function(String text)? onTextEdit;
  String? text;
}
