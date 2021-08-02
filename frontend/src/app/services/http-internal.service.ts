import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpInternalService {
  public baseUrl: string = environment.apiUrl;
  public headers = new HttpHeaders();

  constructor(private _http: HttpClient) { }

  public getHeaders(): HttpHeaders {
    return this.headers;
  }

  public deleteHeader(key: string): void {
    this.headers = this.headers.delete(key);
  }

  public getRequest<T>(url: string, httpParams?: any): Observable<T> {
    return this._http.get<T>(this.buildUrl(url), { headers: this.getHeaders(), params: httpParams });
  }

  public getFullRequest<T>(url: string, httpParams?: any): Observable<HttpResponse<T>> {
    return this._http.get<T>(
      this.buildUrl(url),
      { observe: 'response', headers: this.getHeaders(), params: httpParams }
    );
  }

  public postClearRequest<T>(url: string, payload: object): Observable<T> {
    return this._http.post<T>(this.buildUrl(url), payload);
  }

  public postRequest<T>(url: string, payload: object): Observable<T> {
    return this._http.post<T>(this.buildUrl(url), payload, { headers: this.getHeaders() });
  }

  public postFullRequest<T>(url: string, payload: object): Observable<HttpResponse<T>> {
    return this._http.post<T>(this.buildUrl(url), payload, { headers: this.getHeaders(), observe: 'response' });
  }

  public putRequest<T>(url: string, payload: object): Observable<T> {
    return this._http.put<T>(this.buildUrl(url), payload, { headers: this.getHeaders() });
  }

  public putFullRequest<T>(url: string, payload: object): Observable<HttpResponse<T>> {
    return this._http.put<T>(this.buildUrl(url), payload, { headers: this.getHeaders(), observe: 'response' });
  }

  public deleteRequest<T>(url: string, httpParams?: any): Observable<T> {
    return this._http.delete<T>(this.buildUrl(url), { headers: this.getHeaders(), params: httpParams });
  }

  public deleteFullRequest<T>(url: string, httpParams?: any): Observable<HttpResponse<T>> {
    return this._http.delete<T>(
      this.buildUrl(url),
      { headers: this.getHeaders(), observe: 'response', params: httpParams }
    );
  }
  public buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return this.baseUrl + url;
  }
  public prepareData = (payload: object): string => JSON.stringify(payload);
}
