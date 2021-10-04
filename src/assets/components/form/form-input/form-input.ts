import { BaseComponent } from '../../base-component';

export class FormInput extends BaseComponent {
  constructor(type: string, isRequired: boolean, classes?: string[]) {
    super('input', classes);
    this.node.setAttribute('type', type);
    if (isRequired) {
      this.node.setAttribute('required', '');
    }

    this.node.addEventListener('input', this.onInput);
  }

  private onInput = () => (this.node as HTMLInputElement).value;
}
