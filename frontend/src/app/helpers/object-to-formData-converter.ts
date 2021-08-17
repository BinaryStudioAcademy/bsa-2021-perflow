export function objectToFormData(o: object) {
  return Object.entries(o).reduce((d, e) => { d.append(...e); return d; }, new FormData());
}
