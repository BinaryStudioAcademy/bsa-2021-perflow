import { Injectable } from '@angular/core';
import { ReadSearchHistory } from '../models/search/read-search-history';
import { WriteSearchHistory } from '../models/search/write-search-history';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private readonly _routePrefix = '/api/SearchHistory';

  constructor(private _httpService: HttpInternalService) {}

  addSearchHistory(history: WriteSearchHistory) {
    return this._httpService.postRequest(this._routePrefix, history);
  }

  getUserSearchHistory(userId: number) {
    return this._httpService.getRequest<ReadSearchHistory[]>(`${this._routePrefix}/${userId}`);
  }
}
