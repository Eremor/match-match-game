import { BaseComponent } from '../base-component';
import './wrapper.scss';

export class Wrapper extends BaseComponent {
  constructor(classes?: string[]) {
    super('div', classes);
  }
}
