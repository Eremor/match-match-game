import { BaseComponent } from '../base-component';

export class TextComponent extends BaseComponent {
  constructor(classes?: string[], content?: string) {
    super('p', classes, content);
  }
}
