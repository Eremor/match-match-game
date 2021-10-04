import './header-player.scss';
import userImage from '../../images/user.png';
import { BaseComponent } from '../base-component';
import { Button } from '../buttons/button';
import { registerPopup } from '../popup/popup-register/popup-register';
import { ImageComponent } from '../image-component/image-component';

export class HeaderPlayer extends BaseComponent {
  private static instance: HeaderPlayer;

  private isRegister = false;

  public readonly btnReg: Button = new Button(
    ['btn--reg'],
    'Register new player'
  );

  public readonly btnStart: Button = new Button(['btn--start'], 'Start game');

  public readonly btnStop: Button = new Button(
    ['btn--stop', 'visually-hidden'],
    'Stop game'
  );

  private readonly playerIcon: ImageComponent = new ImageComponent(
    `${userImage}`,
    'User image',
    ['player__icon']
  );

  constructor() {
    super('div', ['player']);

    this.node.addEventListener('click', this.onClick);

    this.handleUserProfile();
  }

  public static getInstance(): HeaderPlayer {
    if (!HeaderPlayer.instance) {
      HeaderPlayer.instance = new HeaderPlayer();
    }

    return HeaderPlayer.instance;
  }

  public render(): void {
    this.btnStart.node.classList.add('visually-hidden');
    this.btnStart.node.setAttribute('route', '#game');
    this.btnStop.node.setAttribute('route', '#about');
    this.playerIcon.node.classList.add('visually-hidden');

    this.handleUserProfile();

    this.addChildren([
      this.btnReg.node,
      this.btnStart.node,
      this.btnStop.node,
      this.playerIcon.node,
    ]);
  }

  public onClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('btn--reg')) {
      this.showRegisterPopup();
    }

    if (target.classList.contains('btn--start')) {
      let hash: string | null = '';

      hash = target?.getAttribute('route');
      window.location.hash = hash!;
    }
  };

  private showRegisterPopup = (): void => {
    registerPopup.render();
  };

  public registerUser(register: boolean): void {
    this.isRegister = register;
  }

  public get getRegisterUser(): boolean {
    return this.isRegister;
  }

  public handleUserProfile = (): void => {
    if (this.getRegisterUser) {
      this.btnReg.node.classList.add('visually-hidden');
      this.btnStart.node.classList.remove('visually-hidden');
      this.playerIcon.node.classList.remove('visually-hidden');
    } else {
      this.btnReg.node.classList.remove('visually-hidden');
      this.btnStart.node.classList.add('visually-hidden');
      this.playerIcon.node.classList.add('visually-hidden');
    }

    if (window.location.hash === '#game') {
      this.btnReg.node.classList.add('visually-hidden');
    }
  };
}

export const headerPlayer = new HeaderPlayer();
