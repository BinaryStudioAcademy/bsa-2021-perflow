String getValidUrl(String? iconUrl) {
  const String defaultIconUrl =
      'https://perflow.westeurope.cloudapp.azure.com/assets/images/playlist_default.jpg';

  if (iconUrl == null || iconUrl.startsWith('.')) {
    return defaultIconUrl;
  }

  if (iconUrl.startsWith('http')) {
    return iconUrl;
  }

  return 'http://bsa2021perflow.blob.core.windows.net/images/$iconUrl';
}
