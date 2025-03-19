import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { AuthDto } from '../../_dtos/authDto';
import { MaterialModule } from '../../_shared/modules/material/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router)
  location = inject(Location);

  loginForm: FormGroup = new FormGroup({});

  constructor() {
    if (this.accountService.isLogged())
      this.router.navigateByUrl("/");
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  login() {
    const userLogin: AuthDto = { ...this.loginForm.value }
    this.accountService.login(userLogin).subscribe({
      next: () => {
        this.toastr.success("Logged succesfully!");
        this.router.navigateByUrl("/");
      },
      error: () => this.loginForm.reset()
    })
  }
}
