import { Component, inject } from '@angular/core';
import { Url } from '../../_models/url';
import { UrlService } from '../../_services/url.service';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-user-urls-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './user-urls-list.component.html',
  styleUrl: './user-urls-list.component.css'
})
export class UserUrlsListComponent {
private urlService = inject(UrlService);

  urls: Url[] | undefined;

  constructor() {
    this.urlService.getByCurrentUser().subscribe({
      next: (urls: Url[]) => this.urls = urls
    })
  }
}
