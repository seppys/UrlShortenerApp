import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Url } from '../_models/url';
import { NewUrlDto } from '../_dtos/newUrlDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private baseUrl = "https://urlss.up.railway.app/api/";
  
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

  deleteUrl(id: number) {
    return this.httpClient.delete(this.baseUrl + 'url/' + id);
  }
}
