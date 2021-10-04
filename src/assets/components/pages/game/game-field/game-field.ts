import { SHOW_TIME } from '../../../../constants';
import { BaseComponent } from '../../../base-component';
import { Card } from '../card/card';

export class GameField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['game__field']);
  }

  public clear(): void {
    this.cards = [];
  }

  public addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card): void => this.addChildren([card.node]));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
