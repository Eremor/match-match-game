import { BaseComponent } from '../../../base-component';
import './options-component.scss';

type IOption = {
  value: string;
  text: string;
};
export class OptionComponent extends BaseComponent {
  private readonly defaultOption: HTMLOptionElement =
    document.createElement('option');

  private optionTitle: string;

  private options: Array<IOption>;

  constructor(optionTitle: string, options: Array<IOption>) {
    super('select', ['option__list']);
    this.optionTitle = optionTitle;
    this.options = options;

    this.addOption();
  }

  public addOption(): void {
    this.defaultOption.value = '';
    const defaultAttribute = ['selected', 'disabled', 'hidden'];
    defaultAttribute.forEach((attribute: string) => {
      this.defaultOption.setAttribute(attribute, '');
    });
    this.defaultOption.text = this.optionTitle;
    this.node.appendChild(this.defaultOption);

    this.options.forEach((option) => {
      const optionElement: HTMLOptionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.text = option.text;

      this.node.appendChild(optionElement);
    });
  }
}
