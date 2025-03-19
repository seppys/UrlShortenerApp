import { Component, inject } from '@angular/core';
import { UrlService } from '../../_services/url.service';
import { Url } from '../../_models/url';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-popular-list',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './popular-list.component.html',
  styleUrl: './popular-list.component.css'
})
export class PopularListComponent {

  private urlService = inject(UrlService);

  urls: Url[] | undefined;

  constructor() {
    this.urlService.getAll().subscribe({
      next: (urls: Url[]) => this.urls = urls
    })
  }
}
