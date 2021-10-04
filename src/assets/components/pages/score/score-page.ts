import { IRecordDB } from '../../../modules/irecorddb';
import './score-page.scss';
import { Wrapper } from '../../wrapper/wrapper';
import { Title } from '../../title/title';
import { BasePageComponent } from '../BasePageComponent';
import { PlayerScoreElement } from './player-score/player-score';
import { ListComponent } from '../../list-component/list-component';
import { database } from '../../../services/database';

export class Score extends BasePageComponent {
  private readonly wrapper: Wrapper = new Wrapper([
    'wrapper',
    'score__wrapper',
  ]);

  private readonly title: Title = new Title(
    ['section-title', 'score__title'],
    'Best players'
  );

  private readonly playerList: ListComponent = new ListComponent([
    'score__list',
  ]);

  constructor() {
    super(['score']);
  }

  public render = (): void => {
    this.node.appendChild(this.wrapper.node);

    this.showTopScore();

    this.wrapper.addChildren([this.title.node, this.playerList.node]);
  };

  private async showTopScore(): Promise<void> {
    const scores = await database.sortScore('scoreCollection');
    this.getPlayersScore(scores);

    // const read = await database.read('scoreCollection')
    // this.getPlayersScore(read);
  }

  private getPlayersScore(items: IRecordDB[]): void {
    items.forEach((item: IRecordDB): void => {
      const scoreItem: PlayerScoreElement = new PlayerScoreElement(item);
      scoreItem.render();

      this.playerList.addChildren([scoreItem.node]);
    });
  }
}
