import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private accountService = inject(AccountService);
  private router = inject(Router)

  constructor() {
    if (!this.accountService.isLogged())
      this.router.navigateByUrl("/account/register")
    else
      this.router.navigateByUrl("/")
  }
}
