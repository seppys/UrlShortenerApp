import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../_shared/modules/material/material.module';
import { UserInformationDto } from '../../../_dtos/userInformationDto';

@Component({
  selector: 'app-general-edit-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './general-edit-form.component.html',
  styleUrl: './general-edit-form.component.css'
})
export class GeneralEditFormComponent {
  @Output("editUser") editUser: EventEmitter<any> = new EventEmitter();

  userEditForm: FormGroup = new FormGroup({});

  constructor() {
    this.initForm();
  }

  initForm() {
    this.userEditForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  cleanForm() {
    this.userEditForm.reset();
  }

  onSubmit() {
    this.userEditForm.markAsPristine();

    const userInformationDto: UserInformationDto = this.userEditForm.value;
    this.editUser.emit(userInformationDto);
  }
}
