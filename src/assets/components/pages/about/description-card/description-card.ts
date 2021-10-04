import './description-card.scss';
import { BaseComponent } from '../../../base-component';

export class DescriptionCard extends BaseComponent {
  private readonly serialNumberElement: HTMLElement =
    document.createElement('span');

  private readonly descriptionCarsText: HTMLElement =
    document.createElement('p');

  private readonly serialNumber: number;

  private readonly content: string;

  constructor(serialNumber: number, content: string) {
    super('div', ['description-card']);
    this.serialNumber = serialNumber;
    this.content = content;
  }

  public render(): void {
    this.serialNumberElement.classList.add('description-card__number');
    this.serialNumberElement.textContent = this.serialNumber.toString();

    this.descriptionCarsText.classList.add('description-card__text');
    this.descriptionCarsText.textContent = this.content;

    this.addChildren([this.serialNumberElement, this.descriptionCarsText]);
  }
}
