import { ImageComponent } from '../../image-component/image-component';
import { ListComponent } from '../../list-component/list-component';
import { Title } from '../../title/title';
import { Wrapper } from '../../wrapper/wrapper';
import './about-page.scss';
import { DescriptionCard } from './description-card/description-card';
import registeredImage from '../../../images/register-form-image.png';
import gameSettingsImage from '../../../images/game-setting-image.png';
import gameFieldImage from '../../../images/game-field-image.png';
import { BasePageComponent } from '../BasePageComponent';
import { Column2 } from '../../wrapper/columns/column-2';
import { headerPlayer } from '../../header/header-player';

export class About extends BasePageComponent {
  private readonly wrapper: Wrapper = new Wrapper([
    'wrapper',
    'about__wrapper',
  ]);

  private readonly title: Title = new Title(
    ['section-title', 'about__title'],
    'How to play?'
  );

  private readonly columnElement = new Column2(['column-2', 'about__column']);

  private readonly card1: DescriptionCard = new DescriptionCard(
    1,
    'Register new player in game'
  );

  private readonly card2: DescriptionCard = new DescriptionCard(
    2,
    'Configure your game settings'
  );

  private readonly card3: DescriptionCard = new DescriptionCard(
    3,
    'Start you new game! Remember card positions and match it before times up.'
  );

  private readonly cardList: ListComponent = new ListComponent([
    'about__cards',
  ]);

  private readonly img1: ImageComponent = new ImageComponent(
    `${registeredImage}`,
    'Register form image',
    ['about__img']
  );

  private readonly img2: ImageComponent = new ImageComponent(
    `${gameSettingsImage}`,
    'Game settings image',
    ['about__img']
  );

  private readonly img3: ImageComponent = new ImageComponent(
    `${gameFieldImage}`,
    'Game field image',
    ['about__img']
  );

  private readonly imgList: ListComponent = new ListComponent([
    'about__images',
  ]);

  constructor() {
    super(['about']);
  }

  public render = (): void => {
    this.node.appendChild(this.wrapper.node);
    this.wrapper.addChildren([this.title.node, this.columnElement.node]);

    this.card1.render();
    this.card2.render();
    this.card3.render();

    this.cardList.addChildren([
      this.card1.node,
      this.card2.node,
      this.card3.node,
    ]);

    this.imgList.addChildren([this.img1.node, this.img2.node, this.img3.node]);

    this.columnElement.addChildren([this.cardList.node, this.imgList.node]);

    if (headerPlayer.btnReg.node.classList.contains('visually-hidden')) {
      headerPlayer.btnStart.node.classList.remove('visually-hidden');
      headerPlayer.btnStop.node.classList.add('visually-hidden');
    }
  };
}
