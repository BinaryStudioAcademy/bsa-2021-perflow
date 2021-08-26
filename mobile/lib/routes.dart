class Routes {
  Routes._();

  static const String auth = '/auth';

  static const String home = '/home';
  static const String search = '/search';
  static const String libraryAll = '/library/all';
  static const String libraryArtists = '/library/artists';
  static const String libraryAlbums = '/library/albums';

  static const String player = '/player';

  static const String playlistTemplate = '/playlist/:id';
  static String playlist(int playlistId) => '/playlist/$playlistId';

  static const String albumTemplate = '/album/:id';
  static String album(int albumId) => '/album/$albumId';
}
