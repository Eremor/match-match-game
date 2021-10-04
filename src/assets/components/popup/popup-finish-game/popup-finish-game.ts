import './popup-finish-game.scss';
import { BaseComponent } from '../../base-component';
import { Popup } from '../popup';
import { TextComponent } from '../../text-component/text-component';
import { Button } from '../../buttons/button';

export class FinishGamePopup extends BaseComponent {
  private readonly popup: Popup = new Popup();

  private readonly popupBtn: Button = new Button(
    ['btn--primary', 'finish-game__btn'],
    'Ok'
  );

  private resultTime: number;

  constructor(resultTime: number) {
    super('div', ['popup__content', 'finish-game']);

    this.resultTime = resultTime;

    this.popupBtn.node.setAttribute('route', '#score');
  }

  public render(): void {
    const popupText: TextComponent = new TextComponent(
      ['finish-game__text'],
      `Congratulations! You successfully found all matches on ${this.gameResult()}`
    );

    this.addChildren([popupText.node, this.popupBtn.node]);

    this.popup.render();
    this.popup.addChildren([this.node]);

    this.popupBtn.node.addEventListener('click', (): void => {
      window.location.hash = this.popupBtn.node.getAttribute('route')!;
      this.popup.hiddenPopup();
    });
  }

  private gameResult(): string {
    const minutes: number = Math.trunc(this.resultTime / 60);
    const seconds: number = this.resultTime % 60;
    const ss = `${seconds < 10 ? `0${seconds}` : seconds}`;
    const formatTime: string = minutes === 0 ? `${ss}` : `${minutes}.${ss}`;

    return `${formatTime} ${minutes > 0 ? 'minutes' : 'seconds'}`;
  }
}
