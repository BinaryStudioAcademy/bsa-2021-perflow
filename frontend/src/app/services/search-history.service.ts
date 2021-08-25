import { Injectable } from '@angular/core';
import { WriteSearchHistory } from '../models/search/write-search-history';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private readonly _routePrefix = '/api/SearchHistory';

  constructor(private _httpService: HttpInternalService) {}

  addSearchHistory(history: WriteSearchHistory) {
    return this._httpService.postRequest('/api/SearchHistory', history);
  }
}
