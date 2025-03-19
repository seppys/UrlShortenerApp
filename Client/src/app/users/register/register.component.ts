import { Component, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthDto } from '../../_dtos/authDto';
import { MatFormFieldModule } from '@angular/material/form-field'
import { Location } from '@angular/common';
import { MaterialModule } from '../../_shared/modules/material/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private accountService = inject(AccountService)
  private toastr = inject(ToastrService);
  private router = inject(Router);
  location = inject(Location);

  constructor() {
    if (this.accountService.isLogged())
      this.router.navigateByUrl("/");
    this.initForm();
  }

  registerForm : FormGroup = new FormGroup({});

  initForm() {
    this.registerForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      // Min length 8 with at least 1 digit, 1 uppercase, 1 lowercase and 1 non-alphanumeric character.
      password : new FormControl('', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\\d\\s:]).{8,}")]),
    })
  }

  register() {
    const newUserRegister: AuthDto = { ...this.registerForm.value }
    this.accountService.register(newUserRegister).subscribe({
      next: () => {
        this.toastr.success("Registered succesfully!");
        this.router.navigateByUrl("/login");
      },
      error: () => this.registerForm.reset()
    })
  }
}
