import './game-page.scss';
import { BasePageComponent } from '../BasePageComponent';
import { Wrapper } from '../../wrapper/wrapper';
import { Timer } from '../../timer/timer';
import { GameField } from './game-field/game-field';
import { Card } from './card/card';
import { delay } from '../../../services/delay';
import { ImageCategory } from '../../../modules/image-category';
import {
  SHOW_TIME,
  FLIP_DELAY,
  DEFAULT_STEP_TO_END_GAME,
  DEFAULT_CARD_COLLECTION,
  DEFAULT_GAME_DIFFICULTY,
} from '../../../constants';
import { FinishGamePopup } from '../../popup/popup-finish-game/popup-finish-game';
import { headerPlayer } from '../../header/header-player';
import { database } from '../../../services/database';
import { registerPopup } from '../../popup/popup-register/popup-register';
import { settings } from '../settings/settings-page';

export class GamePage extends BasePageComponent {
  private readonly wrapper: Wrapper = new Wrapper(['wrapper', 'game__wrapper']);

  private readonly timer: Timer = new Timer(['game__timer']);

  private readonly gameField: GameField = new GameField();

  private stepToFinish = settings.difficultyType || DEFAULT_STEP_TO_END_GAME;

  private activeCard?: Card;

  private isAnimation = false;

  private stopBtn = headerPlayer.btnStop.node;

  private startBtn = headerPlayer.btnStart.node;

  private totalCorrectCompare = 0;

  private totalWrongCompare = 0;

  constructor() {
    super(['game']);
    this.stopBtn?.addEventListener('click', this.stopGame);

    this.stopBtn?.classList.add('visually-hidden');
    this.startBtn?.classList.remove('visually-hidden');
  }

  public render = (): void => {
    this.node.appendChild(this.wrapper.node);

    this.wrapper.addChildren([this.timer.node, this.gameField.node]);

    document.querySelectorAll('.nav__item').forEach((link: Element): void => {
      link.classList.remove('nav__item--active');
    });

    this.start();
  };

  private async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategory[] = await res.json();
    const cat = categories[settings.cardsType || DEFAULT_CARD_COLLECTION];
    const images = cat.images.map((name) => `${cat.category}/${name}`);

    this.newGame(images);

    this.changeGameStateButtons();
  }

  private newGame(images: string[]): void {
    this.gameField.clear();
    setTimeout(() => {
      this.timer.start();
    }, SHOW_TIME * 1000);

    const totalImage = images.slice(
      0,
      settings.difficultyType || DEFAULT_GAME_DIFFICULTY
    );
    const cards = totalImage
      .concat(totalImage)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.node.addEventListener('click', () => this.cardHandler(card));
    });

    this.gameField.addCards(cards);
  }

  private endGame(): void {
    this.timer.stop();
    this.gameField.clear();

    const finishPopup: FinishGamePopup = new FinishGamePopup(
      this.timer.totalTime
    );

    finishPopup.render();
    this.changeGameStateButtons();
    this.scoring();
  }

  private stopGame = (e: MouseEvent): void => {
    const target = <HTMLElement>e.target;
    window.location.hash = target.getAttribute('route')!;
  };

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.missMatchCard(this.activeCard, card);
    } else {
      this.matchCard(this.activeCard, card);
    }

    if (this.stepToFinish === 0) this.endGame();

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  private async matchCard(activeCard: Card, card: Card): Promise<void> {
    card.cardFront.node.style.backgroundColor = 'rgba(10, 207, 131, 0.5)';
    activeCard.cardFront.node.style.backgroundColor = 'rgba(10, 207, 131, 0.5)';
    this.stepToFinish--;
    this.totalCorrectCompare++;
  }

  private async missMatchCard(activeCard: Card, card: Card): Promise<void> {
    card.cardFront.node.style.backgroundColor = 'rgba(242, 78, 30, 0.5)';
    activeCard.cardFront.node.style.backgroundColor = 'rgba(242, 78, 30, 0.5)';

    await delay(FLIP_DELAY);
    await Promise.all([activeCard.flipToBack(), card.flipToBack()]);

    card.cardFront.node.style.backgroundColor = 'transparent';
    activeCard.cardFront.node.style.backgroundColor = 'transparent';
    this.totalWrongCompare++;
  }

  private changeGameStateButtons(): void {
    this.stopBtn?.classList.toggle('visually-hidden');
    this.startBtn?.classList.toggle('visually-hidden');
  }

  private scoring(): void {
    const differenceCompare = this.totalCorrectCompare - this.totalWrongCompare;
    let score = differenceCompare * 100 - this.timer.totalTime * 10;

    if (score < 0) score = 0;

    const { name } = registerPopup.registerUser();
    const { email } = registerPopup.registerUser();
    database.write(name, email, score);
  }
}
