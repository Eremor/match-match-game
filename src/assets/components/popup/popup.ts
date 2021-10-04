import './popup.scss';
import { BaseComponent } from '../base-component';
import { Wrapper } from '../wrapper/wrapper';

export class Popup extends BaseComponent {
  private static instance: Popup;

  private popupOverview: Wrapper = new Wrapper(['popup__overview']);

  constructor() {
    super('div', ['popup']);
  }

  public static getInstance(): Popup {
    if (!Popup.instance) {
      Popup.instance = new Popup();
    }

    return Popup.instance;
  }

  public render(): void {
    this.addChildren([this.popupOverview.node]);

    document.body.appendChild(this.node);
  }

  public hiddenPopup(): void {
    document.body.removeChild(this.node);
  }
}
