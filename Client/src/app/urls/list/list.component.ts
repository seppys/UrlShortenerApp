import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../_shared/modules/material/material.module';
import { Url } from '../../_models/url';
import { UrlService } from '../../_services/url.service';

// Dialog component for delete confirmation
@Component({
  selector: 'delete-confirmation-dialog',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <h1 mat-dialog-title>Confirm Delete</h1>
    <div mat-dialog-content>Are you sure you want to delete this URL?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close="false">Cancel</button>
      <button mat-button color="warn" mat-dialog-close="true">Delete</button>
    </div>
  `
})
export class DeleteConfirmationDialog {}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  @Input("urls") urlsInput: Url[] | undefined;
  @Input("allowDelete") allowDelete: boolean = false;

  private urlService = inject(UrlService);
  private dialog = inject(MatDialog);

  dataSource: Url[] | undefined;
  displayedColumns: string[] = ['shortUrl', 'originalUrl', 'clicks'];

  ngOnInit(): void {
    this.dataSource = this.urlsInput;
    if (this.allowDelete) {
      this.displayedColumns.push('delete');
    }
  }

  deleteUrl(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.urlService.deleteUrl(id).subscribe({
          next: () => {
            this.dataSource = this.dataSource?.filter(url => url.id != id);
          }
        });
      }
    });
  }
}