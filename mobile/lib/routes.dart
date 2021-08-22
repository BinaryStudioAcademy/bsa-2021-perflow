class Routes {
  Routes._();

  static const String auth = '/auth';

  static const String home = '/home';
  static const String search = '/search';
  static const String library = '/library';

  static const String player = '/player';

  static const String playlistTemplate = '/playlist/:id';
  static String playlist(int playlistId) => '/playlist/$playlistId';
}
