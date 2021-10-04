import { IRecordDB } from '../../../../modules/irecorddb';
import { BaseComponent } from '../../../base-component';
import { ImageComponent } from '../../../image-component/image-component';
import { TextComponent } from '../../../text-component/text-component';
import { Wrapper } from '../../../wrapper/wrapper';
import playerImage from '../../../../images/user.png';

export class PlayerScoreElement extends BaseComponent {
  private readonly userInfo: Wrapper = new Wrapper(['user__info']);

  private readonly userScore: Wrapper = new Wrapper(['user__score']);

  private readonly userText: HTMLElement = document.createElement('p');

  private playerAvatar: string;

  private playerName: string;

  private playerEmail: string;

  private playerScore: number;

  constructor(scoreItem: IRecordDB) {
    super('li', ['score__item', 'user']);

    this.playerAvatar = playerImage;
    this.playerName = scoreItem.name;
    this.playerEmail = scoreItem.email;
    this.playerScore = scoreItem.score;
  }

  render(): void {
    const userImageElement: ImageComponent = new ImageComponent(
      `${this.playerAvatar}`,
      'Player image',
      ['user__img']
    );

    const userNameElement: TextComponent = new TextComponent(
      ['user__name'],
      `${this.playerName}`
    );

    const userEmailElement: TextComponent = new TextComponent(
      ['user__email'],
      `${this.playerEmail}`
    );

    const userCountElement: TextComponent = new TextComponent(
      ['user__count'],
      `${this.playerScore}`
    );

    this.userInfo.addChildren([userNameElement.node, userEmailElement.node]);

    this.userText.classList.add('user__text');
    this.userText.textContent = 'Score:';

    this.userScore.addChildren([this.userText, userCountElement.node]);

    this.addChildren([
      userImageElement.node,
      this.userInfo.node,
      this.userScore.node,
    ]);
  }
}
