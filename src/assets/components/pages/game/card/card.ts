import { BaseComponent } from '../../../base-component';
import { Wrapper } from '../../../wrapper/wrapper';
import { settings } from '../../settings/settings-page';
import './card.scss';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  private readonly card: Wrapper = new Wrapper(['card']);

  public readonly cardFront: Wrapper = new Wrapper(['card__front']);

  private readonly cardBack: Wrapper = new Wrapper(['card__back']);

  public isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.card.addChildren([this.cardFront.node, this.cardBack.node]);
    this.cardFront.node.style.backgroundImage = `url(./images/${image})`;

    this.node.appendChild(this.card.node);

    this.changeSizeCard(this.card.node, this.node);
  }

  public flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip();
  }

  public flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip(true);
  }

  private flip(isBack = false): Promise<void> {
    return new Promise((resolve) => {
      this.card.node.classList.toggle(FLIP_CLASS, !isBack);
      this.card.node.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  public changeSizeCard = (
    card: HTMLElement,
    cardContainer: HTMLElement
  ): void => {
    switch (settings.difficultyType) {
      case 8:
        card.style.width = '10rem';
        card.style.height = '12rem';
        cardContainer.style.flex = '0 0 20%';
        break;
      case 18:
        card.style.width = '9rem';
        card.style.height = '11rem';
        cardContainer.style.flex = '0 0 13%';
        break;
      case 32:
        card.style.width = '7rem';
        card.style.height = '8rem';
        cardContainer.style.flex = '0 0 10%';
        break;
      default:
        card.style.width = '10rem';
        card.style.height = '12rem';
        cardContainer.style.flex = '0 0 20%';
        break;
    }
  };
}
