import { AlbumEdit } from '../models/album/album-edit';
import { CreatedGroup } from '../models/group/createdGroup';

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

  if (!a.description) {
    fd.delete('description');
  }

  return fd;
}

export function groupToFormData(g: CreatedGroup) {
  const fd = objectToFormData(g);

  if (!g.description) {
    fd.delete('description');
  }

  return fd;
}
