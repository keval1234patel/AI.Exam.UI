import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  @Input({ required: true }) seconds!: number;

  @Output() timeUp = new EventEmitter<void>();

  remainingSec = signal(0);

  private intervalId: any;

  ngOnInit() {
    this.remainingSec.set(this.seconds);
    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      const current = this.remainingSec();

      if (current <= 1) {
        this.remainingSec.set(0);
        clearInterval(this.intervalId);
        this.timeUp.emit();   // notify parent
        return;
      }

      this.remainingSec.set(current - 1);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  get formattedTime(): string {
    const sec = this.remainingSec();
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
