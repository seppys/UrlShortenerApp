import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthDto } from '../_dtos/authDto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'https://localhost:5001/api/';

  private httpClient = inject(HttpClient);

  register = (authDto: AuthDto) => {
    return this.httpClient.post(this.baseUrl + 'account/register', authDto).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
    )
  }

  login = (authDto: AuthDto) => {
    return this.httpClient.post(this.baseUrl + 'account/login', authDto).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
    )
  }

  logout = () => {
    localStorage.removeItem("user");
  }

  isLogged = () : boolean => {
    const user = localStorage.getItem("user");
    if (user)
      return true;
    return false;
  }
}
