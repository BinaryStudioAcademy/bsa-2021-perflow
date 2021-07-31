export class FileSizeConverter {
  static bytesToSize = (bytes : number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / 1024 ** i + Number.EPSILON) * 100) / 100} ${sizes[i]}`;
  };
}
