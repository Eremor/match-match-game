import { BaseComponent } from '../base-component';
import './title.scss';

export class Title extends BaseComponent {
  constructor(classes?: string[], content?: string) {
    super('h3', classes, content);
  }
}
