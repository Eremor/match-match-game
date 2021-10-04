import { BaseComponent } from '../base-component';
import { LogoText } from './logo-text/logo-text';
import './logo.scss';

export class Logo extends BaseComponent {
  private logoText: LogoText = new LogoText(['logo__text'], 'Match');

  private logoTextBg: LogoText = new LogoText(
    ['logo__text', 'logo__text--bg'],
    'Match'
  );

  constructor() {
    super('div', ['logo']);
  }

  public render(): void {
    this.addChildren([this.logoText.node, this.logoTextBg.node]);
  }
}
