import { AlbumEdit } from '../models/album/album-edit';

export function objectToFormData(o: object) {
  return Object.entries(o).reduce((d, e) => {
    d.append(...e);
    return d;
  }, new FormData());
}

export function albumToFormData(a: AlbumEdit) {
  const fd = objectToFormData(a);

  if (!a.groupId) {
    // to prevent converting value to string ('null')
    fd.delete('groupId');
  }

  if (!a.releaseYear) {
    fd.delete('releaseYear');
  }

  if (!a.authorId) {
    fd.delete('authorId');
  }

  return fd;
}
