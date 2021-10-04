import { BaseComponent } from '../../base-component';

export class LogoText extends BaseComponent {
  constructor(classes?: string[], content?: string) {
    super('p', classes, content);
  }
}
