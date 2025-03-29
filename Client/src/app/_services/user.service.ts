import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PasswordChangeDto } from '../_dtos/passwordChangeDto';
import { UserInformationDto } from '../_dtos/userInformationDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
    
  private httpClient = inject(HttpClient);

  updateUser(userInformationDto: UserInformationDto) {
    return this.httpClient.patch(this.baseUrl + "account/edit", userInformationDto);
  }

  changePassword(passwordEditDto: PasswordChangeDto) {
    return this.httpClient.patch(this.baseUrl + "account/edit-password", passwordEditDto);
  }
}
