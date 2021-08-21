import 'package:perflow/routes.dart';
import 'package:perflow/screens/playlists/playlist_screen.dart';
import 'package:vrouter/vrouter.dart';

class ContentRoutes extends VRouteElementBuilder {
  @override
  List<VRouteElement> buildRoutes() {
    return [
      VWidget.builder(
        path: Routes.playlistTemplate,
        builder: (context, state) => PlaylistScreen(
          playlistId: int.parse(state.pathParameters['id']!)
        ),
      )
    ];
  }
}
