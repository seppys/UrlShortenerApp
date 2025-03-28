import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../_shared/modules/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewUrlDto } from '../../_dtos/newUrlDto';
import { UrlService } from '../../_services/url.service';
import { Url } from '../../_models/url';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    MaterialModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {

  private urlService = inject(UrlService);

  urlForm : FormGroup = new FormGroup({})
  createdUrl : Url | undefined;

  constructor() {
    this.initForm();
  }

  initForm = () => {
    this.urlForm = new FormGroup({
      originalUrl: new FormControl('', [Validators.required, Validators.pattern('^(https?|ftp):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$')])
    })
  }

  isSubmitButtonDisable = () => {
    return this.urlForm.invalid || !this.isFormDirty();
  }

  isFormDirty = () => {
    return this.urlForm.dirty
  }

  copyToClipboard(): void {
    if (this.createdUrl?.shortUrl) {
        navigator.clipboard.writeText(this.createdUrl.shortUrl);
    }
}

  onSubmit() {
    this.urlForm.markAsPristine();
    const newUrlForm: NewUrlDto = { ...this.urlForm.value }

    this.urlService.newUrl(newUrlForm).subscribe({
      next: (url: Url) => this.createdUrl = url
    })
  }
}
