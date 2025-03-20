import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../_shared/modules/material/material.module';
import { PasswordChangeDto } from '../../../_dtos/passwordChangeDto';

@Component({
  selector: 'app-password-edit-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-edit-form.component.html',
  styleUrl: './password-edit-form.component.css'
})
export class PasswordEditFormComponent {
  @Output("changePassword") changePassword : EventEmitter<any> = new EventEmitter();

  editPasswordForm: FormGroup = new FormGroup({});

  constructor() {
    this.initForm();
  }

  initForm() {
    this.editPasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      // Min length 8 with at least 1 digit, 1 uppercase, 1 lowercase and 1 non-alphanumeric character.
      newPassword: new FormControl('', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\\d\\s:]).{8,}")]),
    })
  }

  onSubmit() {
    const passwordChangeDto : PasswordChangeDto = this.editPasswordForm.value
    this.changePassword.emit(passwordChangeDto);
    this.cleanForm();
  }

  cleanForm() {
    this.editPasswordForm.reset();
  }
}
