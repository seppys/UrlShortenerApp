import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PasswordChangeDto } from '../_dtos/passwordChangeDto';
import { UserInformationDto } from '../_dtos/userInformationDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:5001/api/';
    
    private httpClient = inject(HttpClient);

  updateUser(userInformationDto: UserInformationDto) {
    return this.httpClient.patch(this.baseUrl + "account/edit", userInformationDto);
  }

  changePassword(passwordEditDto: PasswordChangeDto) {
    return this.httpClient.patch(this.baseUrl + "account/edit-password", passwordEditDto);
  }
}
