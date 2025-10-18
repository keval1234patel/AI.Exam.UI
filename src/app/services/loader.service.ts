import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();
  private delay = 300;
  private timerRef: any;

  show(): void {
    this.timerRef = setTimeout(() => {
      this._loading.next(true);
    }, this.delay);
  }

  hide(): void {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
    this._loading.next(false);
  }
}
