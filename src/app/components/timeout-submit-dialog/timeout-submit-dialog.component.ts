import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-timeout-submit-dialog',
  standalone: true,
  imports: [MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './timeout-submit-dialog.component.html',
  styleUrl: './timeout-submit-dialog.component.css'
})
export class TimeoutSubmitDialogComponent {

}
