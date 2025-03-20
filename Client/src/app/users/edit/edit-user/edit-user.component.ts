import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { PasswordEditFormComponent } from "../password-edit-form/password-edit-form.component";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { GeneralEditFormComponent } from "../general-edit-form/general-edit-form.component";
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../../../_services/account.service';
import { UserInformationDto } from '../../../_dtos/userInformationDto';
import { PasswordChangeDto } from '../../../_dtos/passwordChangeDto';
import { UserService } from '../../../_services/user.service';
import { UnsavedChangesComponent } from '../../../_shared/unsaved-changes/unsaved-changes.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [PasswordEditFormComponent, GeneralEditFormComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  @ViewChild(GeneralEditFormComponent) generalEditFormComponent!: GeneralEditFormComponent;
  @ViewChild(PasswordEditFormComponent) passwordEditFormComponent!: PasswordEditFormComponent;
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload($event: BeforeUnloadEvent) {
    if (this.thereDirtyForm()) {
      $event.preventDefault();
    }
  }

  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);
  location = inject(Location);

  async canDeactivate() {
    if (!this.thereDirtyForm()) {
      return true;
    }
    const openedDialog = this.dialog.open(UnsavedChangesComponent)
    const results = await lastValueFrom(openedDialog.afterClosed())
    if (results == true) {
      return true;
    }
    return false;
  }

  editUser(userInformationDto: UserInformationDto) {
    this.userService.updateUser(userInformationDto).subscribe({
      next: () => this.toastr.success("Information changed succesfully"),
    })
  }

  changePassword(passwordChangeDto: PasswordChangeDto) {
    this.userService.changePassword(passwordChangeDto).subscribe({
      next: () => this.toastr.success("Password changed succesfully"),
    });
  }

  thereDirtyForm(): boolean {
    return this.generalEditFormComponent.userEditForm.dirty ||
      this.passwordEditFormComponent.editPasswordForm.dirty
  }
}
