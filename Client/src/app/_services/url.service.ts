import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Url } from '../_models/url';
import { NewUrlDto } from '../_dtos/newUrlDto';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private baseUrl = 'https://localhost:5001/api/';
  
  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Url[]>(this.baseUrl + 'url');
  }

  getByCurrentUser() {
    return this.httpClient.get<Url[]>(this.baseUrl + 'url/user');
  }

  newUrl(newUrlDto: NewUrlDto) {
    return this.httpClient.post<Url>(this.baseUrl + 'url/new', newUrlDto);
  }
}
