class ContentInfo {
  final bool isLiked;
  final String name;
  final String author;
  final int songsCount;
  final Duration duration;
  final String iconUrl;

  const ContentInfo({
    required this.isLiked,
    required this.name,
    required this.author,
    required this.songsCount,
    required this.duration,
    required this.iconUrl
  });
}
