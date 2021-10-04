import { BaseComponent } from '../base-component';

export class Timer extends BaseComponent {
  private seconds = 0;

  private minutes = 0;

  private gameInterval?: NodeJS.Timeout;

  private time = 0;

  constructor(classes?: string[]) {
    super('div', classes, '00:00');
  }

  public start(): void {
    this.gameInterval = setInterval((): void => {
      this.seconds++;
      this.time++;
      if (this.seconds === 60) {
        this.minutes += 1;
        this.seconds = 0;
      }

      this.node.textContent = `${
        this.minutes < 10 ? `0${this.minutes}` : this.minutes
      }:${this.seconds < 10 ? `0${this.seconds}` : this.seconds}`;
    }, 1000);
  }

  public stop(): void {
    clearInterval(this.gameInterval!);
  }

  public get totalTime(): number {
    return this.time;
  }
}
