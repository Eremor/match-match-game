import './settings-page.scss';
import { BasePageComponent } from '../BasePageComponent';
import { Wrapper } from '../../wrapper/wrapper';
import { OptionComponent } from './options-component/options-component';
import { Title } from '../../title/title';
import { SettingItem } from './options-component/settings-item/settings-item';
import { ListComponent } from '../../list-component/list-component';

class Settings extends BasePageComponent {
  private readonly wrapper: Wrapper = new Wrapper([
    'wrapper',
    'settings__wrapper',
  ]);

  private readonly cardTitle: Title = new Title(
    ['option__title'],
    'Game cards'
  );

  private readonly selectCard: OptionComponent = new OptionComponent(
    'select game cards type',
    [
      {
        value: '0',
        text: 'fruits-and-vegetables',
      },
      {
        value: '1',
        text: 'birthday',
      },
      {
        value: '2',
        text: 'beverages',
      },
    ]
  );

  private readonly cardSetting: SettingItem = new SettingItem();

  private readonly difficultyTitle: Title = new Title(
    ['option__title'],
    'Difficulty'
  );

  private readonly selectDifficulty: OptionComponent = new OptionComponent(
    'select game type',
    [
      {
        value: '8',
        text: '4x4',
      },
      {
        value: '18',
        text: '6x6',
      },
      {
        value: '32',
        text: '8x8',
      },
    ]
  );

  private readonly difficultySetting: SettingItem = new SettingItem();

  private readonly settingsList: ListComponent = new ListComponent([
    'settings__list',
  ]);

  constructor() {
    super(['settings']);
  }

  public render = (): void => {
    this.node.appendChild(this.wrapper.node);

    this.selectCard.node.classList.add('select--card');
    this.cardSetting.addChildren([this.cardTitle.node, this.selectCard.node]);
    this.difficultySetting.addChildren([
      this.difficultyTitle.node,
      this.selectDifficulty.node,
    ]);

    this.settingsList.addChildren([
      this.cardSetting.node,
      this.difficultySetting.node,
    ]);
    this.wrapper.addChildren([this.settingsList.node]);
  };

  public get cardsType(): number {
    const selectedCardType = this.selectCard.node as HTMLSelectElement;
    return +selectedCardType.value;
  }

  public get difficultyType() {
    const selectedDifficultyType = <HTMLSelectElement>(
      this.selectDifficulty.node
    );
    return +selectedDifficultyType.value;
  }
}

export const settings = new Settings();
