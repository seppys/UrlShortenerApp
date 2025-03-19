import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../_shared/modules/material/material.module';
import { Url } from '../../_models/url';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  @Input("urls") urlsInput: Url[] | undefined;

  dataSource : Url[] | undefined;
  displayedColumns = ['id', 'shortUrl', 'originalUrl', 'clicks']

  ngOnInit(): void {
    this.dataSource = this.urlsInput
  }
}
