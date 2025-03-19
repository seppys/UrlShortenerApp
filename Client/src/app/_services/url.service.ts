import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Url } from '../_models/url';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private baseUrl = 'http://localhost:5000/api/';
  
  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Url[]>(this.baseUrl + 'url');
  }
}
