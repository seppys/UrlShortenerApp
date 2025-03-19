import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button'
import { AccountService } from '../_services/account.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  accountService = inject(AccountService);
  router = inject(Router);

  logout = () => {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
