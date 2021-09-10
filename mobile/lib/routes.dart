class Routes {
  Routes._();

  static const String auth = '/auth';

  static const String home = '/home';
  static const String searchSongs = '/search/songs';
  static const String searchAlbums = '/search/albums';
  static const String searchArtists = '/search/artists';
  static const String searchPlaylists = '/search/playlists';
  static const String libraryAll = '/library/all';
  static const String libraryArtists = '/library/artists';
  static const String libraryAlbums = '/library/albums';
  static const String librarySongs = '/library/songs';

  static const String player = '/player';
  static const String queue = '/queue';
  static const String songRecognizer = '/recognizer';

  static const String playlistTemplate = '/playlist/:id';
  static String playlist(int playlistId) => '/playlist/$playlistId';

  static const String albumTemplate = '/album/:id';
  static String album(int albumId) => '/album/$albumId';

  static const String artistTemplate = '/artist/:id';
  static String artist(int artistId) => '/artist/$artistId';
}
