class SearchTextEditService {
  static final SearchTextEditService _editService =
      SearchTextEditService._internal();
  Function(String text)? onTextEdit;
  String? text;

  factory SearchTextEditService() {
    return _editService;
  }

  SearchTextEditService._internal();
}
