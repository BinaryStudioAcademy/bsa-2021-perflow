import { Injectable } from '@angular/core';
import { ContainerFull } from '../models/constructor/container-full';
import { ContainerView } from '../models/constructor/container-view';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ConstructorService {
  public routePrefix = '/api/Constructor';

  constructor(private _httpService: HttpInternalService) { }

  createContainer(container: ContainerFull) {
    return this._httpService.putFullRequest<ContainerFull>(`${this.routePrefix}`, container);
  }

  getAllContainersViews() {
    return this._httpService.getFullRequest<ContainerView[]>(`${this.routePrefix}`);
  }

  getContainer(containerId: number) {
    return this._httpService.getFullRequest<ContainerFull>(`${this.routePrefix}/${containerId}`);
  }

  getPublishedContainer() {
    return this._httpService.getFullRequest<ContainerFull>(`${this.routePrefix}/published`);
  }

  updateContainer(container: ContainerFull) {
    return this._httpService.postFullRequest<ContainerFull>(`${this.routePrefix}`, container);
  }

  publishContainer(container: ContainerView) {
    return this._httpService.postFullRequest<ContainerView>(`${this.routePrefix}/publish`, container);
  }
}
