import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="loader-backdrop" *ngIf="loaderService.loading$ | async">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
  `]
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
