import './button.scss';
import { BaseComponent } from '../base-component';

export class Button extends BaseComponent {
  constructor(classes: string[], content: string) {
    super('button', ['btn', ...classes], content);
  }
}
