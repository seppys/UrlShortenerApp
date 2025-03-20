import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unsaved-changes',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './unsaved-changes.component.html',
  styleUrl: './unsaved-changes.component.css'
})
export class UnsavedChangesComponent {
  readonly dialogRef = inject(MatDialogRef<UnsavedChangesComponent>);
}
